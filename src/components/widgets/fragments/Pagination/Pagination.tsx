import './Pagination.scss'

interface IPaginationProps {
	currentPage: number
	pageCount: number
	paginate: (pageNumber: number) => void
}

const Pagination: React.FC<IPaginationProps> = ({ currentPage, pageCount, paginate }) => {
	const maxButtons = 3

	const getStartPage = () => {
		return Math.max(1, currentPage - Math.floor(maxButtons / 2))
	}

	const getEndPage = (start: number) => {
		return Math.min(start + maxButtons - 1, pageCount)
	}

	const renderPageButton = (pageNumber: number) => {
		return (
			<button
				key={pageNumber}
				className={`pagination__button ${pageNumber === currentPage ? 'active' : ''}`}
				onClick={() => paginate(pageNumber)}
			>
				{pageNumber}
			</button>
		)
	}

	const renderPageButtons = () => {
		const buttons: JSX.Element[] = []
		let start = getStartPage()
		const end = getEndPage(start)

		if (end - start < maxButtons - 1) {
			start = Math.max(1, end - maxButtons + 1)
		}

		if (start > 1) {
			buttons.push(renderPageButton(1))
			buttons.push(<span key='ellipsis1'>...</span>)
		}

		for (let i = start; i <= end; i++) {
			buttons.push(renderPageButton(i))
		}

		if (end < pageCount) {
			buttons.push(<span key='ellipsis2'>...</span>)
			buttons.push(renderPageButton(pageCount))
		}

		return buttons
	}

	return (
		pageCount > 1 && (
			<nav className='pagination'>
				<button
					key='prev'
					className='pagination__arrow left'
					onClick={() => paginate(Math.max(1, currentPage - 1))}
					aria-label='pagination-arrow-left'
					disabled={currentPage === 1}
				></button>
				{renderPageButtons()}
				<button
					key='next'
					className='pagination__arrow right'
					onClick={() => paginate(Math.min(pageCount, currentPage + 1))}
					aria-label='pagination-arrow-right'
					disabled={currentPage === pageCount}
				></button>
			</nav>
		)
	)
}

export default Pagination
