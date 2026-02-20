function MetricCard({ title, value, alert = '' }) {
  return (
    <div className="p-5 bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">
        {value}
      </p>
      {alert && (
        <p className="mt-1 text-xs font-medium text-amber-400">{alert}</p>
      )}
    </div>
  );
}

export default MetricCard;