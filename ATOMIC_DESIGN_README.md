# Atomic Design Implementation Guide

This document outlines the Atomic Design pattern implementation in our React application, showing how components are organized from the smallest building blocks (atoms) to complete pages.

## Directory Structure

```
app/components/
├── ui/                    # Atoms (smallest building blocks)
│   ├── button.tsx        # Base button component
│   ├── card.tsx          # Base card component
│   ├── input.tsx         # Base input component
│   ├── text.tsx          # Base text components
│   └── ...
├── molecules/            # Molecules (combinations of atoms)
│   ├── MenuItemCard.tsx  # Uses Card atom + other atoms
│   ├── ServiceCard.tsx   # Uses Card atom + other atoms
│   ├── SearchMolecule.tsx
│   └── ...
├── organisms/            # Organisms (complex UI sections)
│   ├── DiningOrganism.tsx
│   ├── ReservationsOrganism.tsx
│   └── ...
└── templates/            # Templates (page layouts)
    ├── GuestPageTemplate.tsx
    ├── ControlsPageTemplate.tsx
    └── ...
```

## Atomic Design Hierarchy

### 1. Atoms (UI Components)

**Location**: `app/components/ui/`

Atoms are the smallest building blocks - basic HTML elements with styling and behavior. They have no context and are purely presentational.

**Examples**:

- `Card` - Base card container with consistent styling
- `Button` - Reusable button with variants
- `Input` - Form input field
- `Text` - Typography components

**Key Principles**:

- No business logic
- Highly reusable
- Consistent styling
- Minimal props

### 2. Molecules (Functional Components)

**Location**: `app/components/molecules/`

Molecules combine atoms to create simple, reusable components with specific functionality.

**Examples**:

- `MenuItemCard` - Uses `Card` atom + `Button` atoms + business logic
- `ServiceCard` - Uses `Card` atom + icons + click handlers
- `SearchMolecule` - Uses `Input` atom + search icon

**Key Principles**:

- **MUST use atoms as building blocks**
- Contains simple business logic
- Reusable across different contexts
- Specific but not too complex

### 3. Organisms (Complex UI Sections)

**Location**: `app/components/organisms/`

Organisms combine molecules to create complex, page-specific UI sections.

**Examples**:

- `DiningOrganism` - Combines `MenuItemCard` molecules + search + filters
- `ReservationsOrganism` - Combines `ReservationCard` molecules + category filters

**Key Principles**:

- Uses molecules as building blocks
- Contains complex business logic
- Page-specific functionality
- Manages state and interactions

### 4. Templates (Page Layouts)

**Location**: `app/components/templates/`

Templates define the layout structure of pages, using organisms to create the skeleton.

**Examples**:

- `GuestPageTemplate` - Standard guest page layout
- `ControlsPageTemplate` - Controls page specific layout

**Key Principles**:

- Defines page structure
- Uses organisms for content areas
- No business logic
- Reusable across similar pages

### 5. Pages (Final Implementation)

**Location**: `app/pages/guest/`

Pages are templates filled with real data and specific business logic.

**Examples**:

- `DiningPage` - Uses `GuestPageTemplate` + `DiningOrganism`
- `ReservationsPage` - Uses `GuestPageTemplate` + `ReservationsOrganism`

## Proper Usage Examples

### ✅ Correct: Molecule Using Atom

```tsx
// molecules/MenuItemCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export const MenuItemCard = ({ item, onAddToCart }) => {
	return (
		<Card className="hover:shadow-2xl transition-all duration-500">
			<CardContent className="p-6">
				<CardHeader>
					<CardTitle>{item.name}</CardTitle>
				</CardHeader>
				{/* Business logic and interactions */}
				<button onClick={() => onAddToCart(item.id)}>Add to Cart</button>
			</CardContent>
		</Card>
	);
};
```

### ❌ Incorrect: Molecule Creating Custom Card

```tsx
// DON'T DO THIS
export const MenuItemCard = ({ item, onAddToCart }) => {
	return (
		<div className="bg-white rounded-3xl shadow-lg border border-slate-100">
			{/* Custom card styling - violates atomic design */}
		</div>
	);
};
```

### ✅ Correct: Organism Using Molecules

```tsx
// organisms/DiningOrganism.tsx
import { MenuItemCard } from "../molecules";
import { SearchMolecule } from "../molecules";

export const DiningOrganism = ({ items, onAddToCart }) => {
	return (
		<div>
			<SearchMolecule />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{items.map((item) => (
					<MenuItemCard key={item.id} item={item} onAddToCart={onAddToCart} />
				))}
			</div>
		</div>
	);
};
```

### ✅ Correct: Page Using Template + Organism

```tsx
// pages/guest/DiningPage.tsx
import { GuestPageTemplate } from "../../components/templates";
import { DiningOrganism } from "../../components/organisms";

export const DiningPage = () => {
	const [items, setItems] = useState([]);
	const [cart, setCart] = useState({});

	return (
		<GuestPageTemplate>
			<DiningOrganism items={items} onAddToCart={addToCart} />
		</GuestPageTemplate>
	);
};
```

## Data Flow

```
Pages → Templates → Organisms → Molecules → Atoms
   ↓         ↓          ↓          ↓         ↓
Business  Layout    Complex    Simple    Presentational
Logic     Structure  Logic      Logic     Only
```

## Benefits of This Structure

1. **Reusability**: Atoms and molecules can be used across different pages
2. **Consistency**: Base components ensure consistent styling
3. **Maintainability**: Changes to base components propagate automatically
4. **Scalability**: Easy to add new components following the pattern
5. **Testing**: Each layer can be tested independently

## Best Practices

### For Atoms (UI Components)

- Keep them simple and focused
- Use consistent naming conventions
- Provide sensible defaults
- Document all props

### For Molecules

- **Always use atoms as building blocks**
- Keep business logic simple
- Make them reusable but specific
- Use TypeScript interfaces for props

### For Organisms

- Combine multiple molecules
- Handle complex state management
- Be page-specific but reusable
- Use composition over inheritance

### For Templates

- Focus on layout structure
- Be flexible with content
- Don't include business logic
- Use consistent spacing and grid systems

## Migration Guide

If you have existing components that don't follow this pattern:

1. **Identify the base atoms** (buttons, cards, inputs, etc.)
2. **Extract them to the `ui/` directory**
3. **Refactor molecules to use these atoms**
4. **Update organisms to use molecules**
5. **Create templates for consistent layouts**

## Example: Refactoring a Custom Card

**Before** (violates atomic design):

```tsx
// molecules/CustomCard.tsx
export const CustomCard = ({ title, content }) => (
	<div className="bg-white rounded-2xl shadow-lg border p-6">
		<h3 className="text-lg font-bold">{title}</h3>
		<p>{content}</p>
	</div>
);
```

**After** (follows atomic design):

```tsx
// molecules/CustomCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const CustomCard = ({ title, content }) => (
	<Card>
		<CardContent>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<p>{content}</p>
		</CardContent>
	</Card>
);
```

This approach ensures consistency, reusability, and maintainability across the entire application.
