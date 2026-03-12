'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])
  return createPortal(
    <div
      className="bg-black/70 fixed inset-0 p-0 z-999 flex justify-center items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          router.back()
        }
      }}
    >
      <div className="max-w-150 max-h-[80vh] w-full h-full p-5 bg-white rounded-[5px] relative z-1000 overflow-y-scroll">
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  )
}
