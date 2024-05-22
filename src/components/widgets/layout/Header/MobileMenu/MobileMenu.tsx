import './MobileMenu.scss'
import { useEffect } from 'react'
import LocaleSelect from '@/components/ui/forms/LocaleSelect/LocaleSelect'
import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import Logo from '@/components/ui/icons/Logo/Logo'
import { DeliveryIconMobile } from '@/components/ui/icons'
import { UserIcon } from '@/components/ui/icons'
import PopupCatalog from '@/components/widgets/popups/PopupCatalog/PopupCatalog'
import { DELIVERY_PATH, SUPPORT_PATH } from '@/routes/routes'
import { useTranslations } from 'next-intl'

interface PropsTypes {
	stateMenu: boolean
}

const MobileMenu = ({ stateMenu }: PropsTypes) => {
	const t = useTranslations('home')
	const s = useTranslations('shared')

	useEffect(() => {
		const bodyClassList = document.body.classList
		if (!stateMenu) {
			bodyClassList.remove('popup-is-active')
		} else {
			bodyClassList.add('popup-is-active')
		}
	}, [stateMenu])

	return (
		<div className={stateMenu ? 'mobile-menu-active' : 'mobile-menu'}>
			<div className='mobile-menu__logo'>
				<Logo />
			</div>
			<div className='top-header__actions mobile-menu__actions'>
				<LocaleSelect />

				<LinkBtn href={'/'} className='top-header__enter-link'>
					<UserIcon />

					<span>
						{s('signin')} / {s('signup')}
					</span>
				</LinkBtn>
			</div>
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
		</div>
	)
}

export default MobileMenu
