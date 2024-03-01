'use client'

import { useParams } from 'next/navigation'
import './LocaleSelect.scss'
import Link from 'next/link'
import useOutsideClick from '@/hooks/useOutSideClick'
import { checkArr } from '@/utils/checkArr'
import { upperFirstLetter } from '@/utils/upperFirtLetter'
import { locales, usePathname } from '@/navigation'

export default function LocaleSelect() {
	const { locale } = useParams()
	const path = usePathname()

	const { ref, isActive, setIsActive } = useOutsideClick<HTMLDivElement>(false)

	const handleMenuToggle = () => {
		setIsActive((active) => !active)
	}

	const itemsLocal = locales.map((el, i) => (
		<Link
			key={i}
			locale={el}
			onClick={handleMenuToggle}
			href={`/${el}/${path}`}
			className={`local-select__link ${locale === el ? 'active' : ''}`}
			aria-label={`Setup lang to ${el}`}
		>
			{el.toUpperCase()}
		</Link>
	))

	return (
		<div className={`local-select ${isActive ? 'active' : ''}`}>
			<p className='local-select__head' onClick={handleMenuToggle}>
				{upperFirstLetter(checkArr(locale))}
			</p>

			<div ref={ref} className='local-select__list'>
				{itemsLocal}
			</div>
		</div>
	)
}
