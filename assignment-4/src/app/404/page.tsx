import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import PAGES from '../../constants/pages'

export default function Page404() {
  return (
    <Link className="flex-1 flex justify-center items-center" href={PAGES.HOME}>
      <Image
        src="https://cdn.svgator.com/images/2022/01/404-svg-animation.svg"
        alt="404"
        width={100}
        height={100}
        className="w-full h-full"
      />
    </Link>
  )
}
