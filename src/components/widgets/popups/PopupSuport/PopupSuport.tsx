import './PopupSuport.scss'
// import { useForm } from 'react-hook-form'
import Input from '@/components/ui/forms/Input/Input'
import Image from 'next/image'
import GreenCross from '@/images/green-cross.webp'

const PopupSuport = () => {
	//useForm-------------------------------------------------
	//const form= useForm({})

	// const { register, handleSubmit, formState, reset } = form
	// const { errors } = formState

	//const onSubmit = handleSubmit()
	return (
		<div className='popup-suport'>
			<div
				style={{ position: 'relative', minWidth: '100%', minHeight: '100%', padding: '40px 28px' }}
			>
				<form className='popup-suport__form'>
					<Input
						type='email'
						placeholder={''}
						// {...register('data.subscriber', { required: true })}
					/>
				</form>
				<div className='popup-suport__close-wrapper'>
					<Image src={GreenCross} width={30} height={30} alt='cross' />
				</div>
			</div>
		</div>
	)
}

export default PopupSuport
