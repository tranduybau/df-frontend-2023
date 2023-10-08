'use client'

import React from 'react'
import { MoonStar, Sun } from 'lucide-react'

import useThemeStore from '../../storages/themeStore'

import ThemeType from '../../types/ThemeType'

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeStore()

  const onChangeTheme = () => {
    setTheme(theme === ThemeType.light ? ThemeType.dark : ThemeType.light)
  }

  return (
    <button className="ghost" type="button" onClick={onChangeTheme}>
      {theme === ThemeType.light ? (
        <Sun className="text-text" />
      ) : (
        <MoonStar className="text-text" />
      )}
    </button>
  )
}
