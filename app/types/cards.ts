// Common card interfaces and types for reuse across components

// Menu Item types (Dining Page)
export interface MenuItem {
	id: string;
	name: string;
	price: number;
	description: string;
	image: string;
	category: string;
	rating: number;
	prepTime: string;
	isVegan?: boolean;
	isPopular?: boolean;
}

// Service types (Operator Page)
export interface Service {
	key: string;
	title: string;
	icon: React.ReactNode;
	description: string;
	phone?: string;
}

// Reservation types (Reservations Page)
export interface ReservationType {
	id: string;
	name: string;
	image: string;
	availableTimes: string[];
	description: string;
	category: string;
	rating: number;
	reviewCount: number;
	location: string;
	phone: string;
	email: string;
	priceRange: string;
	features: string[];
	capacity: {
		min: number;
		max: number;
	};
	isPopular?: boolean;
	isPremium?: boolean;
}

// Order types (Order Status Page)
export type OrderStatus =
	| "pending"
	| "confirmed"
	| "preparing"
	| "ready"
	| "delivered"
	| "cancelled";

export interface OrderItem {
	id: string;
	name: string;
	quantity: number;
	price: number;
}

export interface Order {
	id: string;
	orderNumber: string;
	items: OrderItem[];
	total: number;
	status: OrderStatus;
	orderTime: string;
	estimatedDelivery: string;
	actualDelivery?: string;
	roomNumber?: string;
	notes?: string;
}

// Video types (Entertainment Page)
export interface Video {
	id: string;
	title: string;
	subtitle: string;
	duration: string;
	category: string;
	thumbnail: string;
	youtubeId: string;
	isLive?: boolean;
}

// Common card props interface
export interface BaseCardProps {
	className?: string;
}

// Badge types for cards
export interface Badge {
	label: string;
	color: string;
	icon?: React.ReactNode;
}

// Common card variants
export type CardVariant = "default" | "elevated" | "outlined" | "filled";
export type CardSize = "sm" | "md" | "lg" | "xl";
