import React, { useState } from 'react'
import './BasketRow.scss'
import { IProduct } from '@/types/types'
import Image from 'next/image'
import { TrashIcon } from '@/components/ui/icons'
import Counter from '@/components/widgets/fragments/Counter/Counter'
import { useAppDispatch } from '@/hooks/useReduxHooks'
import { addProduct, removeProduct, deleteProduct } from '@/store/basket/basket.slice'

interface IBasketRowProps {
	product: IProduct
	quantity: number
}

const BasketRow: React.FC<IBasketRowProps> = ({ product, quantity }) => {
	const dispatch = useAppDispatch()

	const handleincrement = (): void => {
		dispatch(addProduct({ id: product.id }))
	}
	const handledecrement = (): void => {
		dispatch(removeProduct({ id: product.id }))
	}

	const handleDelete = (): void => {
		dispatch(deleteProduct({ id: product.id }))
	}

	return (
		<div className='basket-row'>
			<div className='basket-row__image-container'>
				{product.attributes.images && (
					<Image
						src={product.attributes.images[0].url}
						alt={'product-image'}
						className='basket-row__image'
						fill={true}
						sizes='(max-width: 600px) 147px, 230px'
						priority={true}
						placeholder='blur'
						blurDataURL='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbRPTvTIKC4Hr49tsSDrZaG_KmIazHSNIEww&s'
						quality={75}
					/>
				)}
			</div>
			<div className='basket-row__info'>
				<div className='basket-row__info-category'>
					{product.attributes.category?.data.attributes.label}
				</div>
				<div className='basket-row__info-name'>{product.attributes.title}</div>
			</div>
			<div className='basket-row__counter-container'>
				<Counter quantity={quantity} increment={handleincrement} decrement={handledecrement} />
			</div>
			<div className='basket-row__price'>{product.attributes.price}₴</div>
			<TrashIcon className='basket-row__delete-icon' onClick={handleDelete} />
		</div>
	)
}

export default BasketRow

