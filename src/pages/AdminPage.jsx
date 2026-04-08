import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import Toast, { showToast } from "../components/shared/Toast";

const TABS = ["overview", "users", "diets", "analytics"];

const TAB_ICONS = {
  overview: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  users: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  diets: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  analytics: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
};

function formatDate(iso) {
  if (!iso) return "--";
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function formatDateTime(iso) {
  if (!iso) return "--";
  return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function titleCase(s) {
  return (s || "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function AdminPage() {
  const { user, isLoggedIn, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserDiet, setSelectedUserDiet] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  // Redirect non-admin users
  useEffect(() => {
    if (!loading && (!isLoggedIn || user?.role !== "admin")) {
      navigate("/", { replace: true });
    }
  }, [loading, isLoggedIn, user, navigate]);

  // Fetch data based on active tab
  useEffect(() => {
    if (!isLoggedIn || user?.role !== "admin") return;
    setLoadingData(true);
    const fetches = [];
    if (tab === "overview" || tab === "users" || tab === "diets") fetches.push(fetchUsers());
    if (tab === "overview" || tab === "analytics") fetches.push(fetchAnalytics());
    Promise.allSettled(fetches).finally(() => setLoadingData(false));
  }, [tab, isLoggedIn, user]); // eslint-disable-line react-hooks/exhaustive-deps

  // Close sidebar on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth > 900) setSidebarOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchUsers = () => {
    return api.get("/api/admin/users")
      .then((res) => { setStats(res.data.stats); setUsers(res.data.users); })
      .catch(() => showToast("Failed to load users", "error"));
  };

  const fetchAnalytics = () => {
    return api.get("/api/admin/analytics")
      .then((res) => setAnalytics(res.data.analytics))
      .catch(() => showToast("Failed to load analytics", "error"));
  };


  const handleSearch = () => {
    if (!search.trim()) { setSearchResults(null); return; }
    api.get(`/api/admin/users/search?query=${encodeURIComponent(search.trim())}`)
      .then((res) => setSearchResults(res.data.results))
      .catch(() => showToast("Search failed", "error"));
  };

  const handleDelete = (userId, email) => {
    if (deleting) return;
    setDeleting(userId);
    api.delete(`/api/admin/users/${userId}`)
      .then(() => {
        showToast(`Deleted ${email}`, "success");
        setUsers((prev) => prev.filter((u) => u._id !== userId));
        if (selectedUser?._id === userId) setSelectedUser(null);
        if (searchResults) setSearchResults((prev) => prev.filter((u) => u._id !== userId));
        if (stats) setStats((s) => ({ ...s, totalUsers: s.totalUsers - 1 }));
      })
      .catch((err) => showToast(err.response?.data?.message || "Delete failed", "error"))
      .finally(() => setDeleting(null));
  };

  const handleExportCSV = () => {
    api.get("/api/admin/export/all-users")
      .then((res) => {
        const blob = new Blob([res.data.csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `olilife-users-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        showToast(`Exported ${res.data.count} users`, "success");
      })
      .catch(() => showToast("Export failed", "error"));
  };

  const handleViewUser = (userId) => {
    api.get(`/api/admin/users/${userId}`)
      .then((res) => setSelectedUser(res.data.user))
      .catch(() => showToast("Failed to load user details", "error"));
  };

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  const switchTab = (t) => {
    setTab(t);
    setSelectedUser(null);
    setSelectedUserDiet(null);
    setSidebarOpen(false);
  };

  if (loading || !isLoggedIn || user?.role !== "admin") return null;

  const DataLoader = () => (
    <div className="admin-loading">
      <div className="admin-spinner" />
      <p>Loading data...</p>
    </div>
  );

  return (
    <main className="app-shell app-shell--admin" aria-label="Admin panel">
      {/* Mobile header */}
      <header className="admin-mobile-header">
        <button className="admin-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
          <span className={`admin-hamburger-line${sidebarOpen ? " open" : ""}`} />
          <span className={`admin-hamburger-line${sidebarOpen ? " open" : ""}`} />
          <span className={`admin-hamburger-line${sidebarOpen ? " open" : ""}`} />
        </button>
        <img src="/olilife_logo-300x95.webp" alt="Olilife" className="admin-mobile-logo" />
        <span className="admin-mobile-tab">{titleCase(tab)}</span>
      </header>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}

      <div className="admin-inner">
        {/* Sidebar */}
        <aside className={`admin-sidebar${sidebarOpen ? " admin-sidebar--open" : ""}`}>
          <div className="admin-sidebar-brand">
            <img src="/olilife_logo-300x95.webp" alt="Olilife" className="brand-logo" />
            <span className="admin-brand-label">Admin</span>
          </div>
          <nav className="admin-nav">
            {TABS.map((t) => (
              <button
                key={t}
                className={`admin-nav-btn${tab === t ? " active" : ""}`}
                onClick={() => switchTab(t)}
              >
                <span className="admin-nav-icon">{TAB_ICONS[t]}</span>
                {titleCase(t)}
              </button>
            ))}
          </nav>
          <div className="admin-sidebar-footer">
            <div className="admin-user-info">
              <div className="admin-avatar">{(user.email || "A")[0].toUpperCase()}</div>
              <span className="admin-user-email">{user.email}</span>
            </div>
            <button className="admin-logout-btn" onClick={handleLogout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Log Out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="admin-main">
          {/* ── Overview Tab ───────────────────────── */}
          {tab === "overview" && (
            <div className="admin-section admin-fade-in">
              <div className="admin-page-header">
                <h2 className="admin-heading">Dashboard Overview</h2>
                <p className="admin-heading-sub">Welcome back. Here's what's happening.</p>
              </div>
              {loadingData && !stats ? (
                <DataLoader />
              ) : stats && (
                <div className="admin-stats-grid">
                  <div className="admin-stat-card admin-stat-card--primary">
                    <div className="admin-stat-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                    </div>
                    <span className="admin-stat-label">Total Users</span>
                    <strong className="admin-stat-value">{stats.totalUsers}</strong>
                  </div>
                  <div className="admin-stat-card admin-stat-card--success">
                    <div className="admin-stat-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <span className="admin-stat-label">Onboarding Done</span>
                    <strong className="admin-stat-value">{stats.onboardingCompleted}</strong>
                  </div>
                  <div className="admin-stat-card admin-stat-card--warning">
                    <div className="admin-stat-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                    </div>
                    <span className="admin-stat-label">Pending</span>
                    <strong className="admin-stat-value">{stats.onboardingPending}</strong>
                  </div>
                  <div className="admin-stat-card admin-stat-card--info">
                    <div className="admin-stat-icon">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                    </div>
                    <span className="admin-stat-label">Diet Plans</span>
                    <strong className="admin-stat-value">{stats.dietPlansCreated}</strong>
                  </div>
                </div>
              )}
              {users && users.length > 0 && (
                <div style={{ marginTop: "2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <h3 className="admin-subheading" style={{ margin: 0 }}>Recent Signups</h3>
                    <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => setTab("users")}>
                      View All Users
                    </button>
                  </div>
                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Email</th>
                          <th>Joined</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.slice(0, 5).map((u) => (
                          <tr key={u._id}>
                            <td className="admin-cell-email">
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <div className="admin-avatar admin-avatar--sm" style={{ width: 28, height: 28, fontSize: "12px" }}>
                                  {(u.email || "?")[0].toUpperCase()}
                                </div>
                                <span>{u.email}</span>
                              </div>
                            </td>
                            <td>{formatDate(u.createdAt)}</td>
                            <td>
                              <span className={`admin-badge ${u.onboardingComplete ? "admin-badge--yes" : "admin-badge--no"}`}>
                                {u.onboardingComplete ? "Onboarded" : "Pending"}
                              </span>
                            </td>
                            <td>
                              <button 
                                className="admin-btn admin-btn--ghost admin-btn--sm" 
                                onClick={() => { setTab("users"); setSelectedUser(u); }}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Users Tab ──────────────────────────── */}
          {tab === "users" && !selectedUser && (
            <div className="admin-section admin-fade-in">
              <div className="admin-toolbar">
                <div className="admin-page-header" style={{ margin: 0 }}>
                  <h2 className="admin-heading" style={{ margin: 0 }}>User Management</h2>
                  <p className="admin-heading-sub" style={{ margin: 0 }}>
                    {loadingData && users.length === 0 ? "Loading..." : `${users.length} total users`}
                  </p>
                </div>
                <button className="admin-btn admin-btn--primary" onClick={handleExportCSV}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                  Export CSV
                </button>
              </div>
              {loadingData && users.length === 0 && <DataLoader />}

              {/* Search */}
              <div className="admin-search-row">
                <div className="admin-search-wrap">
                  <svg className="admin-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                  <input
                    className="admin-search-input"
                    type="text"
                    placeholder="Search by email..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); if (!e.target.value.trim()) setSearchResults(null); }}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <button className="admin-btn admin-btn--primary" onClick={handleSearch}>Search</button>
              </div>

              {/* User table (desktop) */}
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Goal</th>
                      <th>Onboarded</th>
                      <th>Diet Plan</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(searchResults || users).map((u) => (
                      <tr key={u._id}>
                        <td className="admin-cell-email">{u.email}</td>
                        <td>{titleCase(u.profile?.goal || "--")}</td>
                        <td>
                          <span className={`admin-badge ${u.onboardingComplete ? "admin-badge--yes" : "admin-badge--no"}`}>
                            {u.onboardingComplete ? "Yes" : "No"}
                          </span>
                        </td>
                        <td>
                          <span className={`admin-badge ${u.savedDietPlan?.meals?.length ? "admin-badge--yes" : "admin-badge--no"}`}>
                            {u.savedDietPlan?.meals?.length ? "Yes" : "No"}
                          </span>
                        </td>
                        <td>{formatDate(u.createdAt)}</td>
                        <td>
                          <div className="admin-cell-actions">
                            <button className="admin-btn admin-btn--ghost" onClick={() => handleViewUser(u._id)}>View</button>
                            <button
                              className="admin-btn admin-btn--danger"
                              onClick={() => handleDelete(u._id, u.email)}
                              disabled={deleting === u._id}
                            >
                              {deleting === u._id ? "..." : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {(searchResults || users).length === 0 && (
                      <tr><td colSpan="6" className="admin-empty">No users found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* User cards (mobile) */}
              <div className="admin-card-list">
                {(searchResults || users).map((u) => (
                  <div className="admin-user-card" key={u._id}>
                    <div className="admin-user-card-header">
                      <div className="admin-avatar admin-avatar--sm">{(u.email || "?")[0].toUpperCase()}</div>
                      <div className="admin-user-card-info">
                        <strong className="admin-user-card-email">{u.email}</strong>
                        <span className="admin-user-card-meta">Joined {formatDate(u.createdAt)}</span>
                      </div>
                    </div>
                    <div className="admin-user-card-tags">
                      <span className="admin-tag">{titleCase(u.profile?.goal || "No Goal")}</span>
                      <span className={`admin-badge ${u.onboardingComplete ? "admin-badge--yes" : "admin-badge--no"}`}>
                        {u.onboardingComplete ? "Onboarded" : "Pending"}
                      </span>
                      <span className={`admin-badge ${u.savedDietPlan?.meals?.length ? "admin-badge--yes" : "admin-badge--no"}`}>
                        {u.savedDietPlan?.meals?.length ? "Has Plan" : "No Plan"}
                      </span>
                    </div>
                    <div className="admin-user-card-actions">
                      <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => handleViewUser(u._id)}>View Details</button>
                      <button
                        className="admin-btn admin-btn--danger admin-btn--sm"
                        onClick={() => handleDelete(u._id, u.email)}
                        disabled={deleting === u._id}
                      >
                        {deleting === u._id ? "..." : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
                {(searchResults || users).length === 0 && (
                  <p className="admin-empty">No users found</p>
                )}
              </div>

              {searchResults && (
                <button className="admin-btn admin-btn--ghost" style={{ marginTop: 12 }} onClick={() => { setSearch(""); setSearchResults(null); }}>
                  Clear search — show all users
                </button>
              )}
            </div>
          )}

          {/* ── User Detail View ───────────────────── */}
          {tab === "users" && selectedUser && (
            <div className="admin-section admin-fade-in">
              <button className="admin-btn admin-btn--ghost" style={{ marginBottom: 16 }} onClick={() => setSelectedUser(null)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                Back to Users
              </button>
              <div className="admin-page-header">
                <h2 className="admin-heading">{selectedUser.email}</h2>
              </div>
              <div className="admin-detail-grid">
                <div className="admin-detail-card">
                  <h4>Account</h4>
                  <div className="admin-detail-row"><span>Role</span><strong>{titleCase(selectedUser.role)}</strong></div>
                  <div className="admin-detail-row"><span>Onboarded</span><strong>{selectedUser.onboardingComplete ? "Yes" : "No"}</strong></div>
                  <div className="admin-detail-row"><span>Joined</span><strong>{formatDate(selectedUser.createdAt)}</strong></div>
                </div>
                <div className="admin-detail-card">
                  <h4>Profile</h4>
                  <div className="admin-detail-row"><span>Age</span><strong>{selectedUser.profile?.age || "--"}</strong></div>
                  <div className="admin-detail-row"><span>Gender</span><strong>{titleCase(selectedUser.profile?.gender || "--")}</strong></div>
                  <div className="admin-detail-row"><span>Height</span><strong>{selectedUser.profile?.height || "--"} {selectedUser.profile?.heightUnit || ""}</strong></div>
                  <div className="admin-detail-row"><span>Weight</span><strong>{selectedUser.profile?.weight || "--"} kg</strong></div>
                </div>
                <div className="admin-detail-card">
                  <h4>Goals & Activity</h4>
                  <div className="admin-detail-row"><span>Goal</span><strong>{titleCase(selectedUser.profile?.goal || "--")}</strong></div>
                  <div className="admin-detail-row"><span>Activity</span><strong>{titleCase(selectedUser.profile?.activityLevel || "--")}</strong></div>
                  <div className="admin-detail-row"><span>Diabetic</span><strong>{titleCase(selectedUser.profile?.diabeticStatus || "--")}</strong></div>
                </div>
                <div className="admin-detail-card">
                  <h4>Health</h4>
                  <div className="admin-detail-row">
                    <span>Allergies</span>
                    <strong>{selectedUser.profile?.allergyList?.length ? selectedUser.profile.allergyList.join(", ") : "None"}</strong>
                  </div>
                  <div className="admin-detail-row">
                    <span>Conditions</span>
                    <strong>{selectedUser.profile?.chronicConditions?.length ? selectedUser.profile.chronicConditions.join(", ") : "None"}</strong>
                  </div>
                </div>
              </div>
              {selectedUser.savedDietPlan?.meals?.length > 0 && (
                <div className="admin-detail-card" style={{ marginTop: 16 }}>
                  <h4>Diet Plan</h4>
                  <div className="admin-detail-row">
                    <span>Meals</span>
                    <strong>{selectedUser.savedDietPlan.meals.length} meals</strong>
                  </div>
                  <div className="admin-detail-row">
                    <span>Generated</span>
                    <strong>{formatDateTime(selectedUser.savedDietPlan.generatedAt)}</strong>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Diets Tab ──────────────────────────── */}
          {tab === "diets" && !selectedUserDiet && (
            <div className="admin-section admin-fade-in">
              <div className="admin-page-header">
                <h2 className="admin-heading">Diet Charts</h2>
                <p className="admin-heading-sub">View generated diet plans for all users.</p>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Goal</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id}>
                        <td className="admin-cell-email">{u.email}</td>
                        <td>{titleCase(u.profile?.goal || "--")}</td>
                        <td>
                          {u.savedDietPlan?.meals?.length > 0 ? (
                            <span className="admin-badge admin-badge--yes">Available</span>
                          ) : (
                            <span className="admin-badge admin-badge--no" style={{textTransform: "none", letterSpacing: "normal"}}>No chart generated or available</span>
                          )}
                        </td>
                        <td>
                          <button
                            className="admin-btn admin-btn--ghost admin-btn--sm"
                            disabled={!u.savedDietPlan?.meals?.length}
                            onClick={() => setSelectedUserDiet(u)}
                          >
                            View Diet
                          </button>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr><td colSpan="4" className="admin-empty">No users found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* Mobile version cards */}
              <div className="admin-card-list">
                {users.map((u) => (
                  <div className="admin-user-card" key={u._id}>
                    <div className="admin-user-card-header">
                      <div className="admin-avatar admin-avatar--sm">{(u.email || "?")[0].toUpperCase()}</div>
                      <div className="admin-user-card-info">
                        <strong className="admin-user-card-email">{u.email}</strong>
                      </div>
                    </div>
                    <div className="admin-user-card-tags">
                      <span className="admin-tag">{titleCase(u.profile?.goal || "No Goal")}</span>
                      {u.savedDietPlan?.meals?.length > 0 ? (
                        <span className="admin-badge admin-badge--yes">Available</span>
                      ) : (
                        <span className="admin-badge admin-badge--no" style={{textTransform: "none", letterSpacing: "normal"}}>No chart generated or available</span>
                      )}
                    </div>
                    <div className="admin-user-card-actions">
                      <button
                        className="admin-btn admin-btn--ghost admin-btn--sm"
                        disabled={!u.savedDietPlan?.meals?.length}
                        onClick={() => setSelectedUserDiet(u)}
                      >
                        View Diet
                      </button>
                    </div>
                  </div>
                ))}
                {users.length === 0 && <p className="admin-empty">No users found</p>}
              </div>
            </div>
          )}

          {/* ── Diet Detail View ───────────────────── */}
          {tab === "diets" && selectedUserDiet && (
            <div className="admin-section admin-fade-in">
              <button className="admin-btn admin-btn--ghost" style={{ marginBottom: 16 }} onClick={() => setSelectedUserDiet(null)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                Back to Diets List
              </button>
              <div className="admin-page-header">
                <h2 className="admin-heading">Diet Plan for {selectedUserDiet.email}</h2>
                <p className="admin-heading-sub">Generated on {formatDate(selectedUserDiet.savedDietPlan?.generatedAt)}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {selectedUserDiet.savedDietPlan?.meals?.map((meal, idx) => {
                  let mCalories = 0;
                  meal.items.forEach(i => mCalories += i.calories);
                  return (
                    <div key={idx} className="admin-detail-card" style={{ padding: "16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,0.06)", paddingBottom: "10px", marginBottom: "10px" }}>
                        <h4 style={{ margin: 0, fontSize: "1.05rem", color: "var(--brown-900)" }}>{meal.label}</h4>
                        <span style={{ fontWeight: 700, color: "var(--brown-900)" }}>{mCalories} kcal</span>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {meal.items.map((item, idxi) => (
                          <div key={idxi} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", alignItems: "center" }}>
                            <div style={{ paddingRight: "10px" }}>
                              <strong style={{ color: "var(--brown-900)" }}>{item.name}</strong> <span style={{ color: "rgba(62,39,35,0.6)", fontSize: "0.8rem", whiteSpace: "nowrap" }}>({item.portionFactor.toFixed(1)}x)</span>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <div style={{ fontWeight: 600, color: "var(--brown-900)" }}>{item.calories} kcal</div>
                              <div style={{ fontSize: "0.75rem", color: "rgba(62,39,35,0.5)" }}>
                                {Math.round(item.protein)}P {Math.round(item.carbs)}C {Math.round(item.fats)}F
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Analytics Tab ──────────────────────── */}
          {tab === "analytics" && (
            <div className="admin-section admin-fade-in">
              <div className="admin-page-header">
                <h2 className="admin-heading">Analytics</h2>
                <p className="admin-heading-sub">Usage patterns and distribution data.</p>
              </div>
              {analytics ? (
                <>
                  <div className="admin-stats-grid">
                    <div className="admin-stat-card admin-stat-card--primary">
                      <div className="admin-stat-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                      </div>
                      <span className="admin-stat-label">Total Users</span>
                      <strong className="admin-stat-value">{analytics.totalUsers}</strong>
                    </div>
                    <div className="admin-stat-card admin-stat-card--success">
                      <div className="admin-stat-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <span className="admin-stat-label">Onboarded</span>
                      <strong className="admin-stat-value">{analytics.onboardingCompleted}</strong>
                    </div>
                    <div className="admin-stat-card admin-stat-card--info">
                      <div className="admin-stat-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                      </div>
                      <span className="admin-stat-label">Diet Plans</span>
                      <strong className="admin-stat-value">{analytics.dietPlansCreated}</strong>
                    </div>
                    <div className="admin-stat-card admin-stat-card--warning">
                      <div className="admin-stat-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                      </div>
                      <span className="admin-stat-label">Conversion</span>
                      <strong className="admin-stat-value">
                        {analytics.totalUsers ? Math.round((analytics.onboardingCompleted / analytics.totalUsers) * 100) : 0}%
                      </strong>
                    </div>
                  </div>

                  <h3 className="admin-subheading">Goals Distribution</h3>
                  <div className="admin-chart-card">
                    <div className="admin-bar-chart">
                      {Object.keys(analytics.goalsDistribution || {}).length > 0 ? (
                        Object.entries(analytics.goalsDistribution).map(([key, val]) => (
                          <div className="admin-bar-row" key={key}>
                            <span className="admin-bar-label">{titleCase(key)}</span>
                            <div className="admin-bar-track">
                              <div className="admin-bar-fill" style={{ width: `${Math.min((val / (analytics.totalUsers || 1)) * 100, 100)}%` }} />
                            </div>
                            <span className="admin-bar-count">{val}</span>
                          </div>
                        ))
                      ) : (
                        <p className="admin-empty" style={{ padding: "1rem 0" }}>No data available yet</p>
                      )}
                    </div>
                  </div>

                  <h3 className="admin-subheading">Activity Levels</h3>
                  <div className="admin-chart-card">
                    <div className="admin-bar-chart">
                      {Object.keys(analytics.activityDistribution || {}).length > 0 ? (
                        Object.entries(analytics.activityDistribution).map(([key, val]) => (
                          <div className="admin-bar-row" key={key}>
                            <span className="admin-bar-label">{titleCase(key)}</span>
                            <div className="admin-bar-track">
                              <div className="admin-bar-fill admin-bar-fill--alt" style={{ width: `${Math.min((val / (analytics.totalUsers || 1)) * 100, 100)}%` }} />
                            </div>
                            <span className="admin-bar-count">{val}</span>
                          </div>
                        ))
                      ) : (
                        <p className="admin-empty" style={{ padding: "1rem 0" }}>No data available yet</p>
                      )}
                    </div>
                  </div>

                  <h3 className="admin-subheading">Top Allergies</h3>
                  <div className="admin-chart-card">
                    <div className="admin-bar-chart">
                      {Object.keys(analytics.allergiesDistribution || {}).length > 0 ? (
                        Object.entries(analytics.allergiesDistribution).map(([key, val]) => (
                          <div className="admin-bar-row" key={key}>
                            <span className="admin-bar-label">{titleCase(key)}</span>
                            <div className="admin-bar-track">
                              <div className="admin-bar-fill admin-bar-fill--warn" style={{ width: `${Math.min((val / (analytics.totalUsers || 1)) * 100, 100)}%` }} />
                            </div>
                            <span className="admin-bar-count">{val}</span>
                          </div>
                        ))
                      ) : (
                        <p className="admin-empty" style={{ padding: "1rem 0" }}>No data available yet</p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="admin-loading">
                  <div className="admin-spinner" />
                  <p>Loading analytics...</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
      <Toast />
    </main>
  );
}
