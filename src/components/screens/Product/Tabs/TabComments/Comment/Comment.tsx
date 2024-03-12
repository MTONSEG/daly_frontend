import './Comment.scss'

const Comment = () => {
	return (
		<div className='comment'>
			<div className='comment__top'>
				<div className='comment__author'>
					<Image className='comment__image' />
					<p className='comment__name'>name</p>
				</div>

				<div className='commnt__stars'>{/* tyt zvezdy */}</div>
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
