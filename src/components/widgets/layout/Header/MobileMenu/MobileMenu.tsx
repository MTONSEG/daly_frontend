import './MobileMenu.scss'
import { useEffect } from 'react'
import LocaleSelect from '@/components/ui/forms/LocaleSelect/LocaleSelect'
import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import Logo from '@/components/ui/icons/Logo/Logo'
import { UserIcon } from '@/components/ui/icons'
import { useTranslations } from 'next-intl'
import MenuNavigation from './MenuNavigation'

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
			<MenuNavigation />
		</div>
	)
}

export default MobileMenu
