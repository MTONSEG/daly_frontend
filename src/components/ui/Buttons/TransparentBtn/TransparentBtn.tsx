import React from 'react'
import "./TransparentBtn.scss"
interface TransparentBtnProps {
	onClick: () => void
	children: React.ReactNode
	isActive?: boolean
	variant?: 'default' | 'comparison'
}

const TransparentBtn: React.FC<TransparentBtnProps> = ({
	onClick,
	children,
	isActive,
	variant
}) => {
	return (
		<button className={`transparent-btn ${variant && variant === 'comparison' && "comparison-button"} ${isActive && "active" }`} onClick={onClick} aria-label='filter-save-default-button'>
			{children}
		</button>
	)
}

export default TransparentBtn
