import './Footer.scss'
import TopFooter from './TopFooter'
import MiddleFooter from './MiddleFooter'

export default function Footer() {
	return (
		<footer className='footer'>
			<TopFooter />
			<div className='container container__default'>
				<div className='footer__content'>
					<MiddleFooter />
				</div>
			</div>
		</footer>
	)
}
