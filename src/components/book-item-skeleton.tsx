export default function BookItemSkeleton() {
  return (
    <div className="flex gap-3.75 px-2.5 py-5 border-b border-[rgb(220,220,220)]">
      <div className="w-20 h-26.25 bg-[rgb(230,230,230)]"></div>
      <div className="flex-1">
        <div className="w-full h-5 bg-[rgb(230,230,230)]"></div>
        <div className="w-full h-5 bg-[rgb(230,230,230)]"></div>
        <br />
        <div className="w-full h-5 bg-[rgb(230,230,230)]"></div>
      </div>
    </div>
  )
}
