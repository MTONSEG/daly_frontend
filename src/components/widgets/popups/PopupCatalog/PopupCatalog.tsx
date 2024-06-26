'use client'

import { useTranslations } from 'next-intl'
import {
	AudioIcon,
	BagIcon,
	BurgerIcon,
	CameraIcon,
	HammerIcon,
	InstrIcon,
	LaptopIcon,
	MonitorIcon,
	NotebookIcon,
	PhoneIcon,
	PrinterIcon,
	RadioIcon,
	WheelIcon
} from '@/components/ui/icons'
import './PopupCatalog.scss'
import useOutsideClick from '@/hooks/useOutSideClick'
import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import { CATALOG_PATH } from '@/routes/routes'
import type { IMapIcons } from '@/types/types'
import { useMemo, useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { checkArr } from '@/utils/checkArr'
import { ThreeDots } from 'react-loader-spinner'
import { usePathname } from '@/navigation'
import { setActive } from '@/utils/setActive'
import { formatPath } from '@/utils/formatPath'
import { useGetCategoriesQuery } from '@/store/header/header.api'
import PopupCatalogItem from '@/components/widgets/popups/PopupCatalog/PopupCatalogItem/PopupCatalogItem'
import PopupCatalogMenu from '@/components/widgets/popups/PopupCatalog/PopupCatalogMenu/PopupCatalogMenu'
import { useMatchMedia } from '@/hooks/use-match-media'

interface PropsType {
	hideMenu?: () => void
}

const PopupCatalog = ({ hideMenu }: PropsType) => {
	const { ref, isActive, setIsActive } = useOutsideClick<HTMLUListElement>(false)
	const { locale } = useParams()
	const path = usePathname()
	const { data, isLoading } = useGetCategoriesQuery(checkArr(locale))
	const t = useTranslations('home')
	const windowWidth = useMatchMedia()

	const handleOpen = () => {
		setIsActive(true)
	}

	useEffect(() => {
		setIsActive(false)
	}, [path, setIsActive])

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const iconMap: IMapIcons = {
		smartphones: PhoneIcon,
		laptops: LaptopIcon,
		fragrances: BagIcon,
		skincare: RadioIcon,
		groceries: NotebookIcon,
		'home-decoration': InstrIcon,
		furniture: CameraIcon,
		tops: HammerIcon,
		sunglasses: MonitorIcon,
		automotive: AudioIcon,
		motorcycle: WheelIcon,
		lighting: PrinterIcon
	}

	const items = useMemo(
		() =>
			data?.data.map((el) => {
				const Icon = iconMap[el.attributes.name]
				const products = el.attributes.products ? el.attributes.products.data : []

				return (
					<PopupCatalogItem href={''} products={products} key={el.id} onClick={hideMenu}>
						{Icon ? <Icon /> : ''}

						<span>{el.attributes.label}</span>
					</PopupCatalogItem>
				)
			}),
		[data?.data, iconMap, hideMenu]
	)
	const [textColor, setTextColor] = useState<boolean>(false)
	const handleTextColor = () => {
		if (textColor) {
			setTextColor(false)
		} else {
			setTextColor(true)
		}
	}

	return (
		<div className='popup-catalog'>
			<LinkBtn
				href={windowWidth.isDesktop ? `/${CATALOG_PATH}` : ''}
				className={`popup-catalog__btn ${setActive(formatPath(path) === CATALOG_PATH)}`}
				onMouseEnter={handleOpen}
			>
				<BurgerIcon style={{ transform: 'translateY(4px)' }} />{' '}
				<span onClick={handleTextColor} className='popup-catalog__text'>
					{t('catalog')}
				</span>
			</LinkBtn>
			<PopupCatalogMenu ref={ref} isActive={isActive}>
				{isLoading ? (
					<ThreeDots
						visible={true}
						radius='9'
						ariaLabel='three-dots-loading'
						wrapperClass='popup-catalog__loader'
					/>
				) : (
					items
				)}
			</PopupCatalogMenu>
		</div>
	)
}

export default PopupCatalog
