import { IconButton } from "../buttons/icon-button";
import { SiteHeader } from "../site/header";

export function PageControls({ currentPage, totalPages, setPage }: {
  currentPage: number, totalPages: number, setPage: (page: number) => void
}) {

  function nextSheet() {
    setPage(Math.min(currentPage + 1, totalPages - 1));
  }

  function prevSheet() {
    setPage(Math.max(0, currentPage - 1));
  }

  return <SiteHeader>
    <div className="flex grow gap-4 items-center">
      <IconButton onClick={prevSheet} faClass="chevron-left" />
      <span className="font-bold text-sm">Page {currentPage + 1} of {totalPages}</span>
      <IconButton onClick={nextSheet} faClass="chevron-right" />
    </div>
  </SiteHeader>
}