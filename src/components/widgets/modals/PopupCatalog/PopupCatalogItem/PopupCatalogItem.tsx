import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import { HTMLAttributes, ReactNode } from 'react'

interface PropsType extends HTMLAttributes<HTMLLIElement> {
	children: ReactNode | string
}

export default function PopupCatalogItem({ ...props }: PropsType) {

	return (
		<li {...props} className='popup-catalog__item'>
			<LinkBtn href={''}>{props.children}</LinkBtn>

			<div className="popup-catalog__sub-list">
				<LinkBtn href='' children='test' />
			</div>
		</li>
	)
}
