import './Comment.scss'
import Image from 'next/image'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { StarProduct } from '@/components/ui/icons'
import noname from '@/images/noname.webp'
import { FC } from 'react'

interface ICommentCompProps {
	name: string
	rating: number
	text: string
	date: string
}

const Comment: FC<ICommentCompProps> = ({ name, rating, text, date }) => {
	const starsStyle = {
		itemShapes: <StarProduct />,
		activeFillColor: 'rgb(0, 198, 94)',
		inactiveFillColor: '#99F6E4'
	}

	return (
		<div className='comment'>
			<div className='comment__top'>
				<div className='comment__author'>
					<Image className='comment__image' src={noname} width={24} height={24} alt='author logo' />
					<p className='comment__name'>{name}</p>
				</div>

				<div className='comment__stars'>
					<p className='comment__star-amount'>{rating}</p>
					<Rating
						style={{ width: 65, height: 20 }}
						value={rating}
						readOnly
						itemStyles={starsStyle}
					/>
				</div>
			</div>

			<div className='comment__date'>{date}</div>

			<p className='comment__text'>{text}</p>
		</div>
	)
}

export default Comment
