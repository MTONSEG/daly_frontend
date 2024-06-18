'use client'
import './PopupSuport.scss'
import { useAppDispatch } from '@/hooks/useReduxHooks'
import { setSuccessForm } from '@/store/popups/supportPopup.slice'
import { useEffect, forwardRef } from 'react'
import { useTranslations } from 'next-intl'
import { ISuport } from '@/types/types'
import { useForm } from 'react-hook-form'
import SuportForm from './SuportForm'
import { suportApi } from '@/store/api/support.api'
import PopupSuportBottom from './PopupSuportBottom'
import ClosePopup from '@/components/ui/buttons/ClosePopup/ClosePopup'

interface PopupTypes {
	closePopup: () => void
}

const PopupSuport = forwardRef<HTMLDivElement, PopupTypes>(({ closePopup }, ref) => {
	// useForm-------------------------------------------------
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
	}, [formState.isSubmitSuccessful, dispatch])

	//------------------------------------------------------
	const word = useTranslations('popup-support')

	return (
		<form onSubmit={onSubmit}>
			<div className='popup-suport' ref={ref}>
				<div
					style={{
						position: 'relative',
						minWidth: '100%',
						minHeight: '100%'
					}}
				>
					<h2 className='popup-suport__title'>{word('title')}</h2>
					<SuportForm register={register} errors={errors} />
					<PopupSuportBottom register={register} handleImage={handleImage} />
					<ClosePopup closeWindow={closePopup} className={'popup-suport__close-popup'} />
				</div>
			</div>
		</form>
	)
})

PopupSuport.displayName = 'PopupSuport'
export default PopupSuport
