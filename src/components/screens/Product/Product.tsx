'use client'
// import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs'
import Container from '@/components/ui/containers/Container/Container'

import SliderThumbnailFancyApp from '@/components/widgets/SliderThumbnail/SliderThumbnailFancyApp'
import useDataFetch from '@/hooks/useDataFetch'
import './Product.scss'
import { inter, open_sans } from '@/fonts/fonts'
import ProductInfoCenter from '@/components/screens/Product/ProductInfoCenter/ProductInfoCenter'
import ProductInfoRight from './ProductInfoRight/ProductInfoRight'
import Button from '@/components/ui/buttons/Button/Button'
import { ArrowRight } from '@/components/ui/icons'

interface IBreadcrumb {
	label: string
	href: string
	active?: boolean
}

const Product = () => {
	// const rtkQuery = useGetProductQuery({ locale: 'ru', id: '304' })

	// useEffect(() => {
	// 	console.log(rtkQuery)
	// }, [rtkQuery])
	// const { value, setValue, error: inputError, setError } = useInput('')
	// const {
	// 	value: textAreaValue,
	// 	setValue: setTextAreaValue,
	// 	error: textareaError,
	// 	setError: setTextareaError
	// } = useInput('')
	// const [selectValue, setSelectValue] = useState('1')
	// const currentPath = usePathname()

	// const t = useTranslations('inputErrors')
	// const productId = 304

	// const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	setValue(e.target.value)
	// 	if (e.target.value.length < 5) {
	// 		setError(t('>length'))
	// 	} else if (e.target.value.length > 7) {
	// 		setError(t('<length'))
	// 	} else {
	// 		setError(t('ok'))
	// 	}
	// }

	// const onTextareaChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
	// 	setTextAreaValue(e.target.value)
	// 	if (e.target.value.length < 5) {
	// 		setTextareaError(t('>length'))
	// 	} else if (e.target.value.length > 7) {
	// 		setTextareaError(t('<length'))
	// 	} else {
	// 		setTextareaError(t('ok'))
	// 	}
	// }

	const { data, error, isLoading } = useDataFetch(
		`http://localhost:1337/api/products/${304}?populate=images`
	)

	// const breadcrumbArr: IBreadcrumb[] = [
	// 	{ label: 'test', href: '/', active: false },
	// 	{ label: 'test2', href: `${currentPath}`, active: true }
	// ]

	if (error) {
		return <div>'Error'</div>
	}

	if (isLoading) {
		return <div>loading...</div>
	}

	return (
		<Container>
			<div className={`${open_sans.className} ${inter.className} product`}>
				<div className='product__title'>
					Смартфон Apple iPhone 11 128GB с новой комплектацией (зеленый)
				</div>
				<div className='product__slider-container'>
					{data && data.data.attributes.images && (
						<SliderThumbnailFancyApp images={data.data.attributes.images} />
					)}
				</div>
				<div className='product__info'>
					<div className='product__info_left'>
						<ProductInfoCenter />
					</div>
					<div className='product__info__right'>
						<ProductInfoRight />
						<Button className='product__info_deliver-btn' variant='product'>
							Подробнее про доставку и оплату <ArrowRight />
						</Button>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default Product
