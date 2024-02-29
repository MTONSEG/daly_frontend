'use client'

import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import { TriangleIcon } from '@/components/ui/icons'
import { setActive } from '@/utils/setActive'
import { ReactNode, forwardRef, ForwardedRef } from 'react'

interface PropsType {
	children: ReactNode
	isActive: boolean
	hrefLink?: string
	labelLink?: string
}

const PopupHeaderContainer = forwardRef(
	(props: PropsType, ref: ForwardedRef<HTMLDivElement>) => {
		return (
			<div
				ref={ref}
				className={`popup-header__container ${setActive(props.isActive)}`}
			>
				<TriangleIcon className='popup-header__triangle' />

				<ul className='popup-header__list'>{props.children}</ul>

				{props.hrefLink && props.labelLink ? (
					<LinkBtn
						href={props.hrefLink}
						variant='green'
						label={props.labelLink}
					/>
				) : (
					<></>
				)}
			</div>
		)
	}
)

export default PopupHeaderContainer
