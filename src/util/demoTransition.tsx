import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, easeInOut } from "motion/react";

export const useDemoTransition = () => {
    const navigate = useNavigate();

    const triggerDemoTransition = (logoSrc: string, targetPath: string) => {
        const div = document.createElement("div");
        div.id = "demo-transition";
        document.body.appendChild(div);

        const DemoOverlay = () => {
            const [show, setShow] = useState(true);

            useEffect(() => {

                const timer = setTimeout(() => {
                    setShow(false);
                    navigate(targetPath);
                }, 555);

                return () => clearTimeout(timer);
            }, []);

            return createPortal(
                <AnimatePresence
                    onExitComplete={() => {
                        document.body.removeChild(div);
                    }}
                >
                    {show && (
                        <motion.div
                            className="fixed inset-0 bg-[#808080] flex justify-center items-center z-[9999]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.img
                                src={logoSrc}
                                className="w-auto h-auto max-w-[80vw] max-h-[80vh] object-contain"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1.2, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ duration: 0.25, ease: easeInOut }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>,
                div
            );
        };

        // Lazy-load React 18 root API
        import("react-dom/client").then(({ createRoot }) => {
            const root = createRoot(div);
            root.render(<DemoOverlay />);
        });

    };

    return { triggerDemoTransition };
};
