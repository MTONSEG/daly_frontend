'use client'
import '../../../../components/screens/Home/Home.scss'
import './FaqButton.scss'
import Image from 'next/image'
import Faq from '@/assets/images/faq.webp'
import PopupSuport from '@/components/widgets/popups/PopupSuport/PopupSuport'
import PopupSuccess from '@/components/widgets/popups/PopupSuport/PopupSuccess'
import { useAppDispatch } from '@/hooks/useReduxHooks'
import { useAppSelector } from '@/hooks/useReduxHooks'
import { setPopupSupport } from '@/store/popups/supportPopup.slice'
import { setOverlaySupport } from '@/store/popups/supportPopup.slice'
import { setSuccessForm } from '@/store/popups/supportPopup.slice'
import { useEffect, useRef } from 'react'

const FaqButton = () => {
	const dispatch = useAppDispatch()
	const popupRef = useRef<HTMLDivElement>(null)

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
		if (successFormState === true) {
			dispatch(setPopupSupport(false))
		}
	}, [successFormState,dispatch])

	useEffect(() => {
		if (popupFormState && popupRef.current) {
			popupRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}, [popupFormState])

	return (
		<>
			<div className='support-button'>
				<Image
					src={Faq}
					fill
					loading='lazy'
					alt='faq'
					className={'support-button__image'}
					onClick={showPopup}
				/>
			</div>
			{popupFormState && <PopupSuport closePopup={closePopup} ref={popupRef} />}
			{popupOverlayState && <div className='overlay'></div>}
			{successFormState && <PopupSuccess closeOverlay={closeOverlay} />}
		</>
	)
}
export default FaqButton
