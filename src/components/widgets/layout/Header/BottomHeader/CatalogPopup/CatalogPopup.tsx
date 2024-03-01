'use client'

import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import {
	AppleIcon,
	AudioIcon,
	BagIcon,
	BurgerIcon,
	CameraIcon,
	FrozenIcon,
	HammerIcon,
	HandIcon,
	HeadsetIcon,
	InstrIcon,
	JobIcon,
	LaptopIcon,
	MonitorIcon,
	NotebookIcon,
	PhoneIcon,
	PrinterIcon,
	RadioIcon,
	SockIcon,
	TabletIcon,
	WheelIcon
} from '@/components/ui/icons'
import PopupCatalogItem from '@/components/widgets/modals/PopupCatalog/PopupCatalogItem/PopupCatalogItem'
import PopupHeader from '@/components/widgets/modals/PopupHeader/PopupHeader'
import PopupHeaderContainer from '@/components/widgets/modals/PopupHeader/PopupHeaderContainer/PopupHeaderContainer'
import useOutsideClick from '@/hooks/useOutSideClick'
import { CATALOG_PATH } from '@/routes/routes'
import { useGetCategoriesQuery } from '@/store/api/catalog-header.api'
import { isArray } from '@/utils/isArray'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { ReactNode } from 'react'

export default function CatalogPopup() {
	const { ref, isActive, setIsActive } = useOutsideClick<HTMLDivElement>(false)
	const { locale } = useParams()

	const { data } = useGetCategoriesQuery(isArray(locale))

	const t = useTranslations('home')

	const handleOpen = () => {
		setIsActive(true)
	}

	const iconMap: Record<string, ReactNode> = {
		smartphones: PhoneIcon,
		laptops: LaptopIcon,
		fragrances: BagIcon,
		skincare: FrozenIcon,
		groceries: HandIcon,
		'home-decoration': InstrIcon,
		furniture: JobIcon,
		tops: HammerIcon,
		'womens-dresses': MonitorIcon,
		'womens-shoes': NotebookIcon,
		'mens-shirts': CameraIcon,
		'mens-shoes': AppleIcon,
		'mens-watches': HeadsetIcon,
		'womens-watches': SockIcon,
		'womens-bags': RadioIcon,
		'womens-jewellery': TabletIcon,
		automotive: AudioIcon,
		motorcycle: WheelIcon,
		lighting: PrinterIcon
	}

	return (
		<PopupHeader onMouseEnter={handleOpen}>
			<LinkBtn href={`/${CATALOG_PATH}`} className='popup-header__btn'>
				<BurgerIcon /> <span>{t('catalog')}</span>
			</LinkBtn>

			<PopupHeaderContainer

				ref={ref}
				isActive={isActive}
				hrefLink={`/${CATALOG_PATH}`}
				labelLink='В корзину'
			>
				{data?.data.map((el) => {
					const Icon = iconMap[el.attributes.name]
						? iconMap[el.attributes.name]
						: null

					return (
						<PopupCatalogItem key={el.id}>
							{Icon && <Icon className='popup-header__catalog-item-icon' />}
							<span>{el.attributes.label}</span>
						</PopupCatalogItem>
					)
				})}
			</PopupHeaderContainer>
		</PopupHeader>
	)
}
