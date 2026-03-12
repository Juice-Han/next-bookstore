'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Searchbar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState('')

  const q = searchParams.get('q')

  useEffect(() => {
    setSearch(q || '')
  }, [q])

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onSubmit = () => {
    if (!search || q === search) return
    router.push(`/search?q=${search}`)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <div className="flex gap-2.5 mb-5">
      <input
        className="flex-1 p-3.75 rounded-[5px] border border-[rgb(220,220,220)]"
        placeholder="검색어를 입력하세요 .."
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
      />
      <button
        className="w-20 rounded-[5px] border-none bg-[rgb(37,147,255)] text-white cursor-pointer"
        onClick={onSubmit}
      >
        검색
      </button>
    </div>
  )
}
