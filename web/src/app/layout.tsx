import { ReactNode } from 'react'
import './globals.css'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'
import { Profile } from '@/components/Profile'
import { SingIn } from '@/components/SingIn'
import { Hero } from '@/components/Hero'
import { Copyright } from '@/components/Copyright'
import { cookies } from 'next/headers'

const roboto = Roboto({ subsets: ['latin'], variable: '--fot-roboto' })
const baijamjure = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--fot-bai-jamjuree',
})

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula do tempo construida com React, Next.js, TailwindCSS e TypeScript',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().has('token')
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baijamjure.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2">
          {/* left */}
          <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
            {/* bluer */}
            <div className="absolute right-0 top-1/2 h-[288px] w-[256px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />
            {/* strips */}
            <div className="absolute bottom-0 right-2 top-0 w-2  bg-stripes " />
            {isAuthenticated ? <Profile /> : <SingIn />}
            <Hero />
            <Copyright />
          </div>
          {/* right */}
          <div className="flex max-h-screen flex-col overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover ">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
