import React, { FC, useState } from 'react'
import Arrow from '../../../../ui/arrows/Arrow'
import { useTranslations } from 'next-intl'
import "./SupportNavDropdown.scss";

interface SupportNavDropdownProps {
	theme: string
	values: string[]
	onSelectValue: (value: string) => void
}

const SupportNavDropdown: FC<SupportNavDropdownProps> = ({ theme, values, onSelectValue }) => {
	const w = useTranslations('support-nav')
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [activeItem, setActiveItem] = useState<string | null>(null)
	const handleValueSelection = (value: string) => {
		onSelectValue(value)
		setActiveItem(value)
	}

	return (
		<div className='support-nav-dropdown'>
			<div className='support-nav-dropdown__theme' onClick={()=>{setIsOpen(!isOpen)}}>
				<Arrow state={isOpen} />
				{w(`${theme}-theme`)}
			</div>
			<div className={`support-nav-dropdown__body ${isOpen && 'active'}`}>
				{values.map((value, index) => {
					return (
						<div
							key={index}
							className={`support-nav-dropdown__item ${value === activeItem ? 'active' : ''}`}
							onClick={() => handleValueSelection(value)}
						>
							{w(`${theme}-value-${index}`)}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default SupportNavDropdown
