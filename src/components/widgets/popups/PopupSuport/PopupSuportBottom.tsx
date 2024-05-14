import './PopupSuport.scss'
import TransparentBtn from '@/components/ui/Buttons/TransparentBtn/TransparentBtn'
import Button from '@/components/ui/buttons/Button/Button'

const PopupSuportBottom = () => {
	return (
		<div className='support-bottom'>
            <div className='support-bottom__button-choose'>
            <TransparentBtn
				onClick={() => console.log('btn')}
				children={'Выбрать файл'}
				isActive={false}
				variant='comparison'
			/>
           </div>
           <span className='support-bottom__button-choose-label'>Скриншот экрана( при необходимости)</span>
           <Button variant='product' children={"Отправить обращение"} className='support-bottom__send-button'/>
		</div>
	)
}

export default PopupSuportBottom
