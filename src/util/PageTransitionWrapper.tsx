import { motion, easeInOut } from "motion/react";

type PageTransitionWrapperProps = {
    children: React.ReactNode;
    direction: "none" | "left" | "right";
};

const variants = {
    initialLeft: { x: "100vw", opacity: 0 },
    initialRight: { x: "-100vw", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exitLeft: { x: "100vw", opacity: 0 },
    exitRight: { x: "-100vw", opacity: 0 },
};

export default function PageTransitionWrapper({ children, direction }: PageTransitionWrapperProps) {
    const isNone = direction === "none";

    return (
        <motion.div
            initial={isNone ? {} : direction === "right" ? variants.initialRight : variants.initialLeft}
            animate={isNone ? {} : variants.animate}
            exit={isNone ? {} : direction === "right" ? variants.exitLeft : variants.exitRight}
            transition={isNone ? {} : {
                duration: 0.5,
                ease: easeInOut,
            }}
        >
            {children}
        </motion.div>
    );
}
