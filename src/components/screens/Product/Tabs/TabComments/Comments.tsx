import './Comments.scss'
import Comment from './Comment/Comment'
import Button from '@/components/ui/buttons/Button/Button'

const Comments = () => {
	const arr = [1, 2, 3]

	return (
		<div className='tab__comments'>
			<div className='comments__left'>
				<h1 className='comment__title'>Отзывы на смартфон Iphon 11</h1>
				{arr.map((el, index) => {
					return <Comment />
				})}
			</div>
			<div className='comments__right'>
				<Button variant='product' className='comments__add-btn'>
					Оставить отзыв
				</Button>
			</div>
		</div>
	)
}

export default Comments
