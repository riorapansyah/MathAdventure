import { create } from "zustand";

// Handel Open Close SideBar
type SideBarType = {
    side: boolean;
    openSidebarFn: () => void;
};

export const sideBarStore = create<SideBarType>((set) => ({
    side: false,
    openSidebarFn: () => set((state) => ({ side: !state.side })),
}));

// Handel Change Theme
type ThemeTypeFn = {
    theme: string;
    changeThemeFn: () => void;
};

export const changeThemeStore = create<ThemeTypeFn>((set) => {
    const storedTheme = localStorage.getItem("theme");
    const initialTheme = storedTheme ? storedTheme : "light";

    return {
        theme: initialTheme,
        changeThemeFn: () => {
            const newTheme = initialTheme === "light" ? "dark" : "light";
            localStorage.setItem("theme", newTheme);
            set({ theme: newTheme });
        },
    };
});


