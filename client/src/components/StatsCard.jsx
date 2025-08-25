const StatsCard = ({ title, count }) => {
  return (
    <div className="stats-card">
      <h4>{title}</h4>
      <p className="stats-count">{count}</p>
    </div>
  );
};

export default StatsCard;
