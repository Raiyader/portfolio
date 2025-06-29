import { AnimatePresence, motion, easeInOut } from "motion/react";
import type { ReactNode } from "react";

type ModalWrapperProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    className?: string;
};

export default function ModalWrapper({ isOpen, onClose, children, className = "" }: ModalWrapperProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-100 bg-black/60 flex items-center justify-center"
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.3, ease: easeInOut }}
                        className={`${className || "bg-white"} rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto mx-4 p-6 relative`}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
