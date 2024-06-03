import { useTranslations } from 'next-intl'
import './TabCredit.scss';

const Credit = () => {
	const t = useTranslations('product')

	return (
		<div className='credit'>
			<h1 className='credit__title'>{t('credit')}</h1>
			<div className='credit-box'>
				<h2 className='credit-box__title'>{t('howToBuyCr')}</h2>
				<ol className='credit-box__ol'>
					<li className='credit-box__li'>
						<span>1.</span>
						{t('addToBusket')}
					</li>
					<li className='credit-box__li'>
						<span>2.</span>
						{t('addToBusket')}
					</li>
					<li className='credit-box__li'>
						<span>3.</span>
						{t('addToBusket')}
					</li>
					<li className='credit-box__li'>
						<span>4.</span>
						{t('addToBusket')}
					</li>
					<li className='credit-box__li'>
						<span>5.</span>
						{t('addToBusket')}
					</li>
				</ol>
			</div>

			<div className='credit-box credit-box_small'>
				<h2 className='credit-box__title'>{t('mounthlyPayment')}</h2>
				<ul className='credit-box__ol_installment '>
					<li className='credit-box__li_installment'>
						<p className='credix-box__left-text'>{t('mounthlyPayment')}</p>
						<p className='credix-box__right-text'>8350 ∞ ₴</p>
					</li>
				</ul>
			</div>

			<div className='credit-box credit-box_small'>
				<h2 className='credit-box__title'>{t('mounthlyPayment')}</h2>
				<ul className='credit-box__ol_installment '>
					<li className='credit-box__li_installment'>
						<p className='credix-box__left-text'>{t('mounthlyPayment')}</p>
						<p className='credix-box__right-text'>8350 ∞ ₴</p>
					</li>
				</ul>
			</div>
		</div>
	)
}


export default Credit