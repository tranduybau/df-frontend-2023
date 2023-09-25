import React, {memo} from 'react'
import {MoonStar, SunMedium} from "lucide-react";
import Theme from "../../../types/theme";

interface AppHeaderProps {
  theme: Theme
  onToggleTheme: () => void
}

function AppHeader({theme, onToggleTheme}: AppHeaderProps) {
  return (
    <header className="header">
      <div className="container flex items-center justify-between">
        <h1>Bookstore</h1>

        <div className="flex items-center justify-between">
          <img src="https://picsum.photos/200" alt="User Avatar" width="50" height="50" className="avatar"/>

          <span>
            <strong>John Doe</strong>
          </span>

          <button className="ghost p-0 ml-3 min-w-0 theme-btn" type="button" onClick={onToggleTheme}>
            {theme === Theme.LIGHT ? <SunMedium/> : <MoonStar/>}
          </button>
        </div>
      </div>
    </header>
  )
}

export default memo(AppHeader)
