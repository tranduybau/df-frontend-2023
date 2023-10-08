import { create } from 'zustand'
import ThemeType from '../types/ThemeType'

interface ThemeState {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

const useThemeStore = create<ThemeState>((set) => ({
  theme: ThemeType.light,
  setTheme: (theme: ThemeType) => set({ theme }),
}))

export default useThemeStore
