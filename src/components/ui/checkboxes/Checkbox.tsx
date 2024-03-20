'use client'
import React, { useEffect, useState } from 'react'
import { CheckIcon } from '@/components/ui/icons'
import './Checkbox.scss'

interface ICheckboxProps {
	label: string
	isActive: boolean
	toggleCheckbox: () => void
}

const Checkbox: React.FC<ICheckboxProps> = ({
	label,
	isActive,
	toggleCheckbox
}) => {
	const [active, setActive] = useState<boolean>(isActive)
	useEffect(() => {
		setActive(isActive);
	}, [isActive]);
	return (
		<div className='check-box'>
			<label className='check-box__label'>
				<div className={`check-box__check ${active && 'active'}`}>
					<input
						type='checkbox'
						checked={active}
						onChange={() => {
							toggleCheckbox()
							setActive(!active)
						}}
					/>

					{active && <CheckIcon className='check-box__icon' />}
				</div>
				{label}
			</label>
		</div>
	)
}

export default Checkbox
