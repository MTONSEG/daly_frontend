'use client'

import Button from '@/components/ui/buttons/Button/Button'
import { CompareIcon } from '@/components/ui/icons'
import PopupHeader from '@/components/widgets/popups/PopupHeader/PopupHeader'
import PopupHeaderContainer from '@/components/widgets/popups/PopupHeader/PopupHeaderContainer/PopupHeaderContainer'
import PopupHeaderItem from '@/components/widgets/popups/PopupHeader/PopupHeaderItem/PopupHeaderItem'
import useOutsideClick from '@/hooks/useOutSideClick'
import { COMPARE_PATH } from '@/routes/routes'
import { useTranslations } from 'next-intl'
import { useAppSelector } from '@/hooks/useReduxHooks'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useParams } from 'next/navigation'
import { IProduct } from '@/types/types'
import { useFetchProductsByIdsQuery } from '@/hooks/useFetchMultipleByIds'
import Loader from '@/components/ui/loaders/Loader'

export default function ComparePopup() {
	const { ref, isActive, setIsActive } = useOutsideClick<HTMLDivElement>(false)
	const t = useTranslations('home')
	const [products, setProducts] = useState<IProduct[]>([])
	const compareIds = useAppSelector((state) => state.comparison.products)
	const { locale } = useParams()

	const handleToggle = () => {
		setIsActive((active) => !active)
	}

	//Call the hook to fetch products by IDs
	const {
		data: fetchedProducts,
		isLoading
	} = useFetchProductsByIdsQuery(
		{
			ids: compareIds,
			locale
		},
		{
			skip: compareIds.length === 0
		}
	)

	useEffect(() => {
		if (fetchedProducts) {
			setProducts(fetchedProducts)
		}
	}, [fetchedProducts])

	const path = usePathname()
	useEffect(() => {
		setIsActive(false)
	}, [path, setIsActive])

	return (
		<PopupHeader variant='compare'>
			<Button className='popup-header__btn' onClick={handleToggle}>
				<CompareIcon />
			</Button>

			<PopupHeaderContainer
				ref={ref}
				isActive={isActive}
				className={`!isActive && ${"hidden"}`}
				hrefLink={`/${COMPARE_PATH}`}
				labelLink='В сравнение'
				textEmpty={t('empty-compare')}
				isEmpty={products.length > 0 ? false : true}
			>
				{isLoading ? (
					<Loader />
				) : (
					products.map((item, index) => (
						<PopupHeaderItem
							title={item.attributes.title}
							price={item.attributes.price}
							imageSrc={item.attributes.thumbnail}
							onClick={handleToggle}
							key={index}
						/>
					))
				)}
			</PopupHeaderContainer>
		</PopupHeader>
	)
}
