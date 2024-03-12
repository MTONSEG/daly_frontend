import './TabComments.scss'
import Comment from './Comment/Comment'

const TabComments = () => {
	const arr = [1, 2, 3]

	return (
		<div className='tab__comment'>
			<h1 className='comment__title'>Отзывы на смартфон Iphon 11</h1>
			{arr.map((el, index) => {
				return <Comment />
			})}
		</div>
	)
}

export default TabComments
