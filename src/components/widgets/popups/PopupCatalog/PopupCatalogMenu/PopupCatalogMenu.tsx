import { setActive } from '@/utils/setActive'
import { ForwardedRef, HTMLAttributes, ReactNode, forwardRef } from 'react'

interface PropsType extends HTMLAttributes<HTMLUListElement> {
	children?: ReactNode
	isActive: boolean
}

const PopupCatalogMenu = forwardRef(
	(
		{ children, className = '', isActive, ...props }: PropsType,
		ref: ForwardedRef<HTMLUListElement>
	) => {
		return (
			<ul
				ref={ref}
				className={`${className} popup-catalog__menu ${setActive(isActive)}`}
				{...props}
			>
				{children}
			</ul>
		)
	}
)
PopupCatalogMenu.displayName = 'PopupCatalogMenu'
export default PopupCatalogMenu
