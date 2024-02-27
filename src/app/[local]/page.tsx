import Header from '@/components/widgets/layout/Header/Header'
import { useTranslations } from 'next-intl'

export default function Home() {
	const t = useTranslations('home')

	return (
		<>
			<main>
				<Header />
				<h1>{t('title')}</h1>
				<div>hey</div>
				<ProductCardFav id={1}></ProductCardFav>
			</main>
		</>
	)
}
