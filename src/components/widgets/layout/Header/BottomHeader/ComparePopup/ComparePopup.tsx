'use client'

import Button from '@/components/ui/buttons/Button/Button'
import { CompareIcon } from '@/components/ui/icons'
import PopupHeader from '@/components/widgets/modals/PopupHeader/PopupHeader'
import PopupHeaderContainer from '@/components/widgets/modals/PopupHeader/PopupHeaderContainer/PopupHeaderContainer'
import PopupHeaderItem from '@/components/widgets/modals/PopupHeader/PopupHeaderItem/PopupHeaderItem'
import useOutsideClick from '@/hooks/useOutSideClick'
import { COMPARE_PATH } from '@/routes/routes'
import { useTranslations } from 'next-intl'

export default function ComparePopup() {
	const { ref, isActive, setIsActive } = useOutsideClick<HTMLDivElement>(false)

	const t = useTranslations('home')

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
				isEmpty
				textEmpty={t('empty-compare')}
			>
				<PopupHeaderItem
					title='Смартфон Apple iPhone 12 mini 64 GB Green'
					price={70000}
					imageSrc='https://cdn.dummyjson.com/product-images/10/1.jpg'
					onClick={handleToggle}
				/>
				<PopupHeaderItem
					title='Смартфон Apple iPhone 12 mini 64 GB Green'
					price={70000}
					imageSrc='https://cdn.dummyjson.com/product-images/10/1.jpg'
					onClick={handleToggle}
				/>
				<PopupHeaderItem
					title='Смартфон Apple iPhone 12 mini 64 GB Green'
					price={70000}
					imageSrc='https://cdn.dummyjson.com/product-images/10/1.jpg'
					onClick={handleToggle}
				/>
				<PopupHeaderItem
					title='Смартфон Apple iPhone 12 mini 64 GB Green'
					price={70000}
					imageSrc='https://cdn.dummyjson.com/product-images/10/1.jpg'
					onClick={handleToggle}
				/>
				<PopupHeaderItem
					title='Смартфон Apple iPhone 12 mini 64 GB Green'
					price={70000}
					imageSrc='https://cdn.dummyjson.com/product-images/10/1.jpg'
					onClick={handleToggle}
				/>
				<PopupHeaderItem
					title='Смартфон Apple iPhone 12 mini 64 GB Greenfdfdsf sdf sd fsdfsdf'
					price={70000}
					imageSrc='https://cdn.dummyjson.com/product-images/10/1.jpg'
					onClick={handleToggle}
				/>
				<PopupHeaderItem
					title='Смартфон Apple iPhone 12 mini 64 GB Green'
					price={70000}
					imageSrc='https://cdn.dummyjson.com/product-images/10/1.jpg'
					onClick={handleToggle}
				/>
				<PopupHeaderItem
					title='Смартфон Apple iPhone 12 mini 64 GB Green'
					price={70000}
					imageSrc='https://cdn.dummyjson.com/product-images/10/1.jpg'
					onClick={handleToggle}
				/>
				<PopupHeaderItem
					title='Смартфон Apple iPhone 12 mini 64 GB Green'
					price={70000}
					imageSrc='https://cdn.dummyjson.com/product-images/10/1.jpg'
					onClick={handleToggle}
				/>
			</PopupHeaderContainer>
		</PopupHeader>
	)
}
