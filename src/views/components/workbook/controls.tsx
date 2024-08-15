
export function PageControls({ currentPage, totalPages, setPage, isMarkingMode, setIsMarkingMode }: {
    currentPage: number, totalPages: number,
    setPage: (page: number) => void, isMarkingMode: boolean, setIsMarkingMode: (marking: boolean) => void
  }) {
  
    function nextSheet() {
      setPage(Math.min(currentPage + 1, totalPages - 1));
    }
  
    function prevSheet() {
      setPage(Math.max(0, currentPage - 1));
    }
  
    return <div className='mathsie-workbook--controls'>
      <div className='pages'>
        <button type="button" onClick={prevSheet}>&lt;</button>
        <span>Page {currentPage + 1} of {totalPages}</span>
        <button type="button" onClick={nextSheet}>&gt;</button></div>
      <div>
        <button type="button" onClick={() => setIsMarkingMode(!isMarkingMode)}>{isMarkingMode ? 'Turn off' : 'Set'} marking</button></div>
    </div>
  }