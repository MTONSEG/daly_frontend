'use client'
import { useState } from 'react'
import { CheckIcon } from '@/components/ui/icons'
import './ColorPicker.scss'
import { useTranslations } from 'next-intl'

interface IColorPickerProps {
	variant: 'forCard' | 'forPage'
}

const ColorPicker: React.FC<IColorPickerProps> = ({ variant }) => {
	const word = useTranslations('color-picker')
	const colors: { name: string; hex: string }[] = [
		{ name: word('color-1'), hex: '#dadcdc' },
		{ name: word('color-2'), hex: '#ccefdb' },
		{ name: word('color-3'), hex: '#363a45' },
		{ name: word('color-4'), hex: '#ffb762' }
	] // Example colors, you can customize these
	const [selectedColor, setSelectedColor] = useState<string>(colors[0].hex)

	const handleColorSelection = (color: string) => {
		setSelectedColor(color)
	}

	const getColorName = (hex: string) => {
		const color = colors.find((c) => c.hex === hex)
		return color ? color.name : ''
	}

	return (
		<div className={`color-picker ${variant === 'forPage' && 'for-page'}`}>
			<div className='color-picker__heading'>
				{selectedColor && <p>{getColorName(selectedColor)}</p>}
			</div>
			<div className='color-picker__circles-container'>
				{colors.map((color, index) => (
					<div
						className='color-picker__circle'
						style={{ background: colors[index].hex }}
						key={index}
						onClick={() => handleColorSelection(color.hex)}
						aria-label={`color-circle ${color.name}`}
					>
						{selectedColor === color.hex && (
							<CheckIcon className='color-picker__icon' />
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default ColorPicker
