import './PopupSuport.scss'
import { ISuport } from '@/types/types'
import { UseFormRegister } from "react-hook-form";
import Button from '@/components/ui/buttons/Button/Button'
import { useState } from 'react';


interface PropsTypes {
	register: UseFormRegister<ISuport>
	handleImage: (e: string) => void
   }

const PopupSuportBottom = ({register, handleImage}:PropsTypes) => {
	const [image, setImage] = useState("")
	const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
		  const file = e.target.files[0];
		  setImage(URL.createObjectURL(file));
		  handleImage(image)
		}
	 };
	
	return (
		<div className='support-bottom'>
			<div className='support-bottom__button-choose'>
               <input type="file" onChange={handleChangeImage}/>
			    Выбрать файл
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
