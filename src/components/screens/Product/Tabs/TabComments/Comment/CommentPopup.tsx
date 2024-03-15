'use client'
import Button from '@/components/ui/buttons/Button/Button'
import PopupHeader from '@/components/widgets/popups/PopupHeader/PopupHeader'
import PopupHeaderContainer from '@/components/widgets/popups/PopupHeader/PopupHeaderContainer/PopupHeaderContainer'
import PopupHeaderItem from '@/components/widgets/popups/PopupHeader/PopupHeaderItem/PopupHeaderItem'
import useOutsideClick from '@/hooks/useOutSideClick'
import { useTranslations } from 'next-intl'
import React, {
	ChangeEvent,
	Dispatch,
	FC,
	ForwardedRef,
	MutableRefObject,
	SetStateAction,
	forwardRef,
	useState
} from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { AnimatePresence, motion } from 'framer-motion'
import Input from '@/components/ui/forms/Input/Input'
import Textarea from '@/components/ui/forms/Textarea/Textarea'
import useInput from '@/hooks/useInput'
import { Rating } from '@smastrom/react-rating'
import { CloseSign, StarProduct } from '@/components/ui/icons'
import { RatingChange } from '@smastrom/react-rating'
import { setActive } from '@/utils/setActive'
import { usePostCommentMutation } from '@/store/api/postComment.api'
import { IComment } from '@/types/types'
import axios from 'axios'
import { getAuthToken } from '@/services/getAuthToken'

interface ICommentPopup {
	isActive: boolean
	setIsActive: Dispatch<SetStateAction<boolean>>
}

const CommentPopup = forwardRef(
	({ isActive, setIsActive }: ICommentPopup, ref: ForwardedRef<HTMLDivElement>) => {
		const t = useTranslations('product')

		const [addNewComment, commentResponse] = usePostCommentMutation()

		const starsStyle = {
			itemShapes: <StarProduct />,
			activeFillColor: 'rgb(0, 198, 94)',
			inactiveFillColor: '#99F6E4'
		}

		const [stars, setStars] = useState<number>(5)

		const {
			value: name,
			setValue: setName,
			error: nameError,
			setError: setNameError
		} = useInput('')
		const { value: email, setValue: setEmail } = useInput('')
		const { value: comment, setValue: setComment } = useInput('')

		const onNameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			setName(e.target.value)
		}

		const onEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			setEmail(e.target.value)
		}

		const onCommentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
			setComment(e.target.value)
		}

		const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault()
			const { name, email } = e.target.elements

			const formData: IComment = {
				name: 'test',
				email: 'test',
				text: 'test',
				rating: 4,
				author: 'name'
			}

			await axios.post('http://localhost:1337/api/product-comments/', {
				headers: getAuthToken(),
				body: {
					name: 'test',
					email: 'test',
					text: 'test',
					rating: 4,
					author: 'name'
				}
			})

			// await addNewComment({ data: formData }).then((error) => {
			// 	console.log(error)
			// })
		}

		return (
			<AnimatePresence>
				{isActive && (
					<div className='underlay'>
						<motion.div
							ref={ref}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='comment-popup'
						>
							<div className='closeSign-wr' onClick={() => setIsActive(false)}>
								<CloseSign />
							</div>
							<form id='user-data' onSubmit={onSubmit}>
								<h3 className='comment-popup__title'>Оставить отзыв</h3>
								<Rating
									style={{ width: 140, height: 30 }}
									value={stars}
									itemStyles={starsStyle}
									onChange={setStars}
									className='comment-popup__stars'
								/>
								<div className='comment-popup__top'>
									<Input
										type='text'
										value={name}
										name='Имя'
										onChange={onNameChangeHandler}
										error={nameError}
										label='name'
										placeholder='Имя'
									/>
									<Input
										type='email'
										value={email}
										name='E- mail'
										onChange={onEmailChangeHandler}
										error=''
										label='email'
										placeholder='name@inbox.ua'
									/>
								</div>

								<Textarea
									value={comment}
									name='Оставить отзыв'
									onChange={onCommentChangeHandler}
									error=''
									label='Оставить отзыв'
									placeholder='Отзыв'
								/>
								<Button variant='product' className='comment-popup__sendBtn'>
									Отправить
								</Button>
							</form>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		)
	}
)

export default CommentPopup
