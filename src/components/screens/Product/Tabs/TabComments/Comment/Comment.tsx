import './Comment.scss'
import Image from 'next/image'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { StarProduct } from '@/components/ui/icons'
import noname from '@/images/noname.webp'

const Comment = () => {
	const myStyles = {
		itemShapes: <StarProduct />,
		activeFillColor: 'rgb(0, 198, 94)',
		inactiveFillColor: '#99F6E4'
	}

	return (
		<div className='comment'>
			<div className='comment__top'>
				<div className='comment__author'>
					<Image className='comment__image' src={noname} width={24} height={24} alt='author logo' />
					<p className='comment__name'>name</p>
				</div>

				<div className='comment__stars'>
					<p className='comment__star-amount'>{3}</p>
					<Rating style={{ width: 65, height: 20 }} value={3} readOnly itemStyles={myStyles} />
				</div>
			</div>

			<div className='comment__date'>16.05.2021</div>

			<p className='comment__text'>
				Перешла с айфона 7. Металась между XR и 11. Выбрала 11 и просто нарадоваться не могу.
				Телефон бомбезный,очень быстрый,мощный. Экран просто Вау! Больше не беспокоюсь о подзарядке.
			</p>
		</div>
	)
}

export default Comment
