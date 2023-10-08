'use client'

import React, { useEffect, useState } from 'react'
import ThemeType from '../types/ThemeType'
import useThemeStore from '../storages/themeStore'
import { LocalStorageKeys } from '../constants/keys'

export default function ThemeWatcher() {
  const { theme, setTheme } = useThemeStore()
  const [isSetTheme, setIsSetTheme] = useState(false)

  useEffect(() => {
    try {
      const curTheme = localStorage.getItem(LocalStorageKeys.THEME)

      if (curTheme) {
        setTheme(curTheme as ThemeType)
      } else {
        throw new Error('No theme found')
      }
    } catch (_e) {
      setTheme(ThemeType.light)
    } finally {
      setIsSetTheme(true)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isSetTheme) {
      localStorage.setItem(LocalStorageKeys.THEME, theme)

      if (theme === ThemeType.dark && typeof window !== 'undefined') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [theme, isSetTheme])

  return <div style={{ display: 'none' }} />
}
