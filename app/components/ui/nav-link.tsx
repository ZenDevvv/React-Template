import * as React from "react";
import { Link } from "react-router";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const navLinkVariants = cva(
	"inline-flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group",
	{
		variants: {
			variant: {
				default: "text-foreground hover:text-primary",
				glass: "text-white hover:bg-white/15 rounded-xl",
				card: "bg-card text-card-foreground hover:bg-accent rounded-lg shadow-sm",
			},
			size: {
				sm: "p-1 gap-1",
				default: "p-2 gap-2",
				lg: "p-3 gap-3",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

interface NavLinkProps
	extends Omit<React.ComponentProps<typeof Link>, "className">,
		VariantProps<typeof navLinkVariants> {
	icon?: React.ReactNode;
	label: string;
	className?: string;
}

const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
	({ className, variant, size, icon, label, ...props }, ref) => {
		return (
			<Link
				className={cn(navLinkVariants({ variant, size, className }))}
				ref={ref}
				{...props}>
				{icon && (
					<div className="transition-all duration-300 group-hover:scale-110">{icon}</div>
				)}
				<span className="text-xs font-medium tracking-wide">{label}</span>
			</Link>
		);
	},
);

NavLink.displayName = "NavLink";

export { NavLink, navLinkVariants };
