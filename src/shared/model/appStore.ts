import { create } from 'zustand';

type AppState = {
    clearError: () => void;
    clearSuccess: () => void;
    error: null | string;
    setError: (message: string) => void;
    setSuccess: (message: string) => void;
    success: null | string;
};

export const useAppStore = create<AppState>((set) => ({
    clearError: () => set({ error: null }),
    clearSuccess: () => set({ success: null }),
    error: null,
    setError: (message) => set({ error: message }),
    setSuccess: (message) => set({ success: message }),
    success: null,
}));