'use client'

import React, { Dispatch, ForwardedRef, SetStateAction, forwardRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { CloseSign } from '@/components/ui/icons'

import CommentForm from './CommentForm'

interface ICommentPopup {
	isActive: boolean
	setIsActive: Dispatch<SetStateAction<boolean>>
	refetch: () => void
}

const CommentPopup = forwardRef(
	({ isActive, setIsActive, refetch }: ICommentPopup, ref: ForwardedRef<HTMLDivElement>) => {
		return (
			<AnimatePresence>
				{isActive && (
					<div className='underlay'>
						<motion.div
							ref={ref}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='comment-popup'
						>
							<div className='closeSign-wr' onClick={() => setIsActive(false)}>
								<CloseSign />
							</div>

							<CommentForm refetch={refetch} />
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		)
	}
)

export default CommentPopup
