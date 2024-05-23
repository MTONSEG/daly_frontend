import LinkBtn from '@/components/ui/Buttons/LinkBtn/LinkBtn'
import Container from '@/components/ui/containers/Container/Container'
import LocaleSelect from '@/components/ui/forms/LocaleSelect/LocaleSelect'
import { UserIcon } from '@/components/ui/icons'
import Logo from '@/components/ui/icons/Logo/Logo'
import { useTranslations } from 'next-intl'

export default function TopHeader() {
	const t = useTranslations('shared')

	return (
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
	)
}
