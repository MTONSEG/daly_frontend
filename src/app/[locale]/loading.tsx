import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading() {
	return (
		<div className='base-loading'>
			<SkeletonTheme baseColor={"var(--white)"} highlightColor='var(--medium-grey)'>
				<div>
					<Skeleton count={100} />
				</div>
			</SkeletonTheme>
		</div>
	)
}
