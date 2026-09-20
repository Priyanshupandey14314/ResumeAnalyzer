# Resume Matcher — Frontend

A modern Next.js (App Router, Tailwind CSS, Lucide React, Recharts) web application integrated with the Spring Boot Resume Matcher backend.

## Features

- **Landing Page**: Modern feature overview and application flow instructions.
- **Resume Upload & Analysis**: PDF drag-and-drop file upload and job description matching.
- **Results Dashboard**: Match percentage circular score gauge, missing skills badges, AI suggestions, and parsed text comparison.
- **Analysis History**: Overview of all past resume evaluations.
- **Stateless Authentication**: Embedded Sign In / Registration with JWT token persistence.

## Getting Started

1. **Install Dependencies** (if needed):
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```text
frontend/
├── app/
│   ├── analyze/
│   │   └── page.jsx      # Resume Analysis Workstation
│   ├── history/
│   │   └── page.jsx      # Past Evaluations History
│   ├── results/
│   │   └── page.jsx      # Match Results Dashboard
│   ├── globals.css       # Global styles & Tailwind imports
│   ├── layout.jsx        # Root Layout & Auth Provider Wrapper
│   └── page.jsx          # Landing Page
├── components/           # Reusable UI Components
├── context/
│   └── AuthContext.jsx   # React Context for JWT Auth State
├── lib/
│   └── utils.js          # Helper Functions & Parsers
├── services/
│   └── api.js            # Centralized Axios API Service
└── next.config.js        # API Proxy Rewrite Rules
```
