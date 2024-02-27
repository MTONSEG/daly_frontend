import Link from 'next/link'
import './Logo.scss'
import { LogoSite } from '@/components/ui/icons'

interface PropsType {
	variant?: 'header' | 'footer'
}

export default function Logo({ variant = 'header' }: PropsType) {
	return (
		<Link href={'/'} className={`logo logo_${variant}`}>
			<LogoSite className='logo__icon' />
		</Link>
	)
}
