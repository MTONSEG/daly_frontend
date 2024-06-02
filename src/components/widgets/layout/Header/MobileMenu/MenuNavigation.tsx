import './MobileMenu.scss'
import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import { DeliveryIconMobile } from '@/components/ui/icons'
import PopupCatalog from '@/components/widgets/popups/PopupCatalog/PopupCatalog'
import { DELIVERY_PATH, SUPPORT_PATH } from '@/routes/routes'
import { useTranslations } from 'next-intl'

const MenuNavigation = () => {
    const t = useTranslations('home')
	const s = useTranslations('shared')

	return (
		<>
			<nav className='mobile-menu__navigation'>
				<ul className='mobile-menu__navigation-list'>
					<li className='mobile-menu__navigation-list-item'>
						<PopupCatalog />
						<span className='mobile-menu__navigation-list-title'>Каталог товаров</span>
					</li>
					<li className='mobile-menu__navigation-list-item'>
						<LinkBtn
							className='mobile-menu__delivery-link'
							href={`/${DELIVERY_PATH}`}
							text={t('delivery-pay')}
						>
							<div
								style={{ width: '24px', height: '24px' }}
								className='mobile-menu__navigation-list-item-icon'
							>
								<DeliveryIconMobile />
							</div>{' '}
							<span className='mobile-menu__navigation-list-title'>{t('delivery-pay')}</span>
						</LinkBtn>
					</li>
				</ul>
			</nav>
		</>
	)
}
export default MenuNavigation
