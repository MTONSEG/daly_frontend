'use client'
import React, { useState, useRef, useEffect, FC } from 'react'
import './Select.scss'
import { DropDownIcon } from '../../icons'
import './Select.scss'

interface ISelect {
	className?: string
	valuesArr: string[]
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
}

const Select: FC<ISelect> = ({ value, setValue, className, valuesArr }) => {
	const rootRef = useRef<HTMLDivElement | null>(null)

	const [open, setOpen] = useState<boolean>(false)

	const onElementClickHandler = (str: string) => {
		setValue(str)
	}

	const onRootClickHandler = () => {
		setOpen((prev) => !prev)
	}

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				setOpen(false)
			}
		}

		window.addEventListener('click', handleClick)

		return () => {
			window.removeEventListener('click', handleClick)
		}
	}, [])

	return (
		<div
			className={`select ${className}`}
			onClick={() => onRootClickHandler()}
			ref={rootRef}
		>
			<div className='select__title__wr'>
				<p className='select__title'>{value}</p>
				<DropDownIcon className={`arrow_down ${open ? ' active' : ''}`} />
			</div>
			<ul className={`select__ul  ${open ? ' active' : ''}`}>
				<div style={{ minHeight: '0px' }}>
					{valuesArr.map((el) => (
						<li
							onClick={() => onElementClickHandler(el)}
							key={el}
							className='select__li'
						>
							{el}
						</li>
					))}
				</div>
			</ul>
		</div>
	)
}

export default Select
