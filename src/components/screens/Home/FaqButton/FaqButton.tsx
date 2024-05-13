import '../Home.scss'
import Image from 'next/image'
import Faq from '@/assets/images/faq.webp'

 const FaqButton = () => {
	return (
		<>
			<Image src={Faq} width={50} height={50} alt='faq' className={'faq__icon'} />
		</>
	)
}
export default FaqButton
