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
import { useFetchMultipleByIds } from '@/hooks/useFetchMultipleByIds'
import { useParams } from 'next/navigation'

export default function CartPopup() {
	const { ref, isActive, setIsActive } = useOutsideClick<HTMLDivElement>(false)
	const [products, setProducts] = useState<IProduct[]>([])
	const productIds = useAppSelector((state) => state.basket.products)
	const productPlainIds = productIds.map((productId) => {
		return productId.id
	})
	const { locale } = useParams()
	console.log(products)

	const t = useTranslations('home')

	const handleToggle = () => {
		setIsActive((active) => !active)
	}

	useEffect(() => {
		const FetchProducts = async () => {
			const fetchedProducts = await useFetchMultipleByIds(productPlainIds, locale)
			setProducts(fetchedProducts)
		}

		FetchProducts()
	}, [productIds, locale])

	return (
		<PopupHeader variant='cart'>
			<Button className='popup-header__btn' onClick={handleToggle}>
				<CartIcon />
			</Button>

			<PopupHeaderContainer
				ref={ref}
				isActive={isActive}
				hrefLink={`/${BASKET_PATH}`}
				labelLink='В корзину'
				isEmpty={products.length > 0 ? false : true}
				textEmpty={t('empty-cart')}
			>
				{products &&
					products.map((item, index) => (
						<PopupHeaderItem
							title={item.attributes.title}
							price={item.attributes.price}
							imageSrc={item.attributes.thumbnail}
							onClick={handleToggle}
						/>
					))}
			</PopupHeaderContainer>
		</PopupHeader>
	)
}
