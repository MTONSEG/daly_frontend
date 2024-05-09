"use client"
import React from 'react';
import './ScrollToBtn.scss';

interface IScrollToBtnProps {
    text: string;
    elementId: string;
    className?: string;
}

const ScrollToBtn: React.FC<IScrollToBtnProps> = ({ text, elementId, className }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <a href={`#${elementId}`} className={`scroll-to-button ${className}`} aria-label='next-button' onClick={handleClick}>
            {text}
        </a>
    );
};

export default ScrollToBtn;
