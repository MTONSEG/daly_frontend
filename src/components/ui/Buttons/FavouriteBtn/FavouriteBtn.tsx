'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import './FavouriteBtn.scss'
import { FavoriteIconGreen } from '../../icons'
import { useAppSelector, useAppDispatch } from '@/hooks/useReduxHooks'
import { addFavorite, removeFavorite } from '@/store/slices/favourites.slice'

interface IFavouriteBtnProps {
	isLabeled?: boolean
	id: number
}

const FavouriteBtn: React.FC<IFavouriteBtnProps> = ({ id, isLabeled }) => {
	const t = useTranslations('catalog')
	const dispatch = useAppDispatch()
	const isFavorite = useAppSelector((state) =>
		state.favourites.products.includes(id)
	)

	const handleClick = () => {
		if (isFavorite) {
			dispatch(removeFavorite(id))
		} else {
			dispatch(addFavorite(id))
		}
	}

	const buttonText = t('favourite-button')

	return (
		<div className='favourite-button__container' onClick={handleClick}>
			{isLabeled && buttonText}
			<FavoriteIconGreen
				className={`favourite-button__favourite-icon ${isFavorite && 'active'}`}
			/>
		</div>
	)
}

export default FavouriteBtn
