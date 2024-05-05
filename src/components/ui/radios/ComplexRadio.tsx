'use client'
import { Dispatch, SetStateAction } from 'react'
import './ComplexRadio.scss'
import Link from 'next/link'
interface IComplexRadio {
	label: string
	title: string
	description: string
	link?: string
	radioActive: string
	setActive: Dispatch<SetStateAction<string>>
}

const ComplexRadio: React.FC<IComplexRadio> = ({
	label,
	title,
	description,
	link,
	radioActive,
	setActive
}) => {
	return (
		<div
			className={`complex-radio ${radioActive === label && 'active'}`}
			onClick={() => {
				setActive(label)
			}}
		>
			<div className='complex-radio__title'>
				<div className='complex-radio__radio'></div>
				{title}
			</div>
			<div className='complex-radio__content'>
				{description}
				{link && <Link href={"haha-lox"} className='complex-radio__link'>{link}</Link>}
			</div>
		</div>
	)
}

export default ComplexRadio
