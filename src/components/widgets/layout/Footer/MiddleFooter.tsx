import './Footer.scss'
import LinkBtn from '@/components/ui/Buttons/LinkBtn/LinkBtn'
import { useTranslations } from 'next-intl'


const MiddleFooter = () => {
	const word = useTranslations('middle-footer')
	const columnString1 = word('column1').replace(/'/g, '"')
	const columnArray1 = JSON.parse(columnString1)

	const columnString2 = word('column2').replace(/'/g, '"')
	const columnArray2 = JSON.parse(columnString2)

	const columnString3 = word('column3').replace(/'/g, '"')
	const columnArray3 = JSON.parse(columnString3)

	const columnString4 = word('column4').replace(/'/g, '"')
	const columnArray4 = JSON.parse(columnString4)

	const dataLinks = {
		[word('title1')]: columnArray1,
		[word('title2')]: columnArray2,
		[word('title3')]: columnArray3,
		
		[word('title4')]: columnArray4
	}
	
	interface Translations {
		breadcrumbs: {
		  [key: string]: string;
		};
	  }
	  
	  const links: Array<string> = ["#","#","#","#","#","#","/catalog","/delivery","/basket","#","#","#","#","#","/support"]
	 

	return (
		<div className='middle-footer'>
			{Object.entries(dataLinks).map(([title, items], index) => (
				<div className='middle-footer__column' key={index}>
					<h3 className='middle-footer__column-title'>{title}</h3>
					{items.map((item: string, i: number) => (
						<p className='middle-footer__column-link' key={i}>
							<LinkBtn
								href='/basket'
								text={item}
								children={item}
								className='middle-footer__column-link'
								variant='default'
							/>
						</p>
					))}
				</div>
			))}
		</div>
	)
}

export default MiddleFooter
