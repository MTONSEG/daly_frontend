import { useTranslations } from 'next-intl'
import './Home.scss'
import MainBanner from './MainBanner/MainBanner'

export default function Home() {
	// const t = useTranslations('home')

	return (
		<>
			<MainBanner />
		</>
	)
}
