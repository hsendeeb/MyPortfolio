"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface HandWrittenTitleProps {
    title?: string;
    subtitle?: string;
    className?: string;
    titleClassName?: string;
    subtitleClassName?: string;
    pathClassName?: string;
    hideText?: boolean;
    pathData?: string;
    strokeWidth?: number;
}

function HandWrittenTitle({
    title = "Hand Written",
    subtitle = "Optional subtitle",
    className,
    titleClassName,
    subtitleClassName,
    pathClassName,
    hideText = false,
    pathData = `M 950 90
                C 1250 300, 1050 480, 600 520
                C 250 520, 150 480, 150 300
                C 150 120, 350 80, 600 80
                C 850 80, 950 180, 950 180`,
    strokeWidth = 12,
}: HandWrittenTitleProps) {
    const handwritingEase = [0.43, 0.13, 0.23, 0.96] as const;

    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { duration: 2.5, ease: handwritingEase },
                opacity: { duration: 0.5 },
            },
        },
    };

    return (
        <div className={cn("relative mx-auto w-full max-w-4xl py-24", className)}>
            <div className="absolute inset-0">
                <motion.svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 1200 600"
                    initial="hidden"
                    animate="visible"
                    className="h-full w-full"
                >
                    <title>KokonutUI</title>
                    <motion.path
                        d={pathData}
                        fill="none"
                        strokeWidth={strokeWidth}
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        variants={draw}
                        className={cn("text-black opacity-90 dark:text-white", pathClassName)}
                    />
                </motion.svg>
            </div>
            {!hideText && (
                <div className="relative z-10 flex flex-col items-center justify-center text-center">
                    <motion.h1
                        className={cn(
                            "flex items-center gap-2 text-4xl tracking-tighter text-black dark:text-white md:text-6xl",
                            titleClassName
                        )}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        {title}
                    </motion.h1>
                    {subtitle && (
                        <motion.p
                            className={cn("text-xl text-black/80 dark:text-white/80", subtitleClassName)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                        >
                            {subtitle}
                        </motion.p>
                    )}
                </div>
            )}
        </div>
    );
}

function HandWrittenTitleDemo() {
    return <HandWrittenTitle title="Kokonut UI" subtitle="Optional subtitle" />;
}

export { HandWrittenTitle, HandWrittenTitleDemo };
