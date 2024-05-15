import './PopupSuport.scss'
import Image from 'next/image'
import GreenCross from '@/images/green-cross.webp'

interface PopupTypes {
	closeOverlay: () => void
}


const PopupSuccess = ({closeOverlay}: PopupTypes) => {
	return (
		<div className='popup-success'>
			<h2 className='popup-suport__title'>Ваше обращение отправлено!</h2>
            <p className='popup-success__text'>Служба поддержки скоро свяжется с вами</p>
			<div className='popup-suport__close-wrapper' onClick={closeOverlay}>
				<Image src={GreenCross} width={30} height={30} alt='cross' />
			</div>
		</div>
	)
}

export default PopupSuccess
