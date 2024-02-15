import { useTranslations } from 'next-intl'

export default function Home() {
	const t = useTranslations('home')
	console.log(t('title'));
	
	return (
		<>
			<main>
				<h1>{t('title')}</h1>
			</main>
		</>
	)
}
