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
            {/* Backdrop - 100% viewport coverage */}
            <div
                className="fixed z-[60] bg-black/60 backdrop-blur-sm"
                style={{
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    margin: 0,
                    padding: 0
                }}
                onClick={onClose}
            />

            {/* Modal Container - clicking here closes modal */}
            <div
                className="fixed z-[70] flex items-center justify-center"
                style={{
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    padding: '1rem'
                }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                onClick={onClose}
            >
                {/* Modal Card - clicking here does NOT close modal */}
                <div
                    ref={modalRef}
                    className="bg-white border-3 border-black w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-5 border-b-3 border-black bg-background">
                        <h2 id="modal-title" className="font-black text-2xl md:text-3xl uppercase">{title}</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white border-2 border-black transition-colors"
                            aria-label="Close modal (Esc)"
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

