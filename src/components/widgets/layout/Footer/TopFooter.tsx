'use client'

import './Footer.scss'
import Logo from '@/components/ui/icons/Logo/Logo'
import Image from 'next/image'
import cityIcon from '@/icons/footer-location-icon.webp'
import fbIcon from '@/icons/footer-fb.webp'
import igIcon from '@/icons/footer-ig.webp'
import { ArrowDown } from '@/components/ui/icons'
import PopupList from '../../popups/PopupList/PopupList'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

const TopFooter = () => {
	// const word = useTranslations("top-footer")
	// const citiesString = word('cities').replace(/'/g, '"');
	// const citiesArray = JSON.parse(citiesString)
	
	const cities = ['Одесса', 'Днепр', 'Киев', 'Харьков', 'Херсон', 'Тернополь']
	const [popup, setPopup] = useState<boolean>(false)
	const closePopup = () => {
		setPopup(false)
	}

	const [cityValue, setCityValue] = useState<string>(cities[0])
	const getCity = (e: string) => {
		setCityValue(e)
	}


	return (
		<div className='top-footer'>
			<div className='container container_dafault top-footer__content'>
				<div className='top-footer__location-wrapper'>
					<Logo />
					<div className='top-footer__city'>
						<Image src={cityIcon} width={12} height={12} alt='city' />
						<p className='top-footer__city-text'>{cityValue}</p>
						<div
							className={popup ? 'top-footer__city-arrow_up' : 'top-footer__city-arrow'}
							onClick={() => setPopup(!popup)}
						>
							<ArrowDown />
						</div>
						{popup && <PopupList data={cities} close={closePopup} getValue={getCity} />}
					</div>
				</div>
				<div className='top-footer__socialmedia'>
					<p className='top-footer__socialmedia-text'>Присоединяйтесь к нам </p>
					<div style={{display: "flex", columnGap: "10px"}}>
						<Image src={fbIcon} width={33} height={33} alt='fb' />
						<Image src={igIcon} width={33} height={33} alt='ig' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default TopFooter
