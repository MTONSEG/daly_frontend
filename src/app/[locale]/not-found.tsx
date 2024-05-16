import { useTranslations } from 'next-intl'
import image404 from '@/images/404-image.png'
import Button from '@/components/ui/buttons/Button/Button'
import Image from 'next/image'

export default function NotFoundPage() {
	const t = useTranslations('404')
	return (
		<div className='page-404'>
			<div className='page-404__title'>{t('title')}</div>
			<div className='page-404__image-box'>
				<Image fill={true} src={image404} alt={'404-image'} className='page-404__image' />
			</div>
			<Button className='page-404__button'>{t('button')}</Button>
		</div>
	)
}
