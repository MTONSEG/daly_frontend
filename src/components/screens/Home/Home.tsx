import { useTranslations } from 'next-intl'
import './Home.scss'
import MainBanner from './MainBanner/MainBanner'
import ProductLine from './ProductLine/ProductLine'
import Brands from './Brands/Brands'
import Terms from './Terms/Terms'
import Subscribe from './Subscribe/Subscribe'
import FAQ from './FAQ/FAQ'
import Container from '@/components/ui/containers/Container/Container'
import MiddleBanner from './MiddleBanner/MiddleBanner'
import BottomBanner from './BottomBanner/BottomBanner'
import Header from '@/components/widgets/layout/Header/Header'

export default function Home() {
	const t = useTranslations('home')

	return (
		<>
			<Header />
			<MainBanner />
			<Container>
				<ProductLine title={t('hits')} tag='hit' tagValue={true} />
				<ProductLine title={t('new')} tag='hit' tagValue={false} sort='sort[0]=publishedAt:desc' />
				<MiddleBanner />
				<ProductLine title={t('disconts')} tag='hit' tagValue={false} pageNum={3} />
				<BottomBanner />
				<Brands />
				<ProductLine
					title={t('popular')}
					tag='hit'
					tagValue={false}
					sort='sort[0]=publishedAt:asc'
					pageNum={4}
					logos={true}
				/>
				<Terms />
				{/* <ProductLine brands={true} title='' tag='false' tagValue='' /> */}
			</Container>
			<Subscribe />
			<Container>
				<FAQ />
			</Container>
		</>
	)
}
