'use client'

import Button from '@/components/ui/buttons/Button/Button'
import { CompareIcon } from '@/components/ui/icons'
import PopupHeader from '@/components/widgets/modals/PopupHeader/PopupHeader'
import PopupHeaderContainer from '@/components/widgets/modals/PopupHeader/PopupHeaderContainer/PopupHeaderContainer'
import PopupHeaderItem from '@/components/widgets/modals/PopupHeader/PopupHeaderItem/PopupHeaderItem'
import useOutsideClick from '@/hooks/useOutSideClick'
import { COMPARE_PATH } from '@/routes/routes'

export default function ComparePopup() {
	const { ref, isActive, setIsActive } = useOutsideClick<HTMLDivElement>(false)

	const handleToggle = () => {
		setIsActive((active) => !active)
	}

	return (
		<PopupHeader variant='compare'>
			<Button className='popup-header__btn' onClick={handleToggle}>
				<CompareIcon />
			</Button>

			<PopupHeaderContainer
				ref={ref}
				isActive={isActive}
				hrefLink={`/${COMPARE_PATH}`}
				labelLink='В сравнение'
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
