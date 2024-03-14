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
import { StarProduct } from '@/components/ui/icons'

interface ICommentPopup {
	isActive: boolean
	setIsActive: Dispatch<SetStateAction<boolean>>
}

const CommentPopup = forwardRef(
	({ isActive, setIsActive }: ICommentPopup, ref: ForwardedRef<HTMLDivElement>) => {
		const t = useTranslations('product')

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

		return (
			<AnimatePresence>
				{isActive && (
					<motion.div
						ref={ref}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='comment-popup'
					>
						<form id='user-data'>
							<h3 className='comment-popup__title'>Оставить отзыв</h3>
							<Rating
								style={{ width: 140, height: 30 }}
								value={5}
								itemStyles={starsStyle}
								onChange={(e) => {
									setStars(e.target.value)
								}}
								className='comment-popup__stars'
							/>
							<div className='comment-popup__top'>
								<Input
									type='text'
									value={name}
									name='Имя'
									onChange={onNameChangeHandler}
									error={nameError}
									label='Имя'
									placeholder='Имя'
								/>
								<Input
									type='email'
									value={email}
									name='E- mail'
									onChange={onEmailChangeHandler}
									error=''
									label='E- mail'
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
				)}
			</AnimatePresence>
		)
	}
)

export default CommentPopup
