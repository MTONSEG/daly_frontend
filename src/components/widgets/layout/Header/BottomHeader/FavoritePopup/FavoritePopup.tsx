'use client'

import './Favourite-popup.scss'
import Button from '@/components/ui/buttons/Button/Button'
import { FavoriteIcon } from '@/components/ui/icons'
import PopupHeader from '@/components/widgets/popups/PopupHeader/PopupHeader'
import PopupHeaderContainer from '@/components/widgets/popups/PopupHeader/PopupHeaderContainer/PopupHeaderContainer'
import PopupHeaderItem from '@/components/widgets/popups/PopupHeader/PopupHeaderItem/PopupHeaderItem'
import useOutsideClick from '@/hooks/useOutSideClick'
import { FAVOURITE_PATH } from '@/routes/routes'
import { useTranslations } from 'next-intl'
import { useAppSelector } from '@/hooks/useReduxHooks'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { IProduct } from '@/types/types'
import { useFetchProductsByIdsQuery } from '@/hooks/useFetchMultipleByIds'
import Loader from '@/components/ui/loaders/Loader'

export default function FavoritePopup() {
	const { ref, isActive, setIsActive } = useOutsideClick<HTMLDivElement>(false)
	const { locale } = useParams()
	const sortingWay = useAppSelector((state) => state.filters.sortingMethod) as 'asc' | 'desc'
	const sortingOption = useAppSelector((state) => state.filters.sortingOption) as
		| 'publishedAt'
		| 'price'
		| 'rating'
	const t = useTranslations('home')
	const productIds = useAppSelector((state) => state.favourites.products)
	const [products, setProducts] = useState<IProduct[]>([])

	const handleToggle = () => {
		setIsActive((active) => !active)
	}

	const { data: fetchedProducts, isLoading } = useFetchProductsByIdsQuery(
		{
			ids: productIds,
			locale
		},
		{
			skip: productIds.length === 0
		}
	)

	useEffect(() => {
		if (fetchedProducts) {
			const sortedProducts = [...fetchedProducts]
			const comparisonFunctions = {
				publishedAt: {
					asc: (a: IProduct, b: IProduct) =>
						new Date(a.attributes.publishedAt).getTime() -
						new Date(b.attributes.publishedAt).getTime(),
					desc: (a: IProduct, b: IProduct) =>
						new Date(b.attributes.publishedAt).getTime() -
						new Date(a.attributes.publishedAt).getTime()
				},
				rating: {
					asc: (a: IProduct, b: IProduct) => a.attributes.rating - b.attributes.rating,
					desc: (a: IProduct, b: IProduct) => b.attributes.rating - a.attributes.rating
				},
				price: {
					asc: (a: IProduct, b: IProduct) => a.attributes.price - b.attributes.price,
					desc: (a: IProduct, b: IProduct) => b.attributes.price - a.attributes.price
				}
			}

			const validSortingOption = comparisonFunctions[sortingOption]
			const validSortingWay = validSortingOption ? validSortingOption[sortingWay] : null

			if (validSortingWay) {
				sortedProducts.sort(validSortingWay)
			}

			setProducts(sortedProducts)
		}
	}, [fetchedProducts, sortingOption, sortingWay])

	const path = usePathname()
	useEffect(() => {
		setIsActive(false)
	}, [path, setIsActive])

	return (
		<PopupHeader variant='favorite'>
			<Button className='popup-header__btn' onClick={handleToggle}>
				{products.length > 0 ? (
					<FavoriteIcon
						style={{
							filter:
								'brightness(0) saturate(100%) invert(44%) sepia(83%) saturate(1289%) hue-rotate(116deg) brightness(100%) contrast(103%)'
						}}
					/>
				) : (
					<FavoriteIcon />
				)}
			</Button>
			<PopupHeaderContainer
				ref={ref}
				isActive={isActive}
				hrefLink={`/${FAVOURITE_PATH}`}
				labelLink='В избранное'
				isEmpty={products.length === 0}
				textEmpty={t('empty-favorite')}
				className={`!isActive && ${"hidden"}`}
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
