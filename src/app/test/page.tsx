'use client'

import { useRef } from 'react'
import { loginAction } from './login.action'

export default function Page() {
  const idRef = useRef<HTMLInputElement>(null)
  const pwRef = useRef<HTMLInputElement>(null)

  const onClickLogin = async () => {
    if (!idRef.current || !pwRef.current) return

    const id = idRef.current.value
    const password = pwRef.current.value

    const formData = new FormData()
    formData.set('id', id)
    formData.set('password', password)

    await loginAction(formData)
  }
  return (
    <div>
      <input ref={idRef} type="text" name="id" />
      <input ref={pwRef} type="password" name="password" />
      <button onClick={onClickLogin}>로그인</button>
    </div>
  )
}
