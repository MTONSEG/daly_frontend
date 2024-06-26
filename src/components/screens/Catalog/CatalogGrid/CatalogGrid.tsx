import React, { useState } from 'react'
import './CatalogGrid.scss'
import { IMetaData, IProduct } from '@/types/types'
import ProductCard from '@/components/widgets/cards/ProductCard/ProductCard'
import { setPagination } from '@/store/filters/slice/filters.slice'
import { useAppDispatch } from '@/hooks/useReduxHooks'
import Pagination from '@/components/widgets/fragments/Pagination/Pagination'
import ShowBtn from '@/components/ui/buttons/ShowBtn/ShowBtn'
import EmptyList from '@/components/widgets/fragments/EmptyList/EmptyList'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

interface ICatalogGridProps {
	products: IProduct[]
	gridMode: 'card' | 'row'
	meta?: IMetaData
}

const CatalogGrid: React.FC<ICatalogGridProps> = ({ products, gridMode, meta }) => {
	// console.log("🚀 ~ products:", products)
	const dispatch = useAppDispatch()
	const word = useTranslations('catalog')

	const {locale} = useParams();

	const calculatePageSize = (size: number): number => (size === 12 ? 20 : 12)
	const calculateOffsetStart = (currentPage: number, pageSize: number) => {
		if (pageSize === 20) {
			return 12 * (currentPage - 1)
		} else {
			return pageSize * (currentPage - 1)
		}
	}

	const [currentPage, setCurrentPage] = useState<number>(meta?.pagination?.page ?? 1)
	const [visibleProducts, setVisibleProducts] = useState<boolean>(false)

	const paginate = (pageNumber: number): void => {
		if (
			(meta?.pagination && pageNumber > 0 && pageNumber <= meta.pagination.pageCount) ||
			meta?.pagination.total
		) {
			setCurrentPage(pageNumber)
			setVisibleProducts(false)
			dispatch(
				setPagination({
					page: pageNumber,
					limit: meta.pagination.pageSize
						? meta.pagination.pageSize
						: calculatePageSize(meta.pagination.pageSize)
				})
			)
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}

	const showItems = (): void => {
		const pageSize = calculatePageSize(meta?.pagination.pageSize ?? 12)
		const offsetStart = calculateOffsetStart(currentPage, pageSize)
		if (products.length === 12) {
			dispatch(
				setPagination({
					page: currentPage,
					limit: pageSize,
					start: offsetStart
				})
			)
		} else {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
		setVisibleProducts(!visibleProducts)
	}

	return (
		<section className='catalog-grid'>
			<ul
				className={`catalog-grid__products ${gridMode === 'row' && 'row'} ${
					(meta && meta.pagination.pageCount > 4) || products.length >= 4 ? '' : 'lesser'
				}`}
			>
				{products.length > 0 ? (
					products
						.slice(0, visibleProducts ? 20 : 12)
						.map((product, index) => (
							<ProductCard product={product} variant={gridMode} key={index} locale={locale}/>
						))
				) : meta && meta?.pagination.total > 0 ? (
					Array.from({ length: 12 }).map((_, index) => (
						<ProductCard variant={gridMode} key={index} locale={locale}/>
					))
				) : (
					<EmptyList emptyText1={word("empty-text-1")} emptyText2={word("empty-text-2")}/>
				)}
			</ul>
			{products.length > 0 && meta && meta.pagination.pageCount > 1 && (
				<div className='catalog-grid__show-button'>
					<ShowBtn
						showAllItems={visibleProducts}
						setShowAllItems={showItems}
						shouldShowMoreButton={true}
					/>
				</div>
			)}
			{products.length > 0 && meta && meta.pagination && (
				<Pagination
					currentPage={currentPage}
					pageCount={meta.pagination.pageCount || meta.pagination.total}
					paginate={paginate}
				/>
			)}
		</section>
	)
}

export default CatalogGrid
