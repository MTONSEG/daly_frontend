import { useTranslations } from 'next-intl'
import './Home.scss'
import MainBanner from './MainBanner/MainBanner'
import ProductLine from './ProductLine/ProductLine'
import Brands from './Brands/Brands'
import Terms from './Terms/Terms'
import Subscribe from './Subscribe/Subscribe'
import Faq from './FAQ/FAQ'
import FaqButton from '@/components/ui/Buttons/FaqButton/FaqButton'
import Container from '@/components/ui/containers/Container/Container'
import MiddleBanner from './MiddleBanner/MiddleBanner'
import BottomBanner from './BottomBanner/BottomBanner'


export default function Home() {
	const t = useTranslations('home')
		
	return (
			<div style={{ position: 'relative' }}>
				<MainBanner />
				<Container>
					<ProductLine title={t('hits')} tag='hit' tagValue={true} sortingOption='rating'/>
					<ProductLine
						title={t('new')}
						tag='hit'
						tagValue={false}
						sort='sort[0]=publishedAt:desc'
						sortingOption='publishedAt'
					/>
					<MiddleBanner />
					<ProductLine
						title={t('disconts')}
						tag='hit'
						tagValue={false}
						pageNum={3}
						isDiscount={true}
					/>
					<BottomBanner />
					<Brands />
					<ProductLine
						title={t('popular')}
						tag='hit'
						tagValue={false}
						sort='sort[0]=publishedAt:asc'
						pageNum={4}
						logos={true}
						sortingOption='rating'
					/>
					<Terms />
				</Container>
				<Subscribe />
				<Container>
					<Faq />
					<FaqButton />
				</Container>
			</div>
		)
}
