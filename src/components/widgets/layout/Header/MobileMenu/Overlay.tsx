import './MobileMenu'

interface PropsTypes {
	state: boolean
}

const MobileOverlay = ({ state}: PropsTypes) => {
	return <>{state && <div className='mobile-menu-overlay'></div>}</>
}

export default MobileOverlay
