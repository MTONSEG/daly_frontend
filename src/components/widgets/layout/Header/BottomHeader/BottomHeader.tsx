import LinkBtn from '@/components/ui/buttons/LinkBtn/LinkBtn'
import Container from '@/components/ui/containers/Container/Container'
import {
	BurgerIcon,
	DeliveryIcon,
	SearchIcon
} from '@/components/ui/icons'

import {
	CATALOG_PATH,
	DELIVERY_PATH,
	SUPPORT_PATH
} from '@/routes/routes'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function BottomHeader() {
	const t = useTranslations('home')

	return (
		<div className='bottom-header'>
			<Container>
				<div className='bottom-header__row'>
					<div className='bottom-header__left'>
						<LinkBtn
							className='bottom-header__left-link'
							href={`/${CATALOG_PATH}`}
							icon={<BurgerIcon />}
							text={t('catalog')}
						/>

						<LinkBtn
							className='bottom-header__left-link'
							href={`/${DELIVERY_PATH}`}
							icon={<DeliveryIcon />}
							text={t('deliveryAndPay')}
						/>
					</div>

					<div className='bottom-header__search'>
						<SearchIcon />
					</div>

					<div className='bottom-header__right'>
						<Link
							href={`/${SUPPORT_PATH}`}
							className='bottom-header__support-link'
						>
							{t('support')}
						</Link>

						{/* <PopupHeader label={<CompareIcon />}>
							<></>
							<LinkBtn
								href={`${COMPARE_PATH}`}
								text='В Сравнение'
								variant='green'
							/>
						</PopupHeader> */}
					</div>
				</div>
			</Container>
		</div>
	)
}
