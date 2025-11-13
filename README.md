# Aivira - AI-Powered Grant Automation Platform

Aivira automates the entire grant process for Singapore SMEs. Match grants in minutes, auto-draft proposals, and track compliance in real-time.

## Features

- **AI-Powered Grant Matching** - Match your business to eligible grants in under 5 minutes
- **Automated Proposal Generation** - AI-drafted custom grant proposals
- **Real-Time Compliance Tracking** - Automated deadline reminders and compliance checks

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd AiviraLanding
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Tech Stack

- **Frontend**: Next.js 13 (App Router), React 18, TypeScript
- **Styling**: TailwindCSS, shadcn/ui components
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure

```
├── app/                    # Next.js app router pages
│   ├── feasibility-checker/ # Grant feasibility checker (WIP)
│   ├── pilot-program/      # Pilot program page
│   └── ...
├── components/             # Reusable UI components
│   ├── ui/                # shadcn/ui components
│   └── navbar.tsx         # Navigation component
├── lib/                   # Utility functions
│   └── constants.ts       # App constants
```

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Run linting: `pnpm lint`
4. Commit with conventional commits: `git commit -m "feat: add new feature"`
5. Push and create a pull request

## License

Private - All rights reserved 