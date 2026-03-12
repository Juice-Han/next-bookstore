import BookPage from '@/app/book/[id]/page'
import Modal from '@/components/modal'
import { Suspense } from 'react'
import BokPageSkeleton from './book-page-skeleton'

export default function Page(props: any) {
  return (
    <Modal>
      <Suspense fallback={<BokPageSkeleton />}>
        <BookPage {...props} />
      </Suspense>
    </Modal>
  )
}
