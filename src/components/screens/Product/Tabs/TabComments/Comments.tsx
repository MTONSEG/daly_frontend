import './Comments.scss'
import Comment from './Comment/Comment'
import Button from '@/components/ui/buttons/Button/Button'
import CommentPopup from './Comment/CommentPopup'
import { useEffect } from 'react'
import useOutsideClick from '@/hooks/useOutSideClick'
import { createPortal } from 'react-dom'
import { useTranslations } from 'next-intl'
import { useGetCommentsQuery } from '@/store/api/comment.api'

const Comments = () => {
	const { ref, isActive, setIsActive } = useOutsideClick<HTMLDivElement>(false)
	const t = useTranslations('product')

	const { data, refetch } = useGetCommentsQuery({ id: 304 })

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
				<h1
					className='comment__title'
					onClick={() => {
						refetch()
						console.log(data)
					}}
				>
					{t('review')}
				</h1>
				{data &&
					data.data.attributes.product_comments.data.map((el, index) => {
						return (
							<Comment
								key={index}
								name={el.attributes.name}
								text={el.attributes.text}
								rating={el.attributes.rating}
								date={
									el.attributes.updatedAt?.replace(/T.*/, '')
										? el.attributes.updatedAt?.replace(/T.*/, '')
										: ''
								}
							/>
						)
					})}
			</div>

			<div className='comments__right'>
				<Button
					variant='product'
					className='comments__add-btn'
					onClick={() => setIsActive(!isActive)}
				>
					{t('leftReview')}
				</Button>
			</div>

			{createPortal(
				<CommentPopup ref={ref} isActive={isActive} setIsActive={setIsActive} refetch={refetch} />,
				document.body
			)}
		</div>
	)
}

export default Comments
