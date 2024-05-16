'use client'
import '../Home.scss'
import Image from 'next/image'
import Faq from '@/assets/images/faq.webp'
import PopupSuport from '@/components/widgets/popups/PopupSuport/PopupSuport'
import PopupSuccess from '@/components/widgets/popups/PopupSuport/PopupSuccess'
import { useAppDispatch } from '@/hooks/useReduxHooks'
import { useAppSelector } from '@/hooks/useReduxHooks'
import { setPopupSupport } from '@/store/popups/supportPopup.slice'
import { setOverlaySupport } from '@/store/popups/supportPopup.slice'
import { setSuccessForm } from '@/store/popups/supportPopup.slice'
import { useEffect } from 'react'

const FaqButton = () => {
	const dispatch = useAppDispatch()
	const showPopup = () => {
		dispatch(setPopupSupport(true))
		dispatch(setOverlaySupport(true))
	}

	const closePopup = () => {
		dispatch(setPopupSupport(false))
		dispatch(setOverlaySupport(false))
	}

	const closeOverlay = () => {
		dispatch(setOverlaySupport(false))
		dispatch(setSuccessForm(false))
	}
	const popupFormState = useAppSelector((state) => state.popupSupport.popupForm)
	const popupOverlayState = useAppSelector((state) => state.popupSupport.overlay)
	const successFormState = useAppSelector((state) => state.popupSupport.successForm)

	useEffect(() => {
		const bodyClassList = document.body.classList
		if (!popupOverlayState) {
			bodyClassList.remove('popup-is-active')
		} else {
			bodyClassList.add('popup-is-active')
		}
	}, [popupOverlayState])

	useEffect(() => {
		if (successFormState === true) {
			dispatch(setPopupSupport(false))
		}
	}, [successFormState])

	return (
		<>
			<Image
				src={Faq}
				width={50}
				height={50}
				alt='faq'
				className={'faq__icon'}
				onClick={showPopup}
			/>
			{popupFormState && <PopupSuport closePopup={closePopup} />}
			{popupOverlayState && <div className='overlay'></div>}
			{successFormState && <PopupSuccess closeOverlay={closeOverlay} />}
		</>
	)
}
export default FaqButton
