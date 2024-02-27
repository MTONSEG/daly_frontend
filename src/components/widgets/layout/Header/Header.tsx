'use client'
import './Header.scss'
import V from '@/icons/next.svg'
import banner from '@/images/banner.jpg'
import Image from 'next/image'

export default function Header() {
	console.log(Image);
	

	return (
		<header className='header'>
			<div className='icon-wrap'>
				<V />

				<Image src={banner} alt='test' />
			</div>
		</header>
	)
}
