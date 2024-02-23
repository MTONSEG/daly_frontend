import { useTranslations } from 'next-intl'

export default function Home() {
	const t = useTranslations('home')

	const memory = {
		en: ['16GB', '32GB', '128GB'],
		ru: ['16ГБ', '32ГБ', '128ГБ']
	}
	
	return (
		<>
			<main>
				<h1>{t('title')}</h1>
			</main>
		</>
	)
}


