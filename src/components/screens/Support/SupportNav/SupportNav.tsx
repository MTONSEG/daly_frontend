import React, { FC, useState } from 'react'
import SupportNavDropdown from './SupportNavDropdown/SupportNavDropdown'
import './SupportNav.scss'
import Button from '@/components/ui/buttons/Button/Button'
import { useTranslations } from 'next-intl'

interface Theme {
	name: string
	values: string[]
}

interface SupportNavProps {
	themes: Theme[]
	onSelectValue: (value: string) => void // New prop for passing selected value
}

const SupportNav: FC<SupportNavProps> = ({ themes, onSelectValue }) => {
	const [selectedValue, setSelectedValue] = useState<string>(themes[0].values[0])
	const w = useTranslations('support-nav')

	const handleValueSelection = (value: string) => {
		setSelectedValue(value)
		onSelectValue(value) // Pass the selected value to the parent component
	}

	return (
		<div className='support-nav__container'>
			<div className='support-nav'>
				{themes.map((theme, index) => (
					<SupportNavDropdown
						activeValue={selectedValue}
						values={theme.values}
						onSelectValue={(value: string) => handleValueSelection(value)}
						theme={theme.name}
						key={index}
					/>
				))}
			</div>
			<div className='support-nav__assistant'>
				<div className='support-nav__assistant-title'>{w('assistant-title')}</div>
				<div className='support-nav__assistant-text'>{w('assistant-text')}</div>
				<Button className='support-nav__button'>{w('assistant-button')}</Button>
			</div>
		</div>
	)
}

export default SupportNav
