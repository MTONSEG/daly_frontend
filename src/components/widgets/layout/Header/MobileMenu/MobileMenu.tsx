import './MobileMenu.scss'
import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import { DeliveryIcon } from '@/components/ui/icons'
import PopupCatalog from '@/components/widgets/popups/PopupCatalog/PopupCatalog'
import { DELIVERY_PATH, SUPPORT_PATH } from '@/routes/routes'
import { useTranslations } from 'next-intl'

interface PropsTypes {
	stateMenu: boolean
}

const MobileMenu = ({ stateMenu }: PropsTypes) => {
	const t = useTranslations('home')

	return (
		<div className={stateMenu ? 'mobile-menu-active' : 'mobile-menu'}>
			<nav className='mobile-menu__navigation'>
				<ul className='mobile-menu__navigation-list'>
					<li className='mobile-menu__navigation-list-item'>
						<PopupCatalog />
						<span>Каталог товаров</span>
					</li>
					<li className='mobile-menu__navigation-list-item'>
						<LinkBtn
							className='mobile-menu__delivery-link'
							href={`/${DELIVERY_PATH}`}
							text={t('delivery-pay')}
						>
							<DeliveryIcon /> <span>{t('delivery-pay')}</span>
						</LinkBtn>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default MobileMenu
