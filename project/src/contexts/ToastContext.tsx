"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { Toast, type ToastProps } from "@/components/toast"


interface Props {
    children: React.ReactNode;
};

interface ToastContextValue {
    toasts: ToastProps[];
    addToast: (toast: Omit<ToastProps, "id">) => void;
    removeToast: (id: string) => void;
};


const ToastContext = createContext<ToastContextValue>({
    toasts: [],
    addToast: () => {},
    removeToast: () => {},
});


export const ToastProvider = ({ children }: Props) => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, []);

    const addToast = useCallback((toast: Omit<ToastProps, "id">) => {
        const id = Date.now().toString();
        setToasts((prevToasts) => [...prevToasts, {...toast, id }]);
        
        // TODO: check
        if (toast.duration !== Number.POSITIVE_INFINITY) {
            const timerId = setTimeout(() => {
                removeToast(id)
            }, toast.duration || 5000);
            return () => clearTimeout(timerId);
        }
    }, [removeToast]);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 md:bottom-4 md:right-4">
                {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    id={toast.id}
                    title={toast.title}
                    description={toast.description}
                    variant={toast.variant}
                    duration={toast.duration}
                    onClose={() => removeToast(toast.id)}
                />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    if (ToastContext === undefined) {
        throw new Error(`useToast must be used within a ToastProvider`);
    }
    return useContext(ToastContext);
};