import Button from '@/components/ui/buttons/Button/Button'
import Input from '@/components/ui/forms/Input/Input'
import Textarea from '@/components/ui/forms/Textarea/Textarea'
import { StarProduct } from '@/components/ui/icons'
import { usePostCommentMutation } from '@/store/api/postComment.api'
import { IComment, IResponse } from '@/types/types'
import { Rating } from '@smastrom/react-rating'
import React, { useState, useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const CommentForm = () => {
	const productId = 304
	const t = useTransition('product')

	const { register, handleSubmit, watch } = useForm<IComment>()

	const [addNewComment] = usePostCommentMutation()

	const starsStyle = {
		itemShapes: <StarProduct />,
		activeFillColor: 'rgb(0, 198, 94)',
		inactiveFillColor: '#99F6E4'
	}

	const [stars, setStars] = useState<number>(5)

	const onSubmit: SubmitHandler<IComment> = (data) => {
		addNewComment({ ...data, rating: stars, product: [productId] })
		console.log({ ...data, rating: stars, product: [productId] })
	}

	return (
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
				<Input {...register('name')} type='text' label='name' placeholder='Имя' />

				<Input
					{...register('email')}
					type='email'
					error=''
					label='email'
					placeholder='name@inbox.ua'
				/>
			</div>

			<Textarea {...register('text')} error='' label='Оставить отзыв' placeholder='Отзыв' />
			<Button
				variant='product'
				className='comment-popup__sendBtn'
				type='submit'
				onClick={() => console.log('sent')}
			>
				Отправить
			</Button>
		</form>
	)
}

export default CommentForm
