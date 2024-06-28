import React, { useEffect, useState } from 'react'
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
	const [counter, setCounter] = useState<number>(5)
	const dispatch = useAppDispatch()

	useEffect(() => {
		let timeout: NodeJS.Timeout | null = null

		if (isDeleting) {
			timeout = setInterval(() => {
				setCounter((prevCounter) => prevCounter - 1)
			}, 1000)

			if (counter === 0) {
				dispatch(deleteProduct({ id: product.id }))
				setIsDeleting(false)
			}
		}

		return () => {
			if (timeout) {
				clearInterval(timeout)
			}
		}
	}, [isDeleting, dispatch, product.id, counter])

	const handleincrement = (): void => {
		dispatch(addProduct({ id: product.id }))
	}

	const handledecrement = (): void => {
		if (quantity === 1) {
			setIsDeleting(true)
		} else {
			dispatch(removeProduct({ id: product.id }))
		}
	}

	const handleRevert = (): void => {
		setIsDeleting(false)
		setCounter(5)
	}

	return (
		<>
			{!isDeleting ? (
				<section className='basket-row'>
					<div className='basket-row__photo-info-box'>
						<section className='basket-row__image-container'>
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
						</section>
						<section className='basket-row__info'>
							<p className='basket-row__info-category'>
								{product.attributes.category?.data.attributes.label}
							</p>
							<p className='basket-row__info-name'>{product.attributes.title}</p>
						</section>
					</div>
					<section className='basket-row__counter-container'>
						<Counter quantity={quantity} increment={handleincrement} decrement={handledecrement} />
					</section>
					<p className='basket-row__price'>{product.attributes.price}₴</p>
					<TrashIcon className='basket-row__delete-icon' onClick={() => setIsDeleting(true)} />
				</section>
			) : (
				<section className='basket-row'>
					<p className='basket-row__delete-text'>
						{word('deletion-text')}
						{counter} sec
					</p>
					<TransparentBtn onClick={handleRevert}>{word('revert-deletion-text')}</TransparentBtn>
				</section>
			)}
		</>
	)
}

export default BasketRow
