import Basket from '@/components/screens/Basket/Basket'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Basket'
}

export default function BasketPage() {
	return <Basket />
}
