import React, { FC } from 'react'
import sprites from './sprites.svg'
import './icons.scss'

export interface IIcon {
	id: string
	onClick?: () => void
	className?: string
}

const Icon: FC<IIcon> = ({ id, className = '', ...props }) => {
	return (
		<svg {...props} className={`${id} ${className}`}>
			<use href={`${sprites.src}#${id}`} />
		</svg>
	)
}

export default Icon
