"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { useAppSelector } from '@/hooks/useReduxHooks'
import CatalogContent from './CatalogContent'
import Container from '@/components/ui/containers/Container/Container'
import CatalogFilters from './CatalogFilters/CatalogFilters'

const Catalog: React.FC = () => {
	const { locale } = useParams()
	const filtersFromRedux = useAppSelector((state) => state.filters.filtersData)

	return (
			<Container>
				<CatalogFilters />
				<CatalogContent filters={filtersFromRedux} locale={locale} />
			</Container>
	)
}

export default Catalog
