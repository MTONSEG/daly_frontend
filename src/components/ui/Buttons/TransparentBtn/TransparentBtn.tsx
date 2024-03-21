import React from 'react'
import "./TransparentBtn.scss"
interface TransparentBtnProps {
	onClick: () => void
	children: React.ReactNode
}

const TransparentBtn: React.FC<TransparentBtnProps> = ({
	onClick,
	children
}) => {
	return (
		<button className='transparent-btn' onClick={onClick} aria-label='filter-save-default-button'>
			{children}
		</button>
	)
}

export default TransparentBtn
