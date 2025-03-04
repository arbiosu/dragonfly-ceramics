"use client";

import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";


export type ToastVariant = "success" | "error" | "info" | "warning";

export interface ToastProps {
    id: string;
    title: string;
    description?: string;
    variant?: ToastVariant;
    duration?: number;
    onClose?: () => void;
};


export function Toast({
    id,
    title,
    description,
    variant = "info",
    duration = 5000,
    onClose
}: ToastProps) {

    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(100);

    useEffect(() => {
        const enterTimeout = setTimeout(() => {
            setIsVisible(true);
        }, 10);

        if (duration !== Number.POSITIVE_INFINITY) {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    const newProgress = prev - 100 / (duration / 100);
                    return newProgress < 0 ? 0 : newProgress;
                })
            }, 100);

            return () => {
                clearTimeout(enterTimeout);
                clearInterval(interval);
            }
        }

        return () => clearTimeout(enterTimeout)
    }, [duration]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose?.();
        }, 300);
    };

    const variantStyles = {
        success: "bg-green-50 border-green-500 text-green-800 dark:bg-green-950 dark:text-green-200",
        error: "bg-red-50 border-red-500 text-red-800 dark:bg-red-950 dark:text-red-200",
        info: "bg-blue-50 border-blue-500 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
        warning: "bg-yellow-50 border-yellow-500 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
    };

    const variantIcons = {
        success: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-green-500 dark:text-green-400"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
        ),
        error: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-red-500 dark:text-red-400"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        ),
        info: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-blue-500 dark:text-blue-400"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        ),
        warning: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-yellow-500 dark:text-yellow-400"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        ),
    };

    return (
        <div
            className={cn(
                `relative flex w-full max-w-sm transform items-center overflow-hidden
                rounded-lg border p-4 shadow-md transition-all duration-300 ease-in-out`,
                variantStyles[variant],
                isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
            )}
            role="alert"
            id={id}
        >
            <div className="mr-3 flex-shrink-0">{variantIcons[variant]}</div>
            <div className="flex-1">
                <h3 className="mb-1 font-medium">{title}</h3>
                {description && <p className="text-sm opacity-90">{description}</p>}
            </div>
            <button
                onClick={handleClose}
                className='ml-4 flex-shrink-0 rounded-full p-1 hover:bg-black/5 focus:bg-black/5 focus:outline-none dark:hover:bg-white/10 dark:focus:bg-white/10'
                aria-label="Close"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            {duration !== Number.POSITIVE_INFINITY && (
                <div
                    className="absolute bottom-0 left-0 h-1 bg-current opacity-20"
                    style={{ width: `${progress}%` }}
                />
            )}
        </div>
    );
};
