'use client'

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
import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import './PopupCatalog.scss'

import { CATALOG_PATH } from '@/routes/routes'
import { useTranslations } from 'next-intl'
import PopupCatalogItem from '@/components/widgets/modals/PopupCatalog/PopupCatalogItem/PopupCatalogItem'
import PopupCatalogMenu from '@/components/widgets/modals/PopupCatalog/PopupCatalogMenu/PopupCatalogMenu'
import useOutsideClick from '@/hooks/useOutSideClick'

export default function PopupCatalog() {
	const { ref, isActive, setIsActive } = useOutsideClick<HTMLUListElement>(false)

	const t = useTranslations('home')

	const handleOpen = () => {
		setIsActive(true)
	}

	// const iconMap: IMapIcons = {
	// 	smartphones: PhoneIcon,
	// 	laptops: LaptopIcon,
	// 	fragrances: BagIcon,
	// 	skincare: FrozenIcon,
	// 	groceries: HandIcon,
	// 	'home-decoration': InstrIcon,
	// 	furniture: JobIcon,
	// 	tops: HammerIcon,
	// 	'womens-dresses': MonitorIcon,
	// 	'womens-shoes': NotebookIcon,
	// 	'mens-shirts': CameraIcon,
	// 	'mens-shoes': AppleIcon,
	// 	'mens-watches': HeadsetIcon,
	// 	'womens-watches': SockIcon,
	// 	'womens-bags': RadioIcon,
	// 	'womens-jewellery': TabletIcon,
	// 	automotive: AudioIcon,
	// 	motorcycle: WheelIcon,
	// 	lighting: PrinterIcon
	// }

	return (
		<div className='popup-catalog'>
			<LinkBtn
				href={`/${CATALOG_PATH}`}
				className='popup-catalog__btn'
				onMouseEnter={handleOpen}
			>
				<BurgerIcon /> <span>{t('catalog')}</span>
			</LinkBtn>

			<PopupCatalogMenu ref={ref} isActive={isActive}>
				<PopupCatalogItem>
					<AudioIcon className='popup-catalog__icon' />

					<span>{'test'}</span>
				</PopupCatalogItem>

				<PopupCatalogItem>
					<AudioIcon className='popup-catalog__icon' />

					<span>{'test'}</span>
				</PopupCatalogItem>

				<PopupCatalogItem>
					<AudioIcon className='popup-catalog__icon' />

					<span>{'test'}</span>
				</PopupCatalogItem>
			</PopupCatalogMenu>
		</div>
	)
}
