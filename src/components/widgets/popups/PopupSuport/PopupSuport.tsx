'use client'
import './PopupSuport.scss'
import { useAppDispatch } from '@/hooks/useReduxHooks'
import { setSuccessForm } from '@/store/popups/supportPopup.slice'
import { useEffect } from 'react'
import { ISuport } from '@/types/types'
import { useForm } from 'react-hook-form'
import SuportForm from './SuportForm'
import { suportApi } from '@/store/api/support.api'
import PopupSuportBottom from './PopupSuportBottom'
import Image from 'next/image'
import GreenCross from '@/images/green-cross.webp'
import { truncate } from 'fs'

interface PopupTypes {
	closePopup: () => void
}

const PopupSuport = ({ closePopup }: PopupTypes) => {
	//useForm-------------------------------------------------
	const form = useForm<ISuport>({})
	const { register, handleSubmit, formState, reset } = form
	const { errors } = formState

	const onSubmit = handleSubmit(suportApi(reset))

	const handleImage = (e: File | null) => {
		form.setValue('data.image', e)
	}
	//-----------------------------------------------------
	const dispatch = useAppDispatch()
	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			dispatch(setSuccessForm(true))
		}
	}, [formState.isSubmitSuccessful])

	return (
		<form onSubmit={onSubmit}>
			<div className='popup-suport'>
				<div
					style={{
						position: 'relative',
						minWidth: '100%',
						minHeight: '100%',
						padding: '40px 28px'
					}}
				>
					<h2 className='popup-suport__title'>Обращение в службу поддержки</h2>
					<SuportForm register={register} errors={errors} />
					<PopupSuportBottom register={register} handleImage={handleImage} />
					<div className='popup-suport__close-wrapper' onClick={closePopup}>
						<Image src={GreenCross} width={30} height={30} alt='cross' />
					</div>
				</div>
			</div>
		</form>
	)
}

export default PopupSuport
