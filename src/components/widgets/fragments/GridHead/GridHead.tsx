import './GridHead.scss'
import GridHeadSorter from '@/components/widgets/fragments/GridHead/GridHeadSorter/GridHeadSorter'
import GridHeadModder from './GridHeadModder/GridHeadModder'
import { useTranslations } from 'next-intl'
interface Props {
	productsQuantity: number
}

const GridHead: React.FC<Props> = ({ productsQuantity }) => {
	const word = useTranslations('sorting')
	return (
		<div className='grid-head'>
			<div className='grid-head__word'>{productsQuantity}</div>
			<div className='grid-head__controls'>
				<div className='grid-head__sort'>
					<div className='grid-head__word'>{word('sorting-pre-word')}</div>
					<GridHeadSorter
						sortingOptions={['publishedAt', 'price', 'rating']}
						sortingMethods={['asc', 'desc']}
					/>
				</div>
				<GridHeadModder />
			</div>
		</div>
	)
}

export default GridHead
