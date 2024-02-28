'use client'

import { useParams } from 'next/navigation'
import './LocaleSelect.scss'
import Link from 'next/link'
import { useState } from 'react'
import useOutsideClick from '@/hooks/useOutSideClick'
import { isArray } from '@/utils/isArray'
import { locales } from '@/i18n'
import { upperFirstLetter } from '@/utils/upperFirtLetter'

export default function LocaleSelect() {
	const { local } = useParams()
	const [lang, setLang] = useState<string>(isArray(local))

	const { ref, isActive, setIsActive } =
		useOutsideClick<HTMLUListElement>(false)

	const handleMenuToggle = () => {
		setIsActive((active) => !active)
		setLang(isArray(local))
	}

	const itemsLocal = locales.map((el, i) => (
		<li className='local-select__item' key={i}>
			<Link
				onClick={handleMenuToggle}
				href={`/${el}`}
				className={`local-select__link ${lang === el ? 'active' : ''}`}
			>
				{el.toUpperCase()}
			</Link>
		</li>
	))

	return (
		<div className={`local-select ${isActive ? 'active' : ''}`}>
			<p className='local-select__head' onClick={handleMenuToggle}>
				{upperFirstLetter(lang)}
			</p>

			<ul ref={ref} className='local-select__list'>
				{itemsLocal}
			</ul>
		</div>
	)
}
