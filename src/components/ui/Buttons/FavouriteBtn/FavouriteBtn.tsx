'use client'
import { useTranslations } from 'next-intl'
import './FavouriteBtn.scss'
import { FavoriteIconGreen } from '../../icons'

interface IFavouriteBtnProps {
	isLabeled?: boolean
	id: number
}

const FavouriteBtn: React.FC<IFavouriteBtnProps> = ({
	id,
	isLabeled
}) => {
	const word = useTranslations("catalog");
	return (
		<div className='favourite-button__container'>
			{isLabeled && word("favourite-button")}
			<FavoriteIconGreen className='favourite-button__favourite-icon'></FavoriteIconGreen>
		</div>
	)
}

export default FavouriteBtn
