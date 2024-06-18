import Button from '@/components/ui/buttons/Button/Button'
import Input from '@/components/ui/forms/Input/Input'
import Textarea from '@/components/ui/forms/Textarea/Textarea'
import { StarProduct } from '@/components/ui/icons'
import { usePostCommentMutation } from '@/store/api/comment.api'
import { IComment } from '@/types/types'
import { Rating } from '@smastrom/react-rating'
import { useTranslations } from 'next-intl'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface ICommentForm {
	refetch: () => void
	isActive: boolean
	setIsActive: Dispatch<SetStateAction<boolean>>
	thanksPopup: boolean
	setThanksPopup: Dispatch<SetStateAction<boolean>>
	id: number
}

const CommentForm: FC<ICommentForm> = ({
	refetch,
	isActive,
	setIsActive,
	thanksPopup,
	setThanksPopup,
	id
}) => {
	const t = useTranslations('product')

	const { register, handleSubmit } = useForm<IComment>()

	const [addNewComment] = usePostCommentMutation()

	const starsStyle = {
		itemShapes: <StarProduct />,
		activeFillColor: 'rgb(0, 198, 94)',
		inactiveFillColor: '#99F6E4'
	}

	const [stars, setStars] = useState<number>(5)

	const onSubmit: SubmitHandler<IComment> = async (data) => {
		await addNewComment({ ...data, rating: stars, product: [id] }).then(() => {
			setThanksPopup(!thanksPopup)

			setTimeout(() => {
				setIsActive(!isActive)
			}, 1500)
		})
		refetch()
	}

	return (
		<>
			{thanksPopup ? (
				<h3 className='comment-popup__title'>Спасибо за ваш отзыв!</h3>
			) : (
				<form id='user-data' onSubmit={handleSubmit(onSubmit)}>
					<h3 className='comment-popup__title'>Оставить отзыв</h3>
					<Rating
						style={{ width: 140, height: 30 }}
						value={stars}
						itemStyles={starsStyle}
						onChange={setStars}
						className='comment-popup__stars'
					/>
					<div className='comment-popup__top'>
						<Input {...register('name')} type='text' label={t('name')} placeholder={t('name')} />

						<Input
							{...register('email')}
							type='email'
							error=''
							label={t('email')}
							placeholder='name@inbox.ua'
						/>
					</div>

					<Textarea
						{...register('text')}
						error=''
						label={t('leftReview')}
						placeholder={t('leftReview')}
					/>
					<Button
						variant='product'
						className='comment-popup__sendBtn'
						type='submit'
						onClick={() => console.log('sent')}
					>
						{t('send')}
					</Button>
				</form>
			)}
		</>
	)
}

export default CommentForm
