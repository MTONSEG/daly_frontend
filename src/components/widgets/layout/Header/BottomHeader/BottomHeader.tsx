import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import Container from '@/components/ui/containers/Container/Container'
import { BurgerIcon, DeliveryIcon, SearchIcon } from '@/components/ui/icons'
import CartPopup from '@/components/widgets/layout/Header/BottomHeader/CartPopup/CartPopup'
import ComparePopup from '@/components/widgets/layout/Header/BottomHeader/ComparePopup/ComparePopup'
import FavoritePopup from '@/components/widgets/layout/Header/BottomHeader/FavoritePopup/FavoritePopup'

import { CATALOG_PATH, DELIVERY_PATH, SUPPORT_PATH } from '@/routes/routes'
import { useTranslations } from 'next-intl'

export default function BottomHeader() {
	const t = useTranslations('home')

	return (
		<div className='bottom-header'>
			<Container>
				<div className='bottom-header__row'>
					<div className='bottom-header__left'>
						<LinkBtn
							className='bottom-header__catalog-link'
							href={`/${CATALOG_PATH}`}
							text={t('catalog')}
						>
							<BurgerIcon /> <span>{t('catalog')}</span>
						</LinkBtn>

						<LinkBtn
							className='bottom-header__delivery-link'
							href={`/${DELIVERY_PATH}`}
							text={t('deliveryAndPay')}
						>
							<DeliveryIcon /> <span>{t('delivery-pay')}</span>
						</LinkBtn>
					</div>

					<div className='bottom-header__search'>
						<SearchIcon />
					</div>

					<div className='bottom-header__right'>
						<LinkBtn
							href={`/${SUPPORT_PATH}`}
							className='bottom-header__support-link'
							children={t('support')}
						/>

						<div className='bottom-header__popup-wrap'>
							<ComparePopup />
							<FavoritePopup />
							<CartPopup />
						</div>
					</div>
				</div>
			</Container>
		</div>
	)
}
