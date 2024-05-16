import React, { FC, useState } from 'react'
import SupportNavDropdown from './SupportNavDropdown/SupportNavDropdown'
import './SupportNav.scss'

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

	const handleValueSelection = (value: string) => {
		setSelectedValue(value)
		onSelectValue(value) // Pass the selected value to the parent component
	}

	return (
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
	)
}

export default SupportNav
