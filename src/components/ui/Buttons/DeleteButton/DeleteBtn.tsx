import './DeleteBtn.scss'
import { TrashIcon } from '../../icons'
import { useAppDispatch } from '@/hooks/useReduxHooks'
import { removeComparisonProduct } from '@/store/comparison/comparison.slice'

interface IDeleteBtnProps {
	productId: number
}

export default function DeleteBtn({ productId }: IDeleteBtnProps) {
	const dispatch = useAppDispatch()
	const handleDelete = () => {
		dispatch(removeComparisonProduct(productId))
	}
	return (
		<button className={`delete-btn`} onClick={handleDelete}>
			<TrashIcon className={'delete-btn__icon'} />
		</button>
	)
}
