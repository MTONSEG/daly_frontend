'use client'

import LinkBtn from '@/components/ui/Buttons/LinkBtn/LinkBtn'
import { TriangleIcon } from '@/components/ui/icons'
import { setActive } from '@/utils/setActive'
import { useTranslations } from 'next-intl'
import { ReactNode, forwardRef, ForwardedRef } from 'react'

interface PropsType {
	children: ReactNode
	isActive: boolean
	hrefLink?: string
	labelLink?: string
	isEmpty?: boolean
	textEmpty?: string
	variant?: 'default'
}

const PopupHeaderContainer = forwardRef(
	({ variant = 'default', ...props }: PropsType, ref: ForwardedRef<HTMLDivElement>) => {
		const t = useTranslations('shared')

		return (
			<div
				ref={ref}
				className={`popup-header__container ${setActive(
					props.isActive
				)} popup-header__container_${variant}`}
			>
				<TriangleIcon className='popup-header__triangle' />

				{props.isEmpty ? (
					<p className='popup-header__text-empty'>
						{props.textEmpty ? props.textEmpty : t('is-empty')}
					</p>
				) : (
					<ul className='popup-header__list'>{props.children}</ul>
				)}

				{props.hrefLink && props.labelLink ? (
					<LinkBtn href={props.hrefLink} variant='green'>{props.labelLink}</LinkBtn>
				) : (
					<></>
				)}
			</div>
		)
	}
)

PopupHeaderContainer.displayName = "PopupHeaderContainer"
export default PopupHeaderContainer
