'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import classNames from 'classnames'
import { useEffect } from 'react'
import { RefreshCw } from 'lucide-react'
import Link from 'next/link'
import ThemeWatcher from '../watcher/ThemeWatcher'
import ThemeToggle from '../components/ThemeToggle'
import useBookStore from '../storages/bookStore'
import PAGES from '../constants/pages'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isFetchedBooks, getBooks } = useBookStore()

  useEffect(() => {
    getBooks()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <html lang="en">
      <body
        className={classNames(
          inter.className,
          'bg-bg min-h-screen flex flex-col',
        )}
      >
        <ThemeWatcher />

        <header className="w-full sticky bg-white dark:bg-black py-[1rem]">
          <div className="container mx-auto flex items-center justify-between">
            <Link href={PAGES.HOME}>
              <h1 className="text-[2rem]">Bookstore</h1>
            </Link>

            <div className="flex items-center gap-[0.5rem]">
              <ThemeToggle />

              <Image
                src="https://picsum.photos/200"
                alt="User Avatar"
                width="50"
                height="50"
                className="rounded-full"
              />

              <span>
                <strong>John Doe</strong>
              </span>
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col">
          {isFetchedBooks ? (
            children
          ) : (
            <div className="animate-spin flex justify-center items-center flex-1">
              <RefreshCw />
            </div>
          )}
        </div>
      </body>
    </html>
  )
}
