import { useEffect } from "react";

/**
 * Attaches an IntersectionObserver to every element matching `selector`
 * inside `containerRef`. When the element enters the viewport it gains
 * the class `revealed`; elements are observed only once (unobserved after reveal).
 *
 * Usage:
 *   useScrollReveal(); // watches the whole document
 */
export default function useScrollReveal(selector = ".reveal, .reveal-left, .reveal-right, .reveal-pop") {
  useEffect(() => {
    const THRESHOLD = 0.12; // trigger when 12% of the element is visible

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target); // fire only once
          }
        });
      },
      { threshold: THRESHOLD, rootMargin: "0px 0px -40px 0px" }
    );

    // Observe all matching elements currently in the DOM
    const attach = () => {
      document.querySelectorAll(selector).forEach((el) => {
        // Skip elements that are already revealed
        if (!el.classList.contains("revealed")) {
          observer.observe(el);
        }
      });
    };

    attach();

    // Also re-attach if the DOM changes (e.g. diet plan loads later)
    const mutationObserver = new MutationObserver(attach);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [selector]);
}
