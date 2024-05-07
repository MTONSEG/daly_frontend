import '../Home.scss'
import { useForm } from 'react-hook-form'
import { ISubscribe } from '@/types/types'
import { useState, useEffect } from 'react'
import { subscribeApi } from '@/store/api/subscribe.api'
import Checkbox from '@/components/ui/checkboxes/Checkbox'
import Input from '@/components/ui/forms/Input/Input'
import { useTranslations } from 'next-intl'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const SubscribeForm = () => {
	//useForm-------------------------------------------------
	const form = useForm<ISubscribe>({})
	const { register, handleSubmit, formState, reset } = form
	const { errors } = formState

	const onSubmit = handleSubmit(subscribeApi(reset))

	const [choosed, setChoosed] = useState<boolean>(false)

	useEffect(() => {
		if (formState.isDirty === false) {
			setChoosed(false)
		}
	}, [formState.isDirty])

	//---------------------------------------------------
	const word = useTranslations("subscribe")


	return (
		<form onSubmit={onSubmit} className='subscribe-form'>
			<div className='subscribe-form__inputs'>
				<Input type='email' placeholder={word("placeholder")}/>
				<div className='subscribe-form__terms'>
					<Checkbox label="" isActive={choosed} toggleCheckbox={() => setChoosed(!choosed)}/>
					<div className='subscribe-form__terms-text'>
						{word("agreement-text1")} <span>{word("agreement-text2")} </span>, {word("agreement-text3")}{' '}
						<span>{word("agreement-text4")}</span>
					</div>
				</div>
			</div>
			<div>
				<button className='subscribe-form__button' type='submit'>
				{word("button-value")}
				</button>
			</div>
			<ToastContainer />
		</form>
	)
}

export default SubscribeForm
