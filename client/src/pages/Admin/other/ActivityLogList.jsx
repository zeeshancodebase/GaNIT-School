import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivityLogsThunk } from "../../../app/slices/activityLogSlice";
import "./ActivityLogList.css";
import { useAuth } from "../../../context/auth";

const ActivityLogList = ({ modelType = null, modelId = null, limit = 5 }) => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const { logs, loading, error } = useSelector((state) => state.activityLogs);

  useEffect(() => {
    dispatch(fetchActivityLogsThunk({ token }));
  }, [dispatch, token]);

  if (loading) {
    return <div className="activity-log loading">Loading activity logs...</div>;
  }

  if (error) {
    return <div className="activity-log error">Error: {error}</div>;
  }

  if (!logs || logs.length === 0) {
    return (
      <div className="activity-log empty">
        No recent activity logs to display.
      </div>
    );
  }

  return (
    <ul className="activity-log-list" aria-label="Recent Activity Logs">
      {logs.slice(0, limit).map((log, index) => (
        <li key={index} className="activity-log-item">
          <div className="log-header">
            <span className="log-user">{log.userName || "System"}</span>
            <span className="log-time">
              {new Date(log.timestamp).toLocaleString()}
            </span>
          </div>
          <div className="log-body">
            <strong>{log.actionType}</strong>: {log.description}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ActivityLogList;
