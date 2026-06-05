export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
      />

      <div className="relative bg-white rounded-xl shadow-xl p-6 w-[400px]">

        <h2 className="text-xl font-bold mb-3">
          {title}
        </h2>

        <p className="text-gray-600 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="
              px-4 py-2
              bg-gray-200
              hover:bg-gray-300
              rounded
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
              px-4 py-2
              bg-red-600
              hover:bg-red-700
              text-white
              rounded
            "
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}