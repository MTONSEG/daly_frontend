'use client'

import { useParams } from 'next/navigation'
import './LocaleSelect.scss'
import Link from 'next/link'
import { useState } from 'react'

export default function LocaleSelect() {
	const { local } = useParams()
	const [showMenu, setShowMenu] = useState<boolean>(false)
	const [lang, setLang] = useState<string>(
		Array.isArray(local) ? local[0] : local
	)

	const handleMenuToggle = () => {
		setShowMenu((active) => !active)
		setLang(Array.isArray(local) ? local[0] : local)
	}

	return (
		<div className={`local-select ${showMenu ? 'active' : ''}`}>
			<p className='local-select__head' onClick={handleMenuToggle}>
				{lang.slice(0,1).toUpperCase() + lang.slice(1)}
			</p>

			<ul className='local-select__list'>
				<li className='local-select__item'>
					<Link
						onClick={handleMenuToggle}
						href={'/en'}
						className={`local-select__link ${lang === 'en' ? 'active' : ''}`}
					>
						En
					</Link>
				</li>
				<li className='local-select__item'>
					<Link
						onClick={handleMenuToggle}
						href={'/ru'}
						className={`local-select__link ${lang === 'ru' ? 'active' : ''}`}
					>
						Ru
					</Link>
				</li>
			</ul>
		</div>
	)
}
