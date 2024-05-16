import './Catalog.scss'
import CatalogContent from './CatalogContent'
import Container from '@/components/ui/containers/Container/Container'
import CatalogFilters from './CatalogFilters/CatalogFilters'
import { useTranslations } from 'next-intl'
import Breadcrumbs, { IBreadcrumb } from '@/components/ui/Breadcrumbs/Breadcrumbs'

const Catalog: React.FC = () => {
	const word = useTranslations('catalog')
	const breadcrumbArr: IBreadcrumb[] = [
		{ label: 'Home', href: '/', active: false },
		{ label: 'Catalog', href: 'catalog', active: true }
	]
	return (
		<Container>
			<Breadcrumbs breadcrumbsArr={breadcrumbArr} />
			<div className='catalog'>
				<div className='catalog__title'>{word('title')}</div>
				<div className='catalog__content'>
					<CatalogFilters />
					<CatalogContent />
				</div>
			</div>
		</Container>
	)
}

export default Catalog
