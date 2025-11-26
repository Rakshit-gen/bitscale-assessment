# Bitscale Find People Component

A modern, responsive UI component for finding and filtering people data, built with Next.js 14, TypeScript, and Framer Motion.

![Bitscale Find People](./preview.png)

## ✨ Features

- **Advanced Filtering**: Filter by keyword, job title, company website, person/company location, headcount, and management level
- **Smooth Animations**: Polished micro-interactions using Framer Motion
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern Aesthetic**: Clean, refined UI with subtle glassmorphism effects
- **Quick Selection**: Pre-defined quick options for common filters
- **Tag System**: Easy-to-manage filter tags with add/remove functionality
- **Bulk Actions**: Select multiple results for export
- **Saved Searches**: Save and manage frequently used filter combinations
- **Credits Tracking**: Visual credit usage indicator

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bitscale-find-people.git
cd bitscale-find-people
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
bitscale-find-people/
├── app/
│   ├── globals.css      # Global styles with CSS variables
│   ├── layout.tsx       # Root layout with fonts
│   └── page.tsx         # Main page component
├── components/
│   ├── Header.tsx       # Header with credits & saved searches
│   ├── FilterSidebar.tsx # Filter panel with all sections
│   ├── ResultsTable.tsx # Results table with selection
│   └── index.ts         # Component exports
├── data/
│   └── mockData.ts      # Sample data for demonstration
├── types/
│   └── index.ts         # TypeScript interfaces
└── public/
    └── favicon.ico
```

## 🎨 Design Decisions

### Color Palette
- Primary: Emerald green (#10B981) for actions and accents
- Neutrals: Carefully crafted gray scale for text and backgrounds
- Semantic: Success, warning, error, and info states

### Typography
- Display: Outfit - Modern, geometric font for headings
- Body: DM Sans - Clean, readable font for content

### Interactions
- Expandable filter sections with smooth height animations
- Hover states on all interactive elements
- Loading states with skeleton animations
- Staggered row animations in results table

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy

Or use the Vercel CLI:
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

### Deploy to Firebase

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Initialize Firebase:
```bash
firebase init hosting
```

3. Build and deploy:
```bash
npm run build
firebase deploy
```

## 🛠️ Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Framer Motion** - Animation library
- **CSS Variables** - Theming and design tokens

## 📝 Creative Enhancements

Beyond the base Figma design, this implementation includes:

1. **Animated Loading State** - Smooth entrance animation when the app loads
2. **Ambient Background** - Subtle gradient mesh effect for depth
3. **Quick Selection Chips** - Pre-defined options for common filters
4. **Tag Management** - Visual tags for active filters with remove buttons
5. **Bulk Selection** - Select multiple results with export functionality
6. **Saved Searches** - Dropdown to save and load filter combinations
7. **Credits Display** - Visual indicator of remaining search credits
8. **Responsive Breakpoints** - Optimized layouts for all screen sizes
9. **Micro-interactions** - Hover effects, focus states, and transitions
10. **Empty States** - Friendly illustrations for no-results scenarios

## 📄 License

MIT License - feel free to use this for your own projects!

---

Built with ❤️ for Bitscale
# bitscale-assessment
