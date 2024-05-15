import './PopupSuport.scss'
import { ISuport } from '@/types/types'
import { UseFormRegister } from 'react-hook-form'
import Button from '@/components/ui/buttons/Button/Button'
import { useState } from 'react'

interface PropsTypes {
	register: UseFormRegister<ISuport>
	handleImage: (e: File | null) => void
}



const PopupSuportBottom = ({ register, handleImage }: PropsTypes) => {
	const [fileName, setFileName] = useState<string>('')

	const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null
		if (file) {
			setFileName(file.name)
		} else {
			setFileName('')
		}
		handleImage(file)
	}


	return (
		<div className='support-bottom'>
			<div className='support-bottom__button-choose'>
				<input type='file' onChange={handleChangeImage} />
				Выбрать файл
				<span className='support-bottom__file-name'>{fileName}</span>
			</div>
			

			<span className='support-bottom__button-choose-label'>
				Скриншот экрана( при необходимости)
			</span>
			<Button
				variant='product'
				type='submit'
				children={'Отправить обращение'}
				className='support-bottom__send-button'
			/>
			<div className='support-bottom__terms'>
				<span>Нажимая отправить, вы соглашаетесь с условиями обработки</span>
				<br />
				<span className='support-bottom__terms_underline'>персональных данных</span>
			</div>
		</div>
	)
}

export default PopupSuportBottom
