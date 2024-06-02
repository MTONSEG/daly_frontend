import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading() {
	return (
		<div className='base-loading'>
			<SkeletonTheme baseColor={"var(--bright-green)"} highlightColor='var(--medium-grey)'>
				<div>
					<Skeleton count={100} />
					<h2
						style={{
							position: 'absolute',
							top: '30%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							fontSize: '72px',
							color:"var(--white)"
						}}
					>
						Loading...
					</h2>
				</div>
			</SkeletonTheme>
		</div>
	)
}
