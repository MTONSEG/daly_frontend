import React from 'react'
import "./TransparentBtn.scss"
interface TransparentBtnProps {
	onClick: () => void
	children: React.ReactNode
	isActive?: boolean
}

const TransparentBtn: React.FC<TransparentBtnProps> = ({
	onClick,
	children,
	isActive
}) => {
	return (
		<button className={`transparent-btn ${isActive && "active" }`} onClick={onClick} aria-label='filter-save-default-button'>
			{children}
		</button>
	)
}

export default TransparentBtn
