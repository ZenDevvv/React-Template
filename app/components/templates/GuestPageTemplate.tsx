import React from "react";

interface GuestPageTemplateProps {
	children: React.ReactNode;
	className?: string;
}

export const GuestPageTemplate: React.FC<GuestPageTemplateProps> = ({
	children,
	className = "",
}) => {
	return (
		<div
			className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 ${className}`}>
			{children}
		</div>
	);
};

export default GuestPageTemplate;
