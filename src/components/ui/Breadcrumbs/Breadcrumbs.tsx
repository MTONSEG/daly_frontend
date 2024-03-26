import './Breadcrumbs.scss'
import LinkBtn from '../buttons/LinkBtn/LinkBtn'

export interface IBreadcrumb {
	label: string
	href: string
	active?: boolean
}

export default function Breadcrumbs({
	breadcrumbsArr,
	classname = ''
}: {
	breadcrumbsArr: IBreadcrumb[]
	classname?: string
}) {
	return (
		<nav aria-label='Breadcrumb' className={`${classname}  breadcrumbs`}>
			<ul className='breadcrumbs__ul'>
				<li className='breadcrumbs__li'>
					<LinkBtn href={'/'}>
						<span className='breadcrumbs__separator'>/</span>
					</LinkBtn>
				</li>
				{breadcrumbsArr.map((breadcrumb, index) => (
					<li
						key={breadcrumb.href}
						aria-current={breadcrumb.active}
						className={`'breadcrumbs__li',
							${breadcrumb.active ? 'breadcrumbs__li_active' : ''}`}
					>
						<LinkBtn href={breadcrumb.href}>{breadcrumb.label}</LinkBtn>
						{index < breadcrumbsArr.length - 1 ? (
							<span className='breadcrumbs__separator'>/</span>
						) : null}
					</li>
				))}
			</ul>
		</nav>
	)
}
