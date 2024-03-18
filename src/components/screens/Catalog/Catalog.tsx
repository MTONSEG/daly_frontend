// 'use client'
import './Catalog.scss'
import React from 'react'
import CatalogContent from './CatalogContent'
import Container from '@/components/ui/containers/Container/Container'
import CatalogFilters from './CatalogFilters/CatalogFilters'
import { useTranslations } from 'next-intl'

const Catalog: React.FC = () => {
	const word = useTranslations("catalog");
	return (
		<Container>
			<div className='catalog'>
				<div className='catalog__title'>{word("title")}</div>
				<div className='catalog__content'>
					<CatalogFilters />
					<CatalogContent />
				</div>
			</div>
		</Container>
	)
}

export default Catalog
