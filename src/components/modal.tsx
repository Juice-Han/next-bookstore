'use client'

import { ReactNode, useEffect } from 'react'
import style from './modal.module.css'
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
      className={style.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          router.back()
        }
      }}
    >
      <div className={style.modal}>{children}</div>
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  )
}
