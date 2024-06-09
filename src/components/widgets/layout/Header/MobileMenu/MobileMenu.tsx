import './MobileMenu.scss'
import { useEffect } from 'react'
import LocaleSelect from '@/components/ui/forms/LocaleSelect/LocaleSelect'
import LinkBtn from '@/components/ui/Buttons/LinkBtn/LinkBtn'
import Logo from '@/components/ui/icons/Logo/Logo'
import { UserIcon } from '@/components/ui/icons'
import { useTranslations } from 'next-intl'
import MenuNavigation from './MenuNavigation'

interface PropsTypes {
	stateMenu: boolean
	toggleMenu: () => void
}

const MobileMenu = ({ stateMenu, toggleMenu }: PropsTypes) => {
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
			<div className='mobile-menu__logo' onClick={toggleMenu}>
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
			<MenuNavigation toggleMenu={toggleMenu}/>
		</div>
	)
}

export default MobileMenu
