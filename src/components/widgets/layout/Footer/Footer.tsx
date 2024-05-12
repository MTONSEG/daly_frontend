import './Footer.scss'
import TopFooter from './TopFooter'
import MiddleFooter from './MiddleFooter'
import BottomFooter from './BottomFooter'

export default function Footer() {
	return (
		<footer className='footer'>
			<TopFooter />
			<div className='container container__default'>
				<div className='footer__content'>
					<MiddleFooter />
				</div>
			</div>
			<BottomFooter />
		</footer>
	)
}
