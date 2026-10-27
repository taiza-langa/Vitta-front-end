import { useEffect } from "react";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

export type ToastVariant = "success" | "error";

interface ToastProps {
  message: string;
  variant?: ToastVariant;
  onClose: () => void;
}

export function Toast({
  message,
  variant = "success",
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timeoutId = window.setTimeout(onClose, 5000);
    return () => window.clearTimeout(timeoutId);
  }, [message, onClose]);

  const isError = variant === "error";
  const Icon = isError ? AlertCircle : CheckCircle2;

  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      className={`fixed bottom-4 right-4 z-50 flex w-[calc(100%-2rem)] max-w-sm items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-sm shadow-lg sm:bottom-6 sm:right-6 ${
        isError
          ? "border-red-200 text-red-700"
          : "border-[#CDE5DC] text-[#246F60]"
      }`}
    >
      <Icon size={20} className="shrink-0" />
      <span className="flex-1">{message}</span>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar notificação"
        className={`rounded-lg p-1 transition ${
          isError
            ? "text-red-500 hover:bg-red-50 hover:text-red-700"
            : "text-[#718884] hover:bg-[#F0F8F5] hover:text-[#193F39]"
        }`}
      >
        <X size={16} />
      </button>
    </div>
  );
}
