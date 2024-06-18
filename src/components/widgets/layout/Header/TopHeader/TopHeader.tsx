'use client'
import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import Container from '@/components/ui/containers/Container/Container'
import LocaleSelect from '@/components/ui/forms/LocaleSelect/LocaleSelect'
import { UserIcon } from '@/components/ui/icons'
import Logo from '@/components/ui/icons/Logo/Logo'
import { useTranslations } from 'next-intl'
import { useMatchMedia } from '@/hooks/use-match-media'

export default function TopHeader() {
	const t = useTranslations('shared')
	const windowWidth = useMatchMedia()

	return (
		<>
			{windowWidth.isDesktop && (
				<div className='top-header'>
					<Container>
						<div className='top-header__row'>
							<Logo />
							<div className='top-header__actions'>
								<LocaleSelect />
								<LinkBtn href={'/'} className='top-header__enter-link'>
									<UserIcon />
									<span>
										{t('signin')} / {t('signup')}
									</span>
								</LinkBtn>
							</div>
						</div>
					</Container>
				</div>
			)}
		</>
	)
}
