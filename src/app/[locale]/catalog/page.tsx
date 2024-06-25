import Catalog from "@/components/screens/Catalog/Catalog"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Catalog'
}

export default function  CatalogPage() {
	return (
		<Catalog />
	)
}
