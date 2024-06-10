'use client'

// interface PropType {
// 	error: string
// }

export default function Error() {
	return (
		<div className='error-wrapper'>
			<h2
				style={{
					position: 'absolute',
					top: '30%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					fontSize: '72px',
					color: 'red'
				}}
			>
				Error...
			</h2>
		</div>
	)
}
