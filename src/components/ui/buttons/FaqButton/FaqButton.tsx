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
import { useEffect, useRef, useState } from 'react'
import { useMatchMedia } from '@/hooks/use-match-media'

const FaqButton = () => {
	const [stateOverlay, setStateOverlay] = useState<boolean>(false)
	const screenWidth = useMatchMedia()
	const dispatch = useAppDispatch()
	const popupRef = useRef<HTMLDivElement>(null)

	const showPopup = () => {
		dispatch(setPopupSupport(true))
		dispatch(setOverlaySupport(true))
	}

	const closePopup = () => {
		dispatch(setPopupSupport(false))
		dispatch(setOverlaySupport(false))
		setStateOverlay(false)
	}

	const closeOverlay = () => {
		dispatch(setOverlaySupport(false))
		dispatch(setSuccessForm(false))
		setStateOverlay(false)
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
		const bodyClassList = document.body.classList
		if (!stateOverlay && screenWidth.isDesktop) {
			bodyClassList.remove('popup-is-active')
		} else if (screenWidth.isDesktop) {
			bodyClassList.add('popup-is-active')
		}
	}, [stateOverlay,screenWidth])

	return (
		<>
			<div className='support-button' onClick={() => setStateOverlay(true)}>
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
			{popupOverlayState && <div className='support-button__overlay'></div>}
			{successFormState && <PopupSuccess closeOverlay={closeOverlay} />}
		</>
	)
}
export default FaqButton
