import './globals.css'
import Link from 'next/link'

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="bg-[#fafafa] text-black">
        {modal}
        {/* createPortal로 렌더링할 Modal의 위치 */}
        <div id="modal-root"></div>
        <div className="max-w-150 min-h-screen my-0 mx-auto bg-white py-0 px-3.75 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
          <header className="h-60px font-bold text-[18px] leading-15">
            <Link href={'/'}>📚 JuiceHan Book Store</Link>
          </header>
          <main className="pt-2.5">{children}</main>
          <footer className="py-25 px-0 text-[#808080]">제작 @JuiceHan</footer>
        </div>
      </body>
    </html>
  )
}
