import './PopupSuport.scss'
import { ISuport } from '@/types/types'
import { UseFormRegister } from 'react-hook-form'
import Button from '@/components/ui/buttons/Button/Button'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

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

const word = useTranslations("popup-support-bottom")
	return (
		<div className='support-bottom'>
			<div className='support-bottom__button-choose'>
				<input type='file' onChange={handleChangeImage} />
				{word("choose")}
				<span className='support-bottom__file-name'>{fileName}</span>
			</div>
			

			<span className='support-bottom__button-choose-label'>
				{word("screen")}
			</span>
			<Button
				variant='product'
				type='submit'
				children={'Отправить обращение'}
				className='support-bottom__send-button'
			/>
			<div className='support-bottom__terms'>
				<span>{word("send")}</span>
				<br />
				<span className='support-bottom__terms_underline'>{word("personal")}</span>
			</div>
		</div>
	)
}

export default PopupSuportBottom
