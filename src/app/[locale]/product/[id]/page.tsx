import Product from '@/components/screens/Product/Product'
import type { Metadata } from 'next'

type Props = {
	params: { id: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	return {
		title: `Product ${params.id}`
	}
}

const Page = ({ params }: { params: { id: number } }) => {
	return <Product id={params.id} />
}

export default Page
