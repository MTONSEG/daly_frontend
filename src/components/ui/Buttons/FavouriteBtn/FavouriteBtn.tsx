'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import './FavouriteBtn.scss'
import { FavoriteIconGreen } from '../../icons'
import { useAppSelector, useAppDispatch } from '@/hooks/useReduxHooks'
import {
	addFavorite,
	removeFavorite
} from '@/store/favourites/favourites.slice'


interface IFavouriteBtnProps {
	isLabeled?: boolean
	id: number
	isFavorite?: boolean
	handleClick: () => void
}

const FavouriteBtn: React.FC<IFavouriteBtnProps> = ({ id, isLabeled, isFavorite, handleClick }) => {
	const t = useTranslations('catalog')
	const dispatch = useAppDispatch()
	// const isFavourite = useAppSelector((state) =>
	// 	state.favourites.products.includes(id)
	// )
	
	// const handleClick = () => {
	// 	if (isFavorite) {
	// 		dispatch(removeFavorite(id))
	// 	} else {
	// 		dispatch(addFavorite(id))
	// 	}
	// }

	const buttonText = t('favourite-button')
	
	return (
		<button className='favourite-button__container' onClick={handleClick} aria-label='favourite-button'>
			{isLabeled && buttonText}
			<FavoriteIconGreen
				className={`favourite-button__favourite-icon ${isFavorite && 'active'}`}
			/>
		</button>
		
	)
}

export default FavouriteBtn
