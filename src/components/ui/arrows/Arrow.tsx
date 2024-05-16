'use client'
import './Arrow.scss'
interface IArrowProps {
	state: boolean
}

const Arrow: React.FC<IArrowProps> = ({ state }) => {
	return <div className={`arrow ${state && 'active'}`}></div>
}

export default Arrow
