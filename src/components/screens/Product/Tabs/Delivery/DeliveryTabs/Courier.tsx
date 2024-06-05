import LinkBtn from "@/components/ui/buttons/LinkBtn/LinkBtn"
import { useTranslations } from "next-intl"
import DeliveryForm from "../DeliveryForm/DeliveryForm"

const Courier = () => {
	const tD = useTranslations('delivery')

	return (
		<div className='courier'>
			<div className='courier__left'>
				<DeliveryForm />

				<LinkBtn href='' className='courier__link'>
					{tD('linkText')}
				</LinkBtn>
			</div>
		</div>
	)
}

export default Courier  