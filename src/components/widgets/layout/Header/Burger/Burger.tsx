import './Burger.scss'
import MobileOverlay from '../MobileMenu/Overlay'

interface PropsTypes {
	stateMenu: boolean
	toggleMenu: () => void
}

const Burger = ({ toggleMenu, stateMenu }: PropsTypes) => {
	const handleBurger = () => {
		toggleMenu()
	}

	return (
		<div>
			<div className='burger' onClick={handleBurger}>
				<div className={stateMenu ? 'burger--upperLine' : 'burger-line'}></div>
				<div className={stateMenu ? 'burger--middleLine' : 'burger-line'}></div>
				<div className={stateMenu ? 'burger--lowerLine' : 'burger-line'}></div>
			</div>
			<MobileOverlay state={stateMenu} />
		</div>
	)
}
export default Burger
