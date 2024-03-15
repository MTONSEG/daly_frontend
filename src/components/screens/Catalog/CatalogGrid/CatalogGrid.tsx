import React from 'react'
import './CatalogGrid.scss'
import { IProduct } from '@/types/types'
import ProductCard from '@/components/widgets/cards/ProductCard/ProductCard'

interface ICatalogGridProps {
	products: IProduct[]
	gridMode: 'card'|'row'
}

const CatalogGrid: React.FC<ICatalogGridProps> = ({products, gridMode}) => {
	return (
		<div className={`catalog-grid ${gridMode==="row" && "row"}`}>
			{products.map((product, index) => {
				return (
					<ProductCard
						product={product}
						variant={gridMode}
						key={index}
					/>
				)
			})}
		</div>
	)
}

export default React.memo(CatalogGrid)
