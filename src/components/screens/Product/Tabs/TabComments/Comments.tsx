import './Comments.scss'
import Comment from './Comment/Comment'
import Button from '@/components/ui/buttons/Button/Button'
import PopupCatalog from '@/components/widgets/popups/PopupCatalog/PopupCatalog'
import CommentPopup from './Comment/CommentPopup'
import { useEffect, useState } from 'react'
import useOutsideClick from '@/hooks/useOutSideClick'
import { createPortal } from 'react-dom'

const Comments = () => {
	const { ref, isActive, setIsActive } = useOutsideClick<HTMLDivElement>(false)

	const arr = [1, 2, 3]

	const [open, setOpen] = useState(Boolean)

	useEffect(() => {
		if (isActive) {
			document.body.classList.add('overflow-hidden')
		} else {
			document.body.classList.remove('overflow-hidden')
		}
	}, [isActive])

	return (
		<div className='tab__comments'>
			<div className='comments__left'>
				<h1 className='comment__title'>Отзывы на смартфон Iphon 11</h1>
				{arr.map((el, index) => {
					return <Comment key={index} />
				})}
			</div>
			<div className='comments__right'>
				<Button
					variant='product'
					className='comments__add-btn'
					onClick={() => setIsActive(!isActive)}
				>
					Оставить отзыв
				</Button>
			</div>
			{createPortal(
				<CommentPopup ref={ref} isActive={isActive} setIsActive={setIsActive} />,
				document.body
			)}
		</div>
	)
}

export default Comments
