function MetricCard({ title, value }) {
  return (
    <div className={`p-4 border rounded bg-white`}>
      <h3 className="font-bold">{title}</h3>
      <p>{value}</p>
    </div>
  );
}

export default MetricCard;