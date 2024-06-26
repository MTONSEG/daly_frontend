import './Catalog.scss'
import CatalogContent from './CatalogContent'
import Container from '@/components/ui/containers/Container/Container'
import CatalogFilters from './CatalogFilters/CatalogFilters'
import { useTranslations } from 'next-intl'
import Breadcrumbs from '@/components/ui/Breadcrumbs/Breadcrumbs'

const Catalog: React.FC = () => {
	const word = useTranslations('catalog')
	
	return (
		<Container>
			<Breadcrumbs />
			<div className='catalog'>
				<h2 className='catalog__title'>{word('title')}</h2>
				<div className='catalog__content'>
					<CatalogFilters />
					<CatalogContent />
				</div>
			</div>
		</Container>

	)
}

export default Catalog
