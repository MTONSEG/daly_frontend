'use client'

import React, { Dispatch, ForwardedRef, SetStateAction, forwardRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CloseSign } from '@/components/ui/icons'
import CommentForm from './CommentForm'
import useOutsideClick from '@/hooks/useOutSideClick'

interface ICommentPopup {
	isActive: boolean
	setIsActive: Dispatch<SetStateAction<boolean>>
	refetch: () => void
	id: number
}

const CommentPopup = forwardRef(
	({ isActive, setIsActive, refetch, id }: ICommentPopup, ref: ForwardedRef<HTMLDivElement>) => {
		const {
			ref: thanksRef,
			isActive: thanksPopup,
			setIsActive: setThanksPopup
		} = useOutsideClick<HTMLDivElement>(false)

		return (
			<>
				<AnimatePresence>
					{isActive && (
						<div className='underlay'>
							<motion.div
								ref={ref}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className={`comment-popup ${thanksPopup && 'comment-popup__thanks'}`}
							>
								<div className='closeSign-wr' onClick={() => setIsActive(false)}>
									<CloseSign />
								</div>

								<CommentForm
									refetch={refetch}
									isActive={isActive}
									setIsActive={setIsActive}
									thanksPopup={thanksPopup}
									setThanksPopup={setThanksPopup}
									id={id}
								/>
							</motion.div>
						</div>
					)}
				</AnimatePresence>
			</>
		)
	}
)

export default CommentPopup
