import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

let _showToast = null;

export function showToast(message) {
  if (_showToast) _showToast(message);
}

export default function Toast() {
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    setMounted(true);
    _showToast = (msg) => {
      clearTimeout(timer.current);
      setMessage(msg);
      setVisible(true);
      timer.current = setTimeout(() => setVisible(false), 2600);
    };
    return () => { _showToast = null; };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className={`toast${visible ? " show" : ""}`} role="status" aria-live="polite">
      {message}
    </div>,
    document.body
  );
}
