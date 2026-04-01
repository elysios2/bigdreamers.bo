import { AlertCircle, CheckCircle } from "lucide-react";

export type ToastData = {
  type: "success" | "error";
  message: string;
} | null;

interface ToastNotificationProps {
  toast: ToastData;
}

export default function ToastNotification({ toast }: ToastNotificationProps) {
  if (!toast) return null;

  return (
    <div
      className={`fixed top-24 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-white text-sm font-medium ${
        toast.type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
      style={{ animation: "slideIn 0.3s ease both" }}
    >
      {toast.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
      {toast.message}
    </div>
  );
}
