import React, { ReactNode } from 'react';
import './Button.scss';

export default function Button({
	children,
	type,
	className,
	btnType,
	styleProp,
	onClick,
}: {
	children: ReactNode;
	type?: 'button' | 'submit' | 'reset';
	className?: string;
	btnType?: 'default' | 'primary' | 'secondary' | 'primary-inverse';
	styleProp?: React.CSSProperties;
	onClick?: () => void;
}) {
	const handleButtonClick = () => {
		onClick ? onClick() : console.log('clicked');
	};
	return (
		<button
			className={`${className} btn ${btnType ? btnType : 'default'}`}
			type={type ? type : 'button'}
			style={{ ...styleProp }}
			onClick={handleButtonClick}
		>
			{children}
		</button>
	);
}
