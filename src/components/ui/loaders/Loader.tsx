import React from 'react'
import './Loader.scss'

const Loader: React.FC = () => {
	return (
		<div className='loader-container'>
			<div className='loader-dot'></div>
			<div className='loader-dot'></div>
			<div className='loader-dot'></div>
		</div>
	)
}

export default Loader
