import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const textVariants = cva("", {
	variants: {
		variant: {
			default: "text-foreground",
			muted: "text-muted-foreground",
			accent: "text-accent-foreground",
			destructive: "text-destructive",
			white: "text-white",
		},
		size: {
			xs: "text-xs",
			sm: "text-sm",
			base: "text-base",
			lg: "text-lg",
			xl: "text-xl",
			"2xl": "text-2xl",
			"3xl": "text-3xl",
			"4xl": "text-4xl",
			"5xl": "text-5xl",
			"6xl": "text-6xl",
			"7xl": "text-7xl",
		},
		weight: {
			normal: "font-normal",
			medium: "font-medium",
			semibold: "font-semibold",
			bold: "font-bold",
			light: "font-light",
		},
		align: {
			left: "text-left",
			center: "text-center",
			right: "text-right",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "base",
		weight: "normal",
		align: "left",
	},
});

interface TextProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
	as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	italic?: boolean;
	truncate?: boolean;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
	(
		{
			className,
			variant,
			size,
			weight,
			align,
			as: Component = "p",
			italic = false,
			truncate = false,
			...props
		},
		ref,
	) => {
		return (
			<Component
				className={cn(
					textVariants({ variant, size, weight, align }),
					{
						italic: italic,
						truncate: truncate,
					},
					className,
				)}
				ref={ref as any}
				{...props}
			/>
		);
	},
);

Text.displayName = "Text";

export { Text, textVariants };
