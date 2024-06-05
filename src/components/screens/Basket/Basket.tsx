import './Basket.scss'
import { useTranslations } from 'next-intl'
import Container from '@/components/ui/containers/Container/Container'
import BasketContent from './BasketContent/BasketContent'
import Button from '@/components/ui/buttons/Button/Button'
import { Link } from '@/navigation'
import Breadcrumbs from '@/components/ui/Breadcrumbs/Breadcrumbs'


const Basket: React.FC = () => {
	const word = useTranslations('basket')

	return (
		<Container>
			<Breadcrumbs />
			<div className='basket'>
				<div className='basket__title'>{word('title')}</div>
				<div className='basket__content'>
					<BasketContent />
				</section>
				<div className='basket__order-button-box'>
					<Link href='/order'>
						<Button className='basket__order-button'>{word('order-button')}</Button>
					</Link>
				</div>
			</section>
		</Container>
	)
}

export default Basket
