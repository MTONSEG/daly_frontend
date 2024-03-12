import { FC } from 'react'
import './Tabs.scss'
import Button from '@/components/ui/buttons/Button/Button'
import TabContainer from './TabContainer/TabContainer'

const Tabs: FC = () => {
	return (
		<div className='tabs'>
			<div className='tabs__btns-wr'>
				<Button className='tabs__btn active'>Описание</Button>
				<Button className='tabs__btn'>Характеристики</Button>
				<Button className='tabs__btn'>Аксессуары</Button>
				<Button className='tabs__btn'>Отзывы</Button>
				<Button className='tabs__btn'>Рассрочка и кредит</Button>
				<Button className='tabs__btn active'>Наличие и доставка</Button>
			</div>

			<TabContainer children={<div>hhhhh</div>} />
		</div>
	)
}

export default Tabs
