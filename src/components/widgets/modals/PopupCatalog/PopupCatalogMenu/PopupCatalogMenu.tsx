import { setActive } from '@/utils/setActive'
import { ForwardedRef, HTMLAttributes, ReactNode, forwardRef } from 'react'

interface PropsType extends HTMLAttributes<HTMLUListElement> {
	children?: ReactNode
	isActive: boolean
}

const PopupCatalogMenu = forwardRef(
	(
		{ children, className = '', ...props }: PropsType,
		ref: ForwardedRef<HTMLUListElement>
	) => {
		return (
			<ul
				ref={ref}
				className={`${className} popup-catalog__menu ${setActive(
					props.isActive
				)}`}
				{...props}
			>
				{children}
			</ul>
		)
	}
)

export default PopupCatalogMenu
