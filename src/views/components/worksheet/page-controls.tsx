import { IconButton } from "../buttons/icon-button";

export function PageControls({ currentPage, totalPages, setPage }: {
  currentPage: number, totalPages: number, setPage: (page: number) => void
}) {

  function nextSheet() {
    setPage(Math.min(currentPage + 1, totalPages - 1));
  }

  function prevSheet() {
    setPage(Math.max(0, currentPage - 1));
  }

  return <div className="flex gap-4 items-center">
      <IconButton onClick={prevSheet} faClass="chevron-left" className={`${currentPage > 0 ? 'visible': 'invisible' } !p-3 bg-transparent`} />
      <span className="font-bold text-sm dark:text-white"><span className="block md:hidden">{currentPage + 1} / {totalPages}</span><span className="hidden md:block">Page {currentPage + 1} of {totalPages}</span></span>
      <IconButton onClick={nextSheet} faClass="chevron-right" className={`${currentPage + 1 < totalPages ? 'visible': 'invisible'} !p-3 bg-transparent`} />
    </div>
}