import './Basket.scss'
import { useTranslations } from 'next-intl'
import Container from '@/components/ui/containers/Container/Container'
import BasketProducts from './BasketProducts/BasketProducts'

const Basket: React.FC = () => {
	const word = useTranslations('comparison')

	return (
		<Container>
			<div className='basket'>
				<div className='basket__title'></div>
				<div className='basket__content'>
					<BasketProducts />
				</div>
				<div className='basket__order-button'></div>
			</div>
		</Container>
	)
}

export default Basket
