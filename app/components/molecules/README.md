# Molecules - Atomic Design Components

Molecules are combinations of atoms that form simple, reusable components with specific functionality. They represent the second level of the Atomic Design hierarchy.

## 📁 Organized Folder Structure

The molecules are now organized by feature/page to improve maintainability and discoverability:

```
molecules/
├── dining/                    # Dining page components
│   ├── MenuItemCard.tsx      # Food item cards
│   ├── SearchMolecule.tsx    # Search functionality
│   └── CategoryFilterMolecule.tsx # Category filters
├── entertainment/             # Entertainment page components
│   └── VideoCard.tsx         # Video content cards
├── reservations/              # Reservations page components
│   └── ReservationCard.tsx   # Venue booking cards
├── operator/                  # Operator page components
│   └── ServiceCard.tsx       # Service option cards
├── order-status/              # Order status page components
│   └── OrderCard.tsx         # Order tracking cards
├── home/                      # Home page components
│   ├── ACWidget.tsx          # Climate control widget
│   ├── MusicPlayer.tsx       # Music player widget
│   ├── EventCard.tsx         # Event display cards
│   └── ControlButtons.tsx    # Quick control buttons
├── controls/                  # Controls page components
│   └── controllers/          # Device controllers
│       ├── LightsController.tsx
│       ├── ACTuyaController.tsx
│       ├── CurtainsController.tsx
│       ├── RoomPreferences.tsx
│       ├── AppsPanel.tsx
│       ├── TVController.tsx
│       └── TuyaIRController.tsx
├── shared/                    # Shared across multiple pages
│   ├── Navigation.tsx        # Main navigation
│   ├── Header.tsx            # Page headers
│   └── NavigationMenu.tsx    # Menu navigation
└── index.ts                  # Central export file
```

## Key Principles

### ✅ **MUST Use Atoms as Building Blocks**

Molecules should always use atoms from the `ui/` directory as their foundation. This ensures consistency and reusability.

```tsx
// ✅ CORRECT: Using Card atom
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const MenuItemCard = ({ item }) => (
	<Card className="hover:shadow-2xl">
		<CardContent>
			<CardHeader>
				<CardTitle>{item.name}</CardTitle>
			</CardHeader>
			{/* Business logic here */}
		</CardContent>
	</Card>
);
```

```tsx
// ❌ INCORRECT: Creating custom card styling
export const MenuItemCard = ({ item }) => (
	<div className="bg-white rounded-3xl shadow-lg border border-slate-100">
		{/* Violates atomic design principles */}
	</div>
);
```

## Available Molecules by Category

### 🍽️ Dining Components

- **`MenuItemCard`** - Displays food menu items with add-to-cart functionality
- **`SearchMolecule`** - Search input with icon
- **`CategoryFilterMolecule`** - Category selection buttons

### 🎬 Entertainment Components

- **`VideoCard`** - Shows video content with play functionality

### 📅 Reservations Components

- **`ReservationCard`** - Shows reservation venues with booking functionality

### 🎛️ Operator Components

- **`ServiceCard`** - Displays service options with click handlers

### 📋 Order Status Components

- **`OrderCard`** - Displays order status and details

### 🏠 Home Components

- **`ACWidget`** - Climate control with temperature gauge
- **`MusicPlayer`** - Music player with controls
- **`EventCard`** - Event display cards
- **`ControlButtons`** - Quick access control buttons

### 🎮 Controls Components

- **`LightsController`** - Smart lighting controls
- **`ACTuyaController`** - Air conditioning controls
- **`CurtainsController`** - Curtain automation
- **`RoomPreferences`** - Room settings
- **`AppsPanel`** - App launcher
- **`TVController`** - Television controls
- **`TuyaIRController`** - IR device controls

### 🔗 Shared Components

- **`Navigation`** - Main navigation bar
- **`Header`** - Page headers
- **`NavigationMenu`** - Menu navigation

## Usage Examples

### Importing from Organized Folders

```tsx
// Import specific components by category
import { MenuItemCard } from "../molecules/dining/MenuItemCard";
import { VideoCard } from "../molecules/entertainment/VideoCard";
import { ACWidget } from "../molecules/home/ACWidget";

// Or import from central index (recommended)
import { MenuItemCard, VideoCard, ACWidget } from "../molecules";
```

### Creating a New Component

```tsx
// molecules/dining/NewDiningComponent.tsx
import React from "react";
import { Card, CardContent } from "../../ui/card";

interface NewDiningComponentProps {
	// Define props
}

export const NewDiningComponent: React.FC<NewDiningComponentProps> = ({}) => {
	return (
		<Card>
			<CardContent>{/* Component content */}</CardContent>
		</Card>
	);
};

export default NewDiningComponent;
```

Then add to `index.ts`:

```tsx
export { default as NewDiningComponent } from "./dining/NewDiningComponent";
```

## Best Practices

### 1. Always Use Atoms

- Import and use atoms from `../ui/` directory
- Don't create custom styling that duplicates atom functionality
- Leverage atom props for customization

### 2. Keep Business Logic Simple

- Molecules should contain minimal business logic
- Focus on presentation and simple interactions
- Complex logic belongs in organisms

### 3. Use TypeScript Interfaces

- Define clear prop interfaces
- Export types for reuse
- Use shared types from `../../types/`

### 4. Make Components Reusable

- Design for multiple use cases
- Provide sensible defaults
- Use className prop for customization

### 5. Follow Naming Conventions

- Use PascalCase for component names
- Include "Card" suffix for card-based molecules
- Use descriptive, specific names

### 6. Organize by Feature

- Group related components in feature folders
- Use shared folder for cross-cutting components
- Keep controllers in dedicated subfolder

## Migration Checklist

When refactoring existing components to follow atomic design:

- [ ] Identify which atoms to use (Card, Button, Input, etc.)
- [ ] Import atoms from `../ui/` directory
- [ ] Replace custom styling with atom components
- [ ] Update props to use atom interfaces
- [ ] Place component in appropriate feature folder
- [ ] Update index.ts exports
- [ ] Test component in different contexts
- [ ] Update documentation

## Benefits

By following these principles, molecules provide:

1. **Consistency**: All cards use the same base styling
2. **Reusability**: Components work across different pages
3. **Maintainability**: Changes to atoms propagate automatically
4. **Scalability**: Easy to create new molecules following the pattern
5. **Organization**: Clear structure by feature/functionality
6. **Testing**: Components can be tested independently

This approach ensures a robust, maintainable component system that scales with your application.
