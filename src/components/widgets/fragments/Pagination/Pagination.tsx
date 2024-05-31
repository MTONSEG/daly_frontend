import './Pagination.scss'
interface IPaginationProps {
	currentPage: number
	pageCount: number
	paginate: (pageNumber: number) => void
}

const Pagination: React.FC<IPaginationProps> = ({ currentPage, pageCount, paginate }) => {
	const renderPageButtons = () => {
		const maxButtons = 3
		const buttons: JSX.Element[] = []

		let start = Math.max(1, currentPage - Math.floor(maxButtons / 2))
		const end = Math.min(start + maxButtons - 1, pageCount)

		if (end - start < maxButtons - 1) {
			start = Math.max(1, end - maxButtons + 1)
		}

		if (start > 1) {
			buttons.push(
				<button
					key='first'
					className={`pagination__button ${1 === currentPage ? 'active' : ''}`}
					onClick={() => paginate(1)}
				>
					{1}
				</button>
			)

			buttons.push(<span key='ellipsis1'>...</span>)
		}

		for (let i = start; i <= end; i++) {
			buttons.push(
				<button
					key={i}
					className={`pagination__button ${i === currentPage ? 'active' : ''}`}
					onClick={() => paginate(i)}
				>
					{i}
				</button>
			)
		}

		if (end < pageCount) {
			buttons.push(<span key='ellipsis2'>...</span>)
		}

		if (end < pageCount) {
			buttons.push(
				<button
					key='last'
					className={`pagination__button ${pageCount === currentPage ? 'active' : ''}`}
					onClick={() => paginate(pageCount)}
				>
					{pageCount}
				</button>
			)
		}

		return buttons
	}

	return (
		pageCount > 1 && (
			<nav className='pagination'>
				<button
					key='prev'
					className='pagination__arrow left'
					onClick={() => paginate(currentPage - 1)}
					aria-label='pagination-arrow-left'
				></button>
				{renderPageButtons()}
				<button
					key='next'
					className='pagination__arrow right'
					onClick={() => paginate(currentPage + 1)}
					aria-label='pagination-arrow-right'
				></button>
			</nav>
		)
	)
}

export default Pagination
