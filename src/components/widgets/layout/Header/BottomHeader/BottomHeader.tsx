import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import Container from '@/components/ui/containers/Container/Container'
import {
	BurgerIcon,
	CartIcon,
	CompareIcon,
	DeliveryIcon,
	FavoriteIcon,
	SearchIcon
} from '@/components/ui/icons'
import { DELIVERY_PATH } from '@/routes/routes'
import { useTranslations } from 'next-intl'

export default function BottomHeader() {
	const t = useTranslations('home')

	return (
		<div className='bottom-header'>
			<Container>
				<div className='bottom-header__row'>
					<BurgerIcon />

					<LinkBtn
						href={`/${DELIVERY_PATH}`}
						icon={<DeliveryIcon />}
						text={t('deliveryAndPay')}
					/>

					<SearchIcon />
					<CompareIcon />
					<FavoriteIcon />
					<CartIcon />
				</div>
			</Container>
		</div>
	)
}
