'use client'
import { useState } from 'react'
import './MiniAcordeon.scss'
import Arrow from '../../arrows/Arrow'

export interface IMiniAcordeon {
	heading: string
	content: string
}

const MiniAcordeon: React.FC<IMiniAcordeon> = ({ heading, content }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleOpen = () => {
        setIsOpen(!isOpen);
    }
	return (
		<div className='mini-acordeon'>
			<div className='mini-acordeon__heading' onClick={handleOpen}>
				{heading}
				<Arrow state={isOpen} />
			</div>
			<div className={`mini-acordeon__content ${isOpen && 'active'}`}>{content}</div>
		</div>
	)
}

export default MiniAcordeon
