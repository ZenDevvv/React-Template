# 🧬 Atomic Design Implementation

This React template follows the **Atomic Design** methodology, organizing components into a hierarchical structure from smallest to largest building blocks.

## 📁 Directory Structure

```
components/
├── ui/                    # 🟢 Atoms (Basic building blocks)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── text.tsx
│   ├── icon-button.tsx
│   ├── nav-link.tsx
│   └── image.tsx
├── molecules/             # 🟡 Molecules (Simple combinations)
│   ├── MenuItemCard.tsx
│   ├── ServiceCard.tsx
│   ├── ReservationCard.tsx
│   ├── OrderCard.tsx
│   ├── VideoCard.tsx
│   ├── EventCard.tsx
│   ├── SearchMolecule.tsx
│   ├── CategoryFilterMolecule.tsx
│   └── index.ts
├── organisms/             # 🟠 Organisms (Complex UI sections)
│   ├── DiningOrganism.tsx
│   ├── ReservationsOrganism.tsx
│   ├── OperatorOrganism.tsx
│   ├── EntertainmentOrganism.tsx
│   ├── HomeMain.tsx
│   ├── HeroSection.tsx
│   ├── ACWidget.tsx
│   └── index.ts
├── templates/             # 🔵 Templates (Page layouts)
│   ├── GuestPageTemplate.tsx
│   ├── ControlsPageTemplate.tsx
│   ├── HomeTemplate.tsx
│   └── index.ts
└── layouts/               # 🟣 Layouts (App-wide layouts)
    └── (layout components)
```

## 🟢 Atoms (UI Components)

**Purpose**: Basic building blocks with no context on their own.

### Available Atoms:

- **Button** - Primary, secondary, outline variants
- **Card** - Basic card container with variants
- **Input** - Text fields, checkboxes, radio buttons
- **Text** - Headings, labels, captions
- **IconButton** - Buttons with icons
- **NavLink** - Navigation links
- **Image** - Icons, avatars, product images

### Usage:

```tsx
import { Button, Card, Input } from "../../components/ui";

<Button variant="primary">Click me</Button>
<Card className="p-4">Content</Card>
<Input placeholder="Enter text..." />
```

## 🟡 Molecules

**Purpose**: Simple groups of atoms that form reusable components.

### Card Molecules:

- **MenuItemCard** - Food items with cart functionality
- **ServiceCard** - Service items with icons and descriptions
- **ReservationCard** - Venue information with booking
- **OrderCard** - Order status and details
- **VideoCard** - Video information with play functionality
- **EventCard** - Event information and registration

### Utility Molecules:

- **SearchMolecule** - Search input with icon
- **CategoryFilterMolecule** - Category selection buttons

### Usage:

```tsx
import { MenuItemCard, SearchMolecule } from "../../components/molecules";

<MenuItemCard
  item={menuItem}
  cartQuantity={2}
  onAddToCart={handleAdd}
  onRemoveFromCart={handleRemove}
/>

<SearchMolecule
  placeholder="Search dishes..."
  value={searchQuery}
  onChange={setSearchQuery}
/>
```

## 🟠 Organisms

**Purpose**: Complex UI sections that combine molecules and atoms.

### Available Organisms:

- **DiningOrganism** - Complete dining page with sidebar, search, and food grid
- **ReservationsOrganism** - Complete reservations page with venue grid
- **OperatorOrganism** - Complete operator services page
- **EntertainmentOrganism** - Complete entertainment page with video player
- **HomeMain** - Home page main content
- **HeroSection** - Hero banner section
- **ACWidget** - Air conditioning control widget

### Usage:

```tsx
import { DiningOrganism } from "../../components/organisms";

<DiningOrganism
	items={menuItems}
	cart={cartState}
	selectedCategory="bowls"
	searchQuery=""
	onAddToCart={handleAdd}
	onRemoveFromCart={handleRemove}
	onCategoryChange={setCategory}
	onSearchChange={setSearch}
	totalItems={5}
/>;
```

## 🔵 Templates

**Purpose**: Page layouts that define the structure using organisms.

### Available Templates:

- **GuestPageTemplate** - Standard guest page layout with gradient background
- **ControlsPageTemplate** - Controls page layout with gray background
- **HomeTemplate** - Home page layout

### Usage:

```tsx
import { GuestPageTemplate } from "../../components/templates";

<GuestPageTemplate>
	<DiningOrganism {...props} />
</GuestPageTemplate>;
```

## 📄 Pages (Implementation)

**Purpose**: Templates filled with real data and content.

### Guest Pages:

- **DiningPage** - Uses `GuestPageTemplate` + `DiningOrganism`
- **ReservationsPage** - Uses `GuestPageTemplate` + `ReservationsOrganism`
- **OperatorPage** - Uses `GuestPageTemplate` + `OperatorOrganism`
- **EntertainmentPage** - Uses `GuestPageTemplate` + `EntertainmentOrganism`
- **ControlsPage** - Uses `ControlsPageTemplate` + control widgets
- **CartPage** - Shopping cart functionality
- **OrderStatusPage** - Order tracking

## 🔄 Data Flow

```
Pages → Templates → Organisms → Molecules → Atoms
   ↓         ↓          ↓          ↓         ↓
Real Data → Layout → UI Sections → Components → Basic Elements
```

## 📦 Shared Types

All card-related types are centralized in `types/cards.ts`:

```tsx
// Common interfaces
interface MenuItem {
	/* ... */
}
interface Service {
	/* ... */
}
interface ReservationType {
	/* ... */
}
interface Order {
	/* ... */
}
interface Video {
	/* ... */
}
```

## 🎯 Benefits

1. **Reusability** - Components can be used across different pages
2. **Maintainability** - Changes to atoms affect all instances
3. **Consistency** - Standardized design patterns
4. **Scalability** - Easy to add new components following the pattern
5. **Testing** - Each level can be tested independently

## 🚀 Best Practices

1. **Start with Atoms** - Build basic elements first
2. **Compose Molecules** - Combine atoms for simple functionality
3. **Create Organisms** - Build complex UI sections
4. **Define Templates** - Establish page layouts
5. **Implement Pages** - Add real data and content

## 📝 Example: Adding a New Feature

To add a new "Spa Services" page:

1. **Atoms**: Use existing UI components
2. **Molecules**: Create `SpaServiceCard` molecule
3. **Organisms**: Create `SpaServicesOrganism`
4. **Templates**: Use `GuestPageTemplate`
5. **Pages**: Create `SpaPage` with real data

```tsx
// 1. Create SpaServiceCard molecule
// 2. Create SpaServicesOrganism
// 3. Create SpaPage
import { GuestPageTemplate } from "../../components/templates";
import { SpaServicesOrganism } from "../../components/organisms";

export const SpaPage = () => (
	<GuestPageTemplate>
		<SpaServicesOrganism services={spaServices} />
	</GuestPageTemplate>
);
```

This structure ensures consistency, reusability, and maintainability across the entire application.
