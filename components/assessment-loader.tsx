'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AssessmentLoaderProps {
    message?: string;
    subMessage?: string;
    fullscreen?: boolean;
}

export function AssessmentLoader({
    message = "LOADING...",
    subMessage,
    fullscreen = false
}: AssessmentLoaderProps) {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const content = (
        <div className="flex flex-col items-center justify-center p-8 bg-white border-3 border-black shadow-brutal-lg max-w-sm w-full mx-4 animate-in fade-in zoom-in duration-300">
            {/* Animated Shapes Container */}
            <div className="flex gap-4 mb-8">
                <div className="w-8 h-8 bg-brutal-orange border-3 border-black animate-[bounce_1s_infinite_0ms]" />
                <div className="w-8 h-8 bg-brutal-blue border-3 border-black animate-[bounce_1s_infinite_200ms]" />
                <div className="w-8 h-8 bg-brutal-yellow border-3 border-black animate-[bounce_1s_infinite_400ms]" />
            </div>

            {/* Text Content */}
            <div className="text-center space-y-2">
                <h3 className="text-2xl font-black italic tracking-widest">
                    {message}{dots}
                </h3>
                {subMessage && (
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                        {subMessage}
                    </p>
                )}
            </div>

            {/* Loading Bar */}
            <div className="w-full h-3 bg-gray-100 border-2 border-black mt-6 overflow-hidden">
                <div className="h-full bg-black animate-[shimmer_2s_infinite_linear] w-[50%] translate-x-[-150%]"
                    style={{
                        backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
                        backgroundSize: '1rem 1rem'
                    }}
                />
            </div>
        </div>
    );

    if (fullscreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-brutal-bg/80 backdrop-blur-sm">
                {content}
            </div>
        );
    }

    return content;
}
