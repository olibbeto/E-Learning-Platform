"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-50 flex flex-col gap-2 sm:max-w-sm">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDismiss }: { toast: ToastMessage; onDismiss: () => void }) {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    // Trigger animation in
    requestAnimationFrame(() => {
      setIsShowing(true);
    });
  }, []);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  };

  const backgrounds = {
    success: "bg-white border-green-100",
    error: "bg-white border-red-100",
    info: "bg-white border-blue-100"
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 w-full sm:min-w-[300px] rounded-lg border shadow-lg transition-all duration-300 ease-in-out transform",
        backgrounds[toast.type],
        isShowing ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      )}
      role="alert"
    >
      <div className="shrink-0">{icons[toast.type]}</div>
      <p className="text-sm font-medium text-slate-700 flex-1">{toast.message}</p>
      <button 
        onClick={onDismiss}
        className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
