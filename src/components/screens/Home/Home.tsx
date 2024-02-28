import { useTranslations } from 'next-intl'
import './Home.scss'

export default function Home() {
	const t = useTranslations('home')

	return (
		<>
			<h1>{t('title')}</h1>
		</>
	)
}
