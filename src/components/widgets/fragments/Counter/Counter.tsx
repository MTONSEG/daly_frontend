import React from 'react'
import './Counter.scss'
import { IProduct } from '@/types/types'

interface ICounterProps {
	quantity: number
	increment: () => void
	decrement: () => void
}

const Counter: React.FC<ICounterProps> = ({ quantity, increment, decrement }) => {
	return (
		<div className='counter'>
			<div className='counter__arrow-box' onClick={decrement}>
				-
			</div>
			<div className='counter__number-box'>{quantity}</div>
			<div className='counter__arrow-box' onClick={increment}>
				+
			</div>
		</div>
	)
}

export default Counter
