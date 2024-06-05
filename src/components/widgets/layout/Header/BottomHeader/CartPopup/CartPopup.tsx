'use client'

import Button from '@/components/ui/buttons/Button/Button'
import { CartIcon } from '@/components/ui/icons'
import PopupHeader from '@/components/widgets/popups/PopupHeader/PopupHeader'
import PopupHeaderContainer from '@/components/widgets/popups/PopupHeader/PopupHeaderContainer/PopupHeaderContainer'
import PopupHeaderItem from '@/components/widgets/popups/PopupHeader/PopupHeaderItem/PopupHeaderItem'
import useOutsideClick from '@/hooks/useOutSideClick'
import { BASKET_PATH } from '@/routes/routes'
import { useTranslations } from 'next-intl'
import { useAppSelector } from '@/hooks/useReduxHooks'
import { useState, useEffect } from 'react'
import { IProduct } from '@/types/types'
import { useFetchProductsByIdsQuery } from '@/hooks/useFetchMultipleByIds'
import { useParams } from 'next/navigation'
import Loader from '@/components/ui/loaders/Loader'

export default function CartPopup() {
	const { ref, isActive, setIsActive } = useOutsideClick<HTMLDivElement>(false)
	const [products, setProducts] = useState<IProduct[]>([])
	const productIds = useAppSelector((state) => state.basket.products)
	const productPlainIds = productIds.map((productId) => {
		return productId.id
	})

	const { locale } = useParams()
	const t = useTranslations('home')

	const handleToggle = () => {
		setIsActive((active) => !active)
	}

	const {
		data: fetchedProducts,
		error,
		isLoading
	} = useFetchProductsByIdsQuery(
		{
			ids: productPlainIds,
			locale
		},
		{
			skip: productPlainIds.length === 0
		}
	)

	// Update the products state when fetchedProducts changes
	useEffect(() => {
		if (fetchedProducts) {
			setProducts(fetchedProducts)
		}
	}, [fetchedProducts])
	return (
		<PopupHeader variant='cart'>
			<Button className='popup-header__btn' onClick={handleToggle}>
				<CartIcon />
				{products.length > 0 && <div className='busket-amount'>{products.length}</div>}
			</Button>

			<PopupHeaderContainer
				ref={ref}
				isActive={isActive}
				hrefLink={`/${BASKET_PATH}`}
				labelLink='В корзину'
				isEmpty={products.length > 0 ? false : true}
				textEmpty={t('empty-cart')}
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
