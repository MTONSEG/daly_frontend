import './Footer.scss'
import Logo from '@/components/ui/icons/Logo/Logo'
import Image from 'next/image'
import cityIcon from '@/icons/footer-location-icon.webp'
import fbIcon from '@/icons/footer-fb.webp'
import igIcon from '@/icons/footer-ig.webp'
import PopupList from '../../popups/PopupList/PopupList'

const TopFooter = () => {
	const cities = ["Одесса", "Днепр","Киев","Харьков","Херсон","Тернополь"]
	return (
		<div className='top-footer'>
			<div className='container container_dafault top-footer__content'>
				<div className='top-footer__location-wrapper'>
					<Logo />
					<div className='top-footer__city'>
						<p className='top-footer__city-text'>Днепр</p>
						<Image src={cityIcon} width={12} height={12} alt='city' />
						<PopupList data={cities}/>
					</div>
				</div>
				<div className='top-footer__socialmedia'>
					<p className='top-footer__socialmedia-text'>Присоединяйтесь к нам </p>
					<Image src={fbIcon} width={33} height={33} alt='fb' />
					<Image src={igIcon} width={33} height={33} alt='ig' />
				</div>
			</div>
		</div>
	)
}

export default TopFooter
