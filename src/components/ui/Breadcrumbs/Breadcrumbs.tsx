"use client"
import "./Breadcrumbs.scss"
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import LinkBtn from '../Buttons/LinkBtn/LinkBtn';
import { HomeBlack } from '../icons';
import { usePathname } from 'next/navigation';
import ruTranslations from '../../../dictionaries/ru.json';
import enTranslations from '../../../dictionaries/en.json';
import { IBreadcrumb } from '@/types/types';

interface Translations {
  breadcrumbs: {
    [key: string]: string;
  };
}

const ru: Translations = ruTranslations;
const en: Translations = enTranslations;

export default function Breadcrumbs({
  breadcrumbsArr,
  classname = ''
}: {
  breadcrumbsArr?: IBreadcrumb[];
  classname?: string;
}) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { locale } = useParams();
  
    
  const translations = locale === 'ru' ? ru : en;

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
    const translatedCrumb = translations.breadcrumbs[crumb] || crumb; 
    
    return (
      <div className='crumb' key={index}>
        {isLast ? (
          <span style={{color:"var(--dark-grey)", fontWeight:"400", textDecoration: "none"}}>{translatedCrumb}</span>
        ) : (
          <>
            <LinkBtn href={currentLink}>{translatedCrumb}</LinkBtn>
            <span className='breadcrumb-separator'>/</span>
          </>
        )}
      </div>
    );
  });

  return (
    <nav className='breadcrumbs'>
      <ul className='breadcrumbs__ul'>
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
        <span className='breadcrumb-separator'>/</span>
        {crumbs.map((crumb, index) => (
          <li key={index} className='breadcrumbs__li'>
            {crumb}
          </li>
        ))}
      </ul>
    </nav>
  );
}
