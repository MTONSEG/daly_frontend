import { motion } from 'framer-motion'
import { ArrowDown } from '@/components/ui/icons'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import './Lorem.scss';

const LoremComp = () => {
	const t = useTranslations('product')
	const [openText, setOpenText] = useState(true)

	const variants = {
		active: {
			opacity: 1
		},
		inactive: {
			opacity: 0,
			height: 0,
			overflow: 'hidden'
		}
	}

	return (
		<div className='lorem'>
			<h2 className='lorem__title'>{t('loremTitle')}</h2>
			<motion.p
				className='lorem__text'
				variants={variants}
				animate={openText ? 'active' : 'inactive'}
			>
				{t('loremText')}
			</motion.p>

			<div className='lorem__show-more' onClick={() => setOpenText(!openText)}>
				<p className='lorem__show-more-text'>
					{openText ? `${t('showMore')}` : `${t('showLess')}`}
				</p>
				<motion.div
					variants={{ active: { rotate: '180deg' }, inActive: { rotate: '0deg' } }}
					animate={openText ? 'active' : 'inactive'}
				>
					<ArrowDown />
				</motion.div>
			</div>
		</div>
	)
}

export default LoremComp
