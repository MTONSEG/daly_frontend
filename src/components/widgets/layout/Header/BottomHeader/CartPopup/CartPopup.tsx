'use client'

import Button from '@/components/ui/buttons/Button/Button'
import { CartIcon } from '@/components/ui/icons'
import PopupHeader from '@/components/widgets/modals/PopupHeader/PopupHeader'
import PopupHeaderContainer from '@/components/widgets/modals/PopupHeader/PopupHeaderContainer/PopupHeaderContainer'
import PopupHeaderItem from '@/components/widgets/modals/PopupHeader/PopupHeaderItem/PopupHeaderItem'
import useOutsideClick from '@/hooks/useOutSideClick'
import { COMPARE_PATH } from '@/routes/routes'

export default function CartPopup() {
	const { ref, isActive, setIsActive } = useOutsideClick<HTMLDivElement>(false)

	const handleToggle = () => {
		setIsActive((active) => !active)
	}

	return (
		<PopupHeader variant='cart'>
			<Button className='popup-header__btn' onClick={handleToggle}>
				<CartIcon />
			</Button>

			<PopupHeaderContainer
				ref={ref}
				isActive={isActive}
				hrefLink={`/${COMPARE_PATH}`}
				labelLink='В корзину'
			>
				<PopupHeaderItem
					title='Смартфон Apple iPhone 12 mini 64 GB Green'
					price={70000}
					imageSrc=''
					onClick={handleToggle}
				/>
			</PopupHeaderContainer>
		</PopupHeader>
	)
}
