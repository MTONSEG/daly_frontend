import './MobileMenu.scss'
import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import { DeliveryIconMobile } from '@/components/ui/icons'
import PopupCatalog from '@/components/widgets/popups/PopupCatalog/PopupCatalog'
import { DELIVERY_PATH, SUPPORT_PATH } from '@/routes/routes'
import { useTranslations } from 'next-intl'
import { SupportMobile } from '@/components/ui/icons'

interface PropsTypes {
	toggleMenu: () => void
}

const MenuNavigation = ({ toggleMenu }: PropsTypes) => {
	const t = useTranslations('home')
	
	return (
		<>
			<nav className='mobile-menu__navigation'>
				<ul className='mobile-menu__navigation-list'>
					<li className='mobile-menu__navigation-list-item'>
						<PopupCatalog hideMenu={toggleMenu}/>
					</li>
					<li className='mobile-menu__navigation-list-item' onClick={toggleMenu}>
						<LinkBtn
							className='mobile-menu__delivery-link'
							href={`/${DELIVERY_PATH}`}
							text={t('delivery-pay')}
						>
							<div className='mobile-menu__navigation-list-item-icon'>
								<DeliveryIconMobile />
							</div>{' '}
							<span className='mobile-menu__navigation-list-title'>{t('delivery-pay')}</span>
						</LinkBtn>
					</li>
					<li className='mobile-menu__navigation-list-item' onClick={toggleMenu}>
						<LinkBtn
							className='mobile-menu__delivery-link'
							href={`/${SUPPORT_PATH}`}
							text={t('delivery-pay')}
						>
							<div className='mobile-menu__navigation-list-item-icon'>
								<SupportMobile />
							</div>
							<span className='mobile-menu__navigation-list-title'>{t('support')}</span>
						</LinkBtn>
					</li>
				</ul>
			</nav>
		</>
	)
}
export default MenuNavigation
