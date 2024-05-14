'use client'
import './PopupSuport.scss'
import SuportForm from './SuportForm'
import PopupSuportBottom from './PopupSuportBottom'
import Image from 'next/image'
import GreenCross from '@/images/green-cross.webp'

const PopupSuport = () => {
	
	return (
		<div className='popup-suport'>
			<div
				style={{ position: 'relative', minWidth: '100%', minHeight: '100%', padding: '40px 28px' }}
			>
				<h2 className='popup-suport__title'>Обращение в службу поддержки</h2>
				  <SuportForm />
				  <PopupSuportBottom />
				<div className='popup-suport__close-wrapper'>
					<Image src={GreenCross} width={30} height={30} alt='cross' />
				</div>
			</div>
		</div>
	)
}

export default PopupSuport
