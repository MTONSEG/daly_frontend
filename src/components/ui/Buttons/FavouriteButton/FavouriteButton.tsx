'use client'
import Image from 'next/image'
import likeIconTransparent from '@/assets/like-icon-transparent.svg'

interface IFavouriteButtonProps {
	isLabeled: boolean
	id: number
}

const FavouriteButton: React.FC<IFavouriteButtonProps> = ({
	id,
	isLabeled
}) => {
	return (
		<div className='favourite-button__container'>
			<Image
				src={likeIconTransparent}
				alt={'like-icon'}
				className='favourite-button__icon'
				width={15}
				height={14}
			/>
		</div>
	)
}

export default FavouriteButton
