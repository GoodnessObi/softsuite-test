import React, { ReactNode } from 'react';
import './Button.scss';

export default function Button({
	children,
	type,
	className,
	btnType,
	styleProp,
}: {
	children: ReactNode;
	type?: 'button' | 'submit' | 'reset';
	className?: string;
	btnType?: 'default' | 'primary' | 'secondary' | 'primary-inverse';
	styleProp?: React.CSSProperties;
}) {
	return (
		<button
			className={`${className} btn ${btnType ? btnType : 'default'}`}
			type={type ? type : 'button'}
			style={{ ...styleProp }}
		>
			{children}
		</button>
	);
}
