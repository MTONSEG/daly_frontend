import './Header.scss'
import TopHeader from '@/components/widgets/layout/Header/TopHeader/TopHeader'
import BottomHeader from '@/components/widgets/layout/Header/BottomHeader/BottomHeader'

export default function Header() {
	
		return (
		<header className='header'>
			<TopHeader />
			<BottomHeader />
		</header>
	)
}
