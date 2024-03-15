import React from 'react'
import './CatalogGrid.scss'
import { IMetaData, IProduct } from '@/types/types'
import ProductCard from '@/components/widgets/cards/ProductCard/ProductCard'
import { setPagination } from '@/store/filters/slice/filters.slice'
import { useAppDispatch } from '@/hooks/useReduxHooks'

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

	const paginate = (pageNumber: number) => {
		if (pageNumber > 0 && pageNumber <= pageCount) {
			dispatch(setPagination({ page: pageNumber, limit: pageSize }))
		}
	}

	const renderPageButtons = () => {
		const maxButtons = 5
		const buttons: JSX.Element[] = []

		let start = 1
		let end = Math.min(pageCount, maxButtons)

		if (page > Math.floor(maxButtons / 2) + 1 && pageCount > maxButtons) {
			start = page - Math.floor(maxButtons / 2)
			end = Math.min(pageCount, page + Math.floor(maxButtons / 2))
		}

		if (start > 1) {
			buttons.push(
				<button
					key='prev'
					className='catalog-grid__pagination-button'
					onClick={() => paginate(page - 1)}
				>
					{'<'}
				</button>
			)
			buttons.push(
				<button
					key='first'
					className='catalog-grid__pagination-button'
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
					className={`catalog-grid__pagination-button ${i === page ? 'active' : ''}`}
					onClick={() => paginate(i)}
				>
					{i}
				</button>
			)
		}

		if (end < pageCount) {
			buttons.push(<span key='ellipsis2'>...</span>)
			buttons.push(
				<button
					key='last'
					className='catalog-grid__pagination-button'
					onClick={() => paginate(pageCount)}
				>
					{pageCount}
				</button>
			)
			buttons.push(
				<button
					key='next'
					className='catalog-grid__pagination-button'
					onClick={() => paginate(page + 1)}
				>
					{'>'}
				</button>
			)
		}

		return buttons
	}

	return (
		<div className='catalog-grid'>
			<div className={`catalog-grid__products ${gridMode === 'row' && 'row'}`}>
				{products.map((product, index) => (
					<ProductCard product={product} variant={gridMode} key={index} />
				))}
			</div>
			<div className='catalog-grid__pagination'>{renderPageButtons()}</div>
		</div>
	)
}

export default React.memo(CatalogGrid)
