import Image from 'next/image'
import GreenCross from '@/images/green-cross.webp'

interface PropsType {
    closeWindow?: () => void
    className?: string
}

const ClosePopup = ({closeWindow,className}: PropsType) => {
    return (
		<div className={className} onClick={() => {closeWindow}}>
			<Image src={GreenCross} width={30} height={30} alt='cross' />
		</div>
	)
}

export default ClosePopup
