import React, { useState } from 'react'
import './CatalogGrid.scss'
import { IMetaData, IProduct } from '@/types/types'
import ProductCard from '@/components/widgets/cards/ProductCard/ProductCard'
import { setPagination } from '@/store/filters/slice/filters.slice'
import { useAppDispatch } from '@/hooks/useReduxHooks'
import Loader from '@/components/ui/loaders/Loader'

interface ICatalogGridProps {
	products: IProduct[]
	gridMode: 'card' | 'row'
	meta: IMetaData
}

const CatalogGrid: React.FC<ICatalogGridProps> = ({
	products,
	gridMode,
	meta
}) => {
	const { page, pageSize, pageCount } = meta.pagination
	const dispatch = useAppDispatch()

	const [currentPage, setCurrentPage] = useState(page)

	const paginate = (pageNumber: number) => {
		if (pageNumber > 0 && pageNumber <= pageCount) {
			setCurrentPage(pageNumber)
			dispatch(setPagination({ page: pageNumber, limit: pageSize }))

			// Scroll to the top of the page
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}

	const renderPageButtons = () => {
		const maxButtons = 3
		const buttons: JSX.Element[] = []

		let start = Math.max(1, currentPage - Math.floor(maxButtons / 2))
		let end = Math.min(start + maxButtons - 1, pageCount)

		if (end - start < maxButtons - 1) {
			start = Math.max(1, end - maxButtons + 1)
		}

		if (start > 1) {
			buttons.push(
				<button
					key='first'
					className={`catalog-grid__pagination-button ${
						1 === currentPage ? 'active' : ''
					}`}
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
					className={`catalog-grid__pagination-button ${
						i === currentPage ? 'active' : ''
					}`}
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
					className={`catalog-grid__pagination-button ${
						pageCount === currentPage ? 'active' : ''
					}`}
					onClick={() => paginate(pageCount)}
				>
					{pageCount}
				</button>
			)
		}

		return buttons
	}

	return (
		<div className='catalog-grid'>
			<div className={`catalog-grid__products ${gridMode === 'row' && 'row'}`}>
				{products.length > 0 ? (
					products.map((product, index) => (
						<ProductCard product={product} variant={gridMode} key={index} />
					))
				) : (
					<Loader />
				)}
			</div>
			<div className='catalog-grid__pagination'>
				<button
					key='prev'
					className='catalog-grid__arrow left'
					onClick={() => paginate(currentPage - 1)}
				></button>
				{renderPageButtons()}
				<button
					key='next'
					className='catalog-grid__arrow right'
					onClick={() => paginate(currentPage + 1)}
				></button>
			</div>
		</div>
	)
}

export default React.memo(CatalogGrid)
