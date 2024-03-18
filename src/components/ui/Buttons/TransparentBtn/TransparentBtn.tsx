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
		<div className='transparent-btn' onClick={onClick}>
			{children}
		</div>
	)
}

export default TransparentBtn
