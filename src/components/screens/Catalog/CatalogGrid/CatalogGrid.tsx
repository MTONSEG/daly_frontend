import React, { useState, useEffect } from 'react'
import './CatalogGrid.scss'
import { IMetaData, IProduct } from '@/types/types'
import ProductCard from '@/components/widgets/cards/ProductCard/ProductCard'
import { setPagination } from '@/store/filters/slice/filters.slice'
import { useAppDispatch } from '@/hooks/useReduxHooks'
import Loader from '@/components/ui/loaders/Loader'
import Pagination from '@/components/widgets/fragments/Pagination/Pagination'
import ShowBtn from '@/components/ui/buttons/ShowBtn/ShowBtn'

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
	const [visibleProducts, setVisibleProducts] = useState<boolean>(false)

	const paginate = (pageNumber: number) => {
		if (pageNumber > 0 && pageNumber <= pageCount) {
			setCurrentPage(pageNumber)
			dispatch(setPagination({ page: pageNumber, limit: pageSize }))
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}

	return (
		<div className='catalog-grid'>
			<div className={`catalog-grid__products ${gridMode === 'row' && 'row'}`}>
				{products.length > 0 ? (
					products
						.slice(0, visibleProducts ? 20 : 12)
						.map((product, index) => (
							<ProductCard product={product} variant={gridMode} key={index} />
						))
				) : (
					<Loader />
				)}
			</div>
			{products.length > 0 && (
				<div className='catalog-grid__show-button'>
					<ShowBtn
						showAllItems={visibleProducts}
						setShowAllItems={setVisibleProducts}
						shouldShowMoreButton={false}
					/>
				</div>
			)}
			{products.length > 0 && (
				<Pagination
					currentPage={currentPage}
					pageCount={pageCount}
					paginate={paginate}
				/>
			)}
		</div>
	)
}

export default React.memo(CatalogGrid)
