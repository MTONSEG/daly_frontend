'use client'
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar'
import { useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const TopProgressBar = () => {
	const ref = useRef<LoadingBarRef>(null)
	const path = usePathname()

	useEffect(() => {
		if (ref.current !== null) {
			ref.current.continuousStart()
			setTimeout(() => {
				ref.current && ref.current.complete()
			}, 3000)
		}
	}, [path])
	return (
		<div>
			<LoadingBar
				color='linear-gradient(
			90deg,
			#00c65e 25.16%,
			rgba(0, 198, 94, 0) 100%
		) '
				//color='green'
				ref={ref}
				className='top-progress-bar'
				waitingTime={3000}
				style={{ height: '6px' }}
			/>
		</div>
	)
}

export default TopProgressBar
