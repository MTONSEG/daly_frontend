'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import './FavouriteBtn.scss'
import { FavoriteIconGreen } from '../../icons'

interface IFavouriteBtnProps {
	isLabeled?: boolean
	id: number
	isFavorite?: boolean
	handleClick: () => void
}

const FavouriteBtn: React.FC<IFavouriteBtnProps> = ({ isLabeled, isFavorite, handleClick }) => {
	const t = useTranslations('catalog')

	const buttonText = t('favourite-button')

	return (
		<button
			className='favourite-button__container'
			onClick={handleClick}
			aria-label='favourite-button'
		>
			{isLabeled && buttonText}
			<FavoriteIconGreen className={`favourite-button__favourite-icon ${isFavorite && 'active'}`} />
		</button>
	)
}

export default FavouriteBtn
