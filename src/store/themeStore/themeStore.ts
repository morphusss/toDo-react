import { create } from "zustand";

interface ThemeState {
    isDarkTheme: boolean | null;
    updateTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
    (set) => ({
        isDarkTheme: null,
        updateTheme: (isDark) => set(() => ({
            isDarkTheme: isDark,
        }))
    })
)