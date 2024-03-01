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
import PopupCatalogMenu from '@/components/widgets/modals/PopupCatalog/PopupCatalogMenu/PopupCatalogMenu'
import PopupCatalogItem from '@/components/widgets/modals/PopupCatalog/PopupCatalogItem/PopupCatalogItem'
import { useGetCategoriesQuery } from '@/store/api/catalog-header.api'
import type { IMapIcons } from '@/types/types'
import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import { checkArr } from '@/utils/checkArr'
import { ThreeDots } from 'react-loader-spinner'
import { usePathname } from '@/navigation'
import { setActive } from '@/utils/setActive'
import { formatPath } from '@/utils/formatPath'

const PopupCatalog = () => {
	const { ref, isActive, setIsActive } =
		useOutsideClick<HTMLUListElement>(false)

	const { locale } = useParams()

	const path = usePathname()

	const { data, isLoading } = useGetCategoriesQuery(checkArr(locale))

	const t = useTranslations('home')

	const handleOpen = () => {
		setIsActive(true)
	}

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

				return (
					<PopupCatalogItem
						href={''}
						products={el.attributes.products.data}
						key={el.id}
					>
						{Icon ? <Icon /> : ''}

						<span>{el.attributes.label}</span>
					</PopupCatalogItem>
				)
			}),
		[data?.data, iconMap]
	)

	return (
		<div className='popup-catalog'>
			<LinkBtn
				href={`/${CATALOG_PATH}`}
				className={`popup-catalog__btn ${setActive(formatPath(path) === CATALOG_PATH)}`}
				onMouseEnter={handleOpen}
			>
				<BurgerIcon /> <span>{t('catalog')}</span>
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
