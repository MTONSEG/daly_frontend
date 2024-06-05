import './Footer.scss'
import LinkBtn from '@/components/ui/Buttons/LinkBtn/LinkBtn'
import { useTranslations } from 'next-intl'

const BottomFooter = () => {
	const word = useTranslations("bottom-footer")
	const navLinksString = word("navLinks").replace(/'/g, '"')
	const navLinksArray = JSON.parse(navLinksString)
	const navLinks: Array<string> = navLinksArray
	
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
