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
	useEffect,
	useState
} from 'react'
import Popup from 'reactjs-popup'
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
import { useForm } from 'react-hook-form'
import CommentForm from '../CommentForm'

interface ICommentPopup {
	isActive: boolean
	setIsActive: Dispatch<SetStateAction<boolean>>
}

const CommentPopup = forwardRef(
	({ isActive, setIsActive }: ICommentPopup, ref: ForwardedRef<HTMLDivElement>) => {
		const t = useTranslations('product')

		const {
			register,
			handlerSubmit,
			watch,
			formState: { errors }
		} = useForm()

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

			await axios
				.post('http://localhost:1337/api/product-comments/', {
					headers: {
						Authorization: `Bearer 5a23fab774dfd8f9462b560402b2526166265a115052aa4ce678fb366f006ad3258eef5ed974cd8ad744c4007a383ad94305df411f6d6271e80bf0d4149c3aa1e77c5e3652fdcc3aa32f3c90b99dca4083b5bbdaf6e798714a34c7a97c128e58554a3c41906b0f0428dd559b91fe74b0c5e37801ee351957c474b1ab9ca774d1`
					},
					body: {
						data: {
							text: 'x'
						}
					}
				})
				.then((res) => console.log(res))

			// await axios.get('http://localhost:1337/api/product-comments/').then((res) => console.log(res))

			// await addNewComment({ data: formData }).then((error) => {
			// 	console.log(error)
			// })
		}

		useEffect(() => {
			const onSubmit = async () => {
				// const formData: IComment = {
				// 	name: 'test',
				// 	email: 'test',
				// 	text: 'test',
				// 	rating: 4,
				// 	author: 'name'
				// }

				// await axios
				// 	.post(
				// 		'http://localhost:1337/api/product-comments/',
				// 		{
				// 			data: {
				// 				text: 'x'
				// 			}
				// 		},
				// 		{
				// 			headers: {
				// 				Authorization: `Bearer 5a23fab774dfd8f9462b560402b2526166265a115052aa4ce678fb366f006ad3258eef5ed974cd8ad744c4007a383ad94305df411f6d6271e80bf0d4149c3aa1e77c5e3652fdcc3aa32f3c90b99dca4083b5bbdaf6e798714a34c7a97c128e58554a3c41906b0f0428dd559b91fe74b0c5e37801ee351957c474b1ab9ca774d1`
				// 			}
				// 		}
				// 	)
				// 	.then((res) => console.log(res))

				// await axios.get('http://localhost:1337/api/product-comments/').then((res) => console.log(res))

				// await addNewComment({ data: formData }).then((error) => {
				// 	console.log(error)
				// })

				addNewComment({ data: { text: 'posted from rtkq' } })
			}

			onSubmit()
		}, [])

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

							<CommentForm />
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		)
	}
)

export default CommentPopup
