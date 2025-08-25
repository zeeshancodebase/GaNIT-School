import React, { useState, useRef, useEffect } from "react";

const NotificationBell = ({ notifications = [] }) => {
  const [open, setOpen] = useState(false);
  const bellRef = useRef(null);

  const toggleOpen = () => setOpen((o) => !o);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={bellRef} style={{ position: "relative" }}>
      <button onClick={toggleOpen} aria-label="Notifications">
        🔔
        {notifications.length > 0 && <span>({notifications.length})</span>}
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "30px",
            right: 0,
            border: "1px solid #ccc",
            background: "#fff",
            padding: "10px",
            width: "300px",
            zIndex: 10,
          }}
        >
          {notifications.length === 0 && <p>No notifications</p>}
          <ul>
            {notifications.map((note, idx) => (
              <li key={idx} style={{ marginBottom: "10px" }}>
                <strong>{note.title}</strong>
                <p>{note.message}</p>
                <small>{note.time}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
