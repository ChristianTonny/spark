"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface SimpleModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function SimpleModal({ isOpen, onClose, title, children }: SimpleModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Focus management and accessibility
    useEffect(() => {
        if (!isOpen) return;

        const previouslyFocusedElement = document.activeElement as HTMLElement;

        // Set focus to modal
        if (modalRef.current) {
            const closeButton = modalRef.current.querySelector("button") as HTMLElement;
            closeButton?.focus();
        }

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
            previouslyFocusedElement?.focus();
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop with blur */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={onClose}
            />

            {/* Fullscreen Modal */}
            <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div
                    ref={modalRef}
                    className="bg-white border-3 border-black w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-brutal-lg flex flex-col"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-5 border-b-3 border-black bg-background">
                        <h2 id="modal-title" className="font-black text-2xl md:text-3xl uppercase">{title}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white border-2 border-black transition-colors"
                            aria-label="Close modal"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="p-5 md:p-6 overflow-y-auto flex-1">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
