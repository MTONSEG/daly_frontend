"use client"
import './Breadcrumbs.scss';
import LinkBtn from '../Buttons/LinkBtn/LinkBtn';
import { HomeBlack } from '../icons';
import { IBreadcrumb } from '@/types/types';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Breadcrumbs({
	breadcrumbsArr,
	classname = ''
}: {
	breadcrumbsArr?: IBreadcrumb[];
	classname?: string;
}) {
	const [isHovered, setIsHovered] = useState<boolean>(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	let path = usePathname();
	let newPath = path.replace('/ru/', '').replace('/en/', '');
	let currentLink = '';
	const crumbsArray = newPath.split('/').filter((crumb) => crumb !== '');
	let crumbs = crumbsArray.map((crumb, index) => {
		currentLink += `/${crumb}`;
		
		const isLast = index === crumbsArray.length - 1;
		return (
			<div className='crumb' key={index}>
				{isLast ? (
					<span style={{color:"#000", fontWeight:"600",textDecoration: "none"}}>{crumb}</span>
				) : (
					<LinkBtn href={currentLink}>{crumb}</LinkBtn>
				)}
			</div>
		);
	});

	return (
		<nav className='breadcrumbs'>
			<ul className={`breadcrumbs__ul ${classname}`}>
				<li
					className='breadcrumbs__li'
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<LinkBtn href='/'>
						{isHovered ? (
							<HomeBlack
								style={{
									filter:
										'brightness(0) saturate(100%) invert(44%) sepia(83%) saturate(1289%) hue-rotate(116deg) brightness(100%) contrast(103%)'
								}}
							/>
						) : (
							<HomeBlack />
						)}
					</LinkBtn>
				</li>
				{crumbs.map((crumb, index) => (
					<li key={index} className='breadcrumbs__li'>
						{crumb}
					</li>
				))}
			</ul>
		</nav>
	);
}
