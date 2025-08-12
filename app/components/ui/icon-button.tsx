import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const iconButtonVariants = cva(
	"inline-flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90",
				secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				glass: "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white",
			},
			size: {
				sm: "h-8 w-8",
				default: "h-10 w-10",
				lg: "h-12 w-12",
				xl: "h-14 w-14",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

interface IconButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof iconButtonVariants> {
	icon: React.ReactNode;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
	({ className, variant, size, icon, ...props }, ref) => {
		return (
			<button
				className={cn(iconButtonVariants({ variant, size, className }))}
				ref={ref}
				{...props}>
				{icon}
			</button>
		);
	},
);

IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
