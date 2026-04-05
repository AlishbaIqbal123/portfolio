import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

interface ConfirmDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    isDeleting?: boolean;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    isDeleting = false
}) => {
    const { isDark } = useTheme();

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={`w-full max-w-md rounded-2xl border-2 shadow-2xl overflow-hidden ${
                            isDark ? 'bg-card border-red-500/20' : 'bg-white border-red-100'
                        }`}
                    >
                        {/* Header with warning icon */}
                        <div className={`p-6 flex flex-col items-center text-center space-y-4 ${
                            isDark ? 'bg-red-500/5' : 'bg-red-50/30'
                        }`}>
                            <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${
                                isDark ? 'bg-red-500/10 text-red-500' : 'bg-red-100 text-red-600'
                            }`}>
                                <Trash2 className="w-8 h-8" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-bold text-foreground">{title}</h3>
                                <p className="text-sm text-muted-foreground">{description}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-6 flex gap-3 flex-col sm:flex-row">
                            <button
                                onClick={onClose}
                                disabled={isDeleting}
                                className={`flex-1 h-12 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${
                                    isDark 
                                        ? 'bg-muted text-muted-foreground hover:bg-muted/80' 
                                        : 'bg-muted text-foreground hover:bg-muted/80'
                                }`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={isDeleting}
                                className="flex-1 h-12 rounded-xl text-sm font-bold uppercase tracking-widest bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                            >
                                {isDeleting ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>Delete Now</>
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
