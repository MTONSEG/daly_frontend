import React, { useState } from 'react'
import './BasketRow.scss'
import { IProduct } from '@/types/types'
import Image from 'next/image'
import { TrashIcon } from '@/components/ui/icons'
import Counter from '@/components/widgets/fragments/Counter/Counter'
import { useAppDispatch } from '@/hooks/useReduxHooks'
import { addProduct, removeProduct, deleteProduct } from '@/store/basket/basket.slice'
import { useTranslations } from 'use-intl'
import TransparentBtn from '@/components/ui/buttons/TransparentBtn/TransparentBtn'

interface IBasketRowProps {
	product: IProduct
	quantity: number
}

const BasketRow: React.FC<IBasketRowProps> = ({ product, quantity }) => {
	const word = useTranslations('basket')
	const [isDeleting, setIsDeleting] = useState<boolean>(false)
	const dispatch = useAppDispatch()

	const handleincrement = (): void => {
		dispatch(addProduct({ id: product.id }))
	}
	const handledecrement = (): void => {
		if (quantity === 1) {
			setIsDeleting(true)
			const timeout = setTimeout(() => {
				dispatch(removeProduct({ id: product.id }))
			}, 5000)
			if (!isDeleting) {
				clearTimeout(timeout)
			}
		} else {
			dispatch(removeProduct({ id: product.id }))
		}
	}

	const handleDelete = (): void => {
		setIsDeleting(true)
		const timeout = setTimeout(() => {
			dispatch(deleteProduct({ id: product.id }))
			clearTimeout(timeout)
		}, 5000)
		if (!isDeleting) {
			clearTimeout(timeout)
		}
	}

	const handleRevert = (): void => {
		setIsDeleting(false)
	}

	return (
		<>
			{!isDeleting ? (
				<div className='basket-row'>
					<div className='basket-row__photo-info-box'>
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
					</div>
					<div className='basket-row__counter-container'>
						<Counter quantity={quantity} increment={handleincrement} decrement={handledecrement} />
					</div>
					<div className='basket-row__price'>{product.attributes.price}₴</div>
					<TrashIcon className='basket-row__delete-icon' onClick={handleDelete} />
				</div>
			) : (
				<div className='basket-row'>
					{/* ADD COUNTER HERE */}
					<div className='basket-row__delete-text'>{word('deletion-text')}</div>
					<TransparentBtn onClick={handleRevert}>{word('revert-deletion-text')}</TransparentBtn>
				</div>
			)}
		</>
	)
}

export default BasketRow
