'use client';
import React, { FC, ReactNode } from 'react';
import './PrimaryBtn.scss';

export interface IPrimaryBtn {
    text?: string | ReactNode;
    type: 'default' | 'buying' | 'basket-btn' | 'middle' | 'large';
    icon?: JSX.Element;
    htmlType?: 'button' | 'submit' | 'reset' | undefined;
    className?: string;
    props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
    onClick?: any;
}

const PrimaryBtn: FC<IPrimaryBtn> = ({ text, htmlType, type = 'default', icon, className, onClick, props }) => {
    return (
        <button type={htmlType ? htmlType : 'button'} className={`primaryBtn ${type} ${className}`} onClick={onClick} {...props}>
            {text ? text : ''}
            {icon ? icon : ''}
        </button>
    );
};

export default PrimaryBtn;
