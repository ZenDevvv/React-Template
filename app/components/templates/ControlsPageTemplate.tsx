import React from "react";

interface ControlsPageTemplateProps {
	children: React.ReactNode;
	className?: string;
}

export const ControlsPageTemplate: React.FC<ControlsPageTemplateProps> = ({
	children,
	className = "",
}) => {
	return (
		<div className={`min-h-screen bg-gray-50 ${className}`}>
			<div className="container mx-auto px-4 py-4 min-h-[calc(100vh-8rem)]">{children}</div>
		</div>
	);
};

export default ControlsPageTemplate;
