import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function loading() {
	return (
		<div>
			<SkeletonTheme baseColor='#202020' highlightColor='#444'>
				<div>
					<Skeleton count={100} />
					<h2
						style={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							fontSize: '72px'
						}}
					>
						Loading...
					</h2>
				</div>
			</SkeletonTheme>
		</div>
	)
}
