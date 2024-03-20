import React from 'react'
import './CatalogGridHead.scss'
import BasicDrop from '@/components/screens/Catalog/CatalogGridHead/CatalogGridHeadSorter/CatalogGridHeadSorter'
import CatalogGridHeadModder from './CatalogGridHeadModder/CatalogGridHeadModder'
import { useTranslations } from 'next-intl'
interface Props {
	productsQuantity: number
}



const CatalogGridHead: React.FC<Props> = ({ productsQuantity }) => {
	const word = useTranslations("sorting");

	return (
		<div className='catalog-grid-head'>
			<div className='catalog-grid-head__word'>{productsQuantity}</div>
			<div className='catalog-grid-head__controls'>
				<div className='catalog-grid-head__sort'>
					<div className='catalog-grid-head__word'>{ word("sorting-pre-word")}</div>
					<BasicDrop
						sortingOptions={['publishedAt', 'price', 'rating']}
						sortingMethods={['asc', 'desc']}
					/>
				</div>
				<CatalogGridHeadModder/>
			</div>
		</div>
	)
}

export default CatalogGridHead
