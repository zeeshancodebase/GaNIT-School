import React from "react";

const changeTypeLabels = {
  status_update: "Status Updated",
  note_update: "Note Updated",
  new_college: "New College Added",
  followUpDate_update: "Follow-up Date Updated",
  // add more mappings as needed
};

const formatValue = (val) => {
  if (val === null || val === undefined) return "N/A";
  if (typeof val === "string" && val.match(/^\d{4}-\d{2}-\d{2}T/)) {
    // format ISO date string nicely
    return new Date(val).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  if (val && typeof val === "object" && val.label) return val.label;

  return val.toString();
};

const ActivityLogsModal = ({ logs, loading }) => {
  if (loading) return <p>Loading logs...</p>;
  if (logs.length === 0) return <p>No activity logs available.</p>;
  return (
    <ul
      className="logs-list"
      style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}
    >
      {logs.map((log) => {
        const changeLabel =
          changeTypeLabels[log.changeType] || log.changeType || "Change";

        const oldVal = formatValue(log.oldValue);
        const newVal = formatValue(log.newValue);

        return (
          <li
            key={log._id}
            style={{
              marginBottom: 16,
              paddingBottom: 12,
              borderBottom: "1px solid #ddd",
            }}
          >
            <strong>{log.changedBy?.name || "Unknown User"}</strong> {" made "}
            <div style={{ fontSize: 16 }}>
              <strong>{changeLabel}</strong>
              <div style={{ marginTop: 4, color: "#333" }}>
                {oldVal === "N/A" && newVal === "N/A" ? (
                  <em>No further details available.</em>
                ) : oldVal === newVal ? (
                  <span>Value: {newVal}</span>
                ) : (
                  <>
                    <div>
                      <span style={{ fontWeight: "bold" }}>From:</span> {oldVal}
                    </div>
                    <div>
                      <span style={{ fontWeight: "bold" }}>To:</span> {newVal}
                    </div>
                  </>
                )}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#555",
                  fontWeight: "bold",
                }}
              >
                {"on "}
                {new Date(log.createdAt).toLocaleString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ActivityLogsModal;
