import './Basket.scss'
import { useTranslations } from 'next-intl'
import Container from '@/components/ui/containers/Container/Container'
import BasketContent from './BasketContent/BasketContent'
import Button from '@/components/ui/buttons/Button/Button'
import { Link } from '@/navigation'
import Breadcrumbs, { IBreadcrumb } from '@/components/ui/Breadcrumbs/Breadcrumbs'



const Basket: React.FC = () => {
	const word = useTranslations('basket')
	const breadcrumbArr: IBreadcrumb[] = [
		{ label: 'Home', href: '/', active: false },
		{ label: 'Basket', href: 'basket', active: true }
	]

	return (
		<Container>
			<Breadcrumbs breadcrumbsArr={breadcrumbArr} />
			<div className='basket'>
				<div className='basket__title'>{word('title')}</div>
				<div className='basket__content'>
					<BasketContent />
				</div>
				<div className='basket__order-button-box'>
					<Link href='/order'>
						<Button className='basket__order-button'>{word('order-button')}</Button>
					</Link>
				</div>
			</div>
		</Container>
	)
}

export default Basket
