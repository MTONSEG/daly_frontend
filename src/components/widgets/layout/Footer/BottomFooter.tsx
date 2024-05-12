import './Footer.scss'
import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'

const BottomFooter = () => {
	const navLinks: Array<string> = [
		'Политика конфиденциальности',
		'Пользовательское соглашение',
		'Использование cookies',
		'Карта сайта'
	]
	
	return (
		<div className='bottom-footer'>
			<div className='container container_dafault'>
				<nav className='bottom-footer__navigation'>
					{navLinks.map((item, index) => (
						<p key={index}>
							{
								<LinkBtn
									href={item}
									text={item}
									children={item}
									className='bottom-footer__navigation-link'
									variant='default'
								/>
							}
						</p>
					))}
				</nav>
			</div>
		</div>
	)
}

export default BottomFooter
