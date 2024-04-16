import { useTranslations } from 'next-intl'
import './Home.scss'
import MainBanner from './MainBanner/MainBanner'
import ProductLine from './ProductLine/ProductLine'
import Container from '@/components/ui/containers/Container/Container'
import MiddleBanner from './MiddleBanner/MiddleBanner'

export default function Home() {
	const t = useTranslations('home')

	return (
		<>
			<MainBanner />
			<Container>
				<ProductLine title={t('hits')} tag='hit' tagValue={true} />
				<ProductLine title={t('new')} tag='hit' tagValue={false} sort='sort[0]=publishedAt:desc' />
				<MiddleBanner />
				<ProductLine title={t('disconts')} tag='hit' tagValue={false} pageNum={3} />
				<ProductLine
					title={t('popular')}
					tag='hit'
					tagValue={false}
					sort='sort[0]=publishedAt:asc'
					pageNum={4}
				/>
			</Container>
		</>
	)
}
