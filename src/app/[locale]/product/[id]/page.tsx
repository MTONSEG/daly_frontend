import Product from '@/components/screens/Product/Product'

const Page = ({ params }: { params: { id: number } }) => {
	return <Product id={params.id} />
}

export default Page
