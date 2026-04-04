import React, { useEffect, useRef, useState } from "react";

let _showToast = null;

export function showToast(message) {
  if (_showToast) _showToast(message);
}

export default function Toast() {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    _showToast = (msg) => {
      clearTimeout(timer.current);
      setMessage(msg);
      setVisible(true);
      timer.current = setTimeout(() => setVisible(false), 2600);
    };
    return () => { _showToast = null; };
  }, []);

  return (
    <div className={`toast${visible ? " show" : ""}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}
