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
import { usePathname } from 'next/navigation'
import { IProduct } from '@/types/types'
import { useFetchProductsByIdsQuery } from '@/hooks/useFetchMultipleByIds'
import { useParams } from 'next/navigation'

export default function CartPopup() {
	const { ref, isActive, setIsActive } = useOutsideClick<HTMLDivElement>(false)
	const productIds = useAppSelector((state) => state.basket.products)
	const [products, setProducts] = useState<IProduct[]>([])
	const productPlainIds = productIds.map((productId) => {
		return productId.id
	})
console.log(productIds)
	const { locale } = useParams()
	const t = useTranslations('home')

	const handleToggle = () => {
		setIsActive((active) => !active)
	}

	const { data: fetchedProducts } = useFetchProductsByIdsQuery(
		{
			ids: productPlainIds,
			locale
		},
		{
			skip: productIds.length === 0
		}
	)
	
	useEffect(() => {
		if (fetchedProducts && fetchedProducts.length > 0) {
			setProducts(fetchedProducts)
		}
	}, [productIds, fetchedProducts])

	const path = usePathname()
	useEffect(() => {
		setIsActive(false)
	}, [path, setIsActive])

	return (
		<PopupHeader variant='cart'>
			<Button className='popup-header__btn' onClick={handleToggle}>
				<CartIcon />
				{productIds.length > 0 && <div className='busket-amount'>{productIds.length}</div>}
			</Button>

			<PopupHeaderContainer
				ref={ref}
				isActive={isActive}
				className={`!isActive && ${'hidden'}`}
				hrefLink={`/${BASKET_PATH}`}
				labelLink='В корзину'
				isEmpty={productIds.length > 0 ? false : true}
				textEmpty={t('empty-cart')}
			>
				<div>
					{products.length > 0 && productIds.length > 0 &&
						products.map((item, index) => (
							<PopupHeaderItem
								title={item.attributes.title}
								price={item.attributes.price}
								imageSrc={item.attributes.thumbnail}
								onClick={handleToggle}
								key={index}
							/>
						))}
				</div>
			</PopupHeaderContainer>
		</PopupHeader>
	)
}
