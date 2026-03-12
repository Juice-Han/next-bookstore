import './globals.css'
import Link from 'next/link'
import style from './layout.module.css'

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        {modal}
        {/* createPortal로 렌더링할 Modal의 위치 */}
        <div id="modal-root"></div>
        <div className={style.container}>
          <header>
            <Link href={'/'}>📚 JuiceHan Book Store</Link>
          </header>
          <main>{children}</main>
          <footer>제작 @JuiceHan</footer>
        </div>
      </body>
    </html>
  )
}
