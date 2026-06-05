import { useEffect } from "react";

export default function Notification({
  message,
  type,
  onClose,
}) {
  if (!message) return null;

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
        onClose();
    }, 2500);

    return () => clearTimeout(timer);
    }, [message]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">

      <div
        className="
          absolute
          inset-0
          bg-black/30
        "
        onClick={onClose}
      />

      <div
        className={`
          relative
          px-8
          py-5
          rounded-xl
          shadow-xl
          text-white
          min-w-[320px]
          text-center
          ${
            type === "success"
              ? "bg-green-600"
              : "bg-red-600"
          }
        `}
      >
        <p className="font-medium">
          {message}
        </p>

        <button
          onClick={onClose}
          className="
            mt-4
            px-4
            py-2
            bg-white
            text-black
            rounded
          "
        >
          Close
        </button>
      </div>

    </div>
  );
}