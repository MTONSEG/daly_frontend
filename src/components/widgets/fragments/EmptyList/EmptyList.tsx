// EmptyList.tsx
import React from 'react'
import Image from 'next/image'
import listImage from '@/assets/images/list-image.png'
import './EmptyList.scss'

interface EmptyListProps {
	emptyText1: string
	emptyText2: string
}

const EmptyList: React.FC<EmptyListProps> = ({ emptyText1, emptyText2 }) => {
	return (
		<div className='empty-list'>
			<p className='empty-list__text'>{emptyText1}</p>
			<p className='empty-list__text'>{emptyText2}</p>
			<Image
				src={listImage}
				alt='list-image'
				className='empty-list__image'
				width={81}
				height={89}
			/>
		</div>
	)
}

export default EmptyList
