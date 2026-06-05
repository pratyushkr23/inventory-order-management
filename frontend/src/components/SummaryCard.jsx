export default function SummaryCard({
  title,
  value,
  color,
}) {
  return (
    <div
      className={`
        bg-white
        rounded-xl
        shadow
        p-6
        border-l-4
        ${color}
      `}
    >
      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <p className="text-4xl font-bold mt-3">
        {value}
      </p>
    </div>
  );
}