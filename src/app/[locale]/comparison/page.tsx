import Comparison from "@/components/screens/Comparison/Comparison"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Comparison'
}

export default function  ComparisonPage() {
	return (
		<Comparison/>
	)
}
