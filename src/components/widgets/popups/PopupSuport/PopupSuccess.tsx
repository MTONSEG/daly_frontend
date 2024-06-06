import './PopupSuport.scss'
import Image from 'next/image'
import GreenCross from '@/images/green-cross.webp'
import { useTranslations } from 'next-intl'

interface PopupTypes {
	closeOverlay: () => void
}

const PopupSuccess = ({closeOverlay}: PopupTypes) => {
	const word = useTranslations("popup-support-success")
	return (
		<div className='popup-success'>
			<h2 className='popup-suport__title'>{word("title")}</h2>
            <p className='popup-success__text'>{word("info")}</p>
			<div className='popup-suport__close-wrapper' onClick={closeOverlay}>
				<Image src={GreenCross} width={30} height={30} alt='cross' />
			</div>
		</div>
	)
}

export default PopupSuccess
