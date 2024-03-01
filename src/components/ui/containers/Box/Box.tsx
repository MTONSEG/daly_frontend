import {
	ForwardedRef,
	forwardRef,
	type HTMLAttributes,
	type ReactNode
} from 'react'
import './Box.scss'

interface PropsType extends HTMLAttributes<HTMLDivElement> {
	variant?: 'default' | 'fullscreen' | 'popup'
	children: ReactNode
}

const Box = forwardRef(
	(
		{
			variant = 'default',
			className = '',
			...props
		}: PropsType,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		return (
			<div ref={ref} className={` ${className} box box_${variant}`} {...props}>
				{props.children}
			</div>
		)
	}
)

export default Box
