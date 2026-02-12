# Amorwealth Project To-Do List

## 📋 Project Overview
This document outlines the complete development roadmap for Amorwealth Financial Calculators platform based on the PRD, Tech Stack, and Design System specifications.

---

## 🎯 Phase 1: Project Setup & Infrastructure

### 1.1 Environment Setup
- [ ] Initialize Next.js 14+ project with TypeScript and App Router
- [ ] Configure Tailwind CSS with Amorwealth color palette
- [ ] Set up ESLint and Prettier for code formatting
- [ ] Configure absolute imports and path aliases
- [ ] Set up Git repository with proper .gitignore

### 1.2 Core Dependencies Installation
- [ ] Install Shadcn/ui or Mantine component library
- [ ] Install Zustand for state management
- [ ] Install Recharts for data visualization
- [ ] Install decimal.js for financial math precision
- [ ] Install Lucide React for icons
- [ ] Configure VSCode settings for consistent development

### 1.3 Project Structure Organization
```
src/
├── app/                    # Next.js App Router
├── components/
│   ├── ui/                # Base UI components
│   ├── calculators/       # Calculator-specific components
│   ├── charts/           # Chart components
│   └── layout/           # Layout components
├── lib/                   # Utilities and configs
├── hooks/                 # Custom React hooks
├── store/                 # Zustand stores
├── types/                 # TypeScript types
├── utils/                 # Helper functions
├── api/                   # API routes
└── data/                  # Static data (tax slabs, etc.)
```

---

## 🎨 Phase 2: Design System Implementation

### 2.1 Design Tokens & Theme Configuration
- [ ] Configure Tailwind with Amorwealth color palette
  - Primary: #4A55A2 (Amorwealth Indigo)
  - Secondary: #7885CB (Soft Blue)
  - Background: #F4F6F9 (Pale Slate)
  - Surface: #FFFFFF (Pure White)
  - Accent 1: #4CAF50 (Growth Green)
  - Accent 2: #FF9800 (Alert Orange)
  - Text: #333333 (Dark Charcoal)
- [ ] Set up Inter/Roboto font family
- [ ] Define typography hierarchy (H1, H2, Body, Data)
- [ ] Create rounded corners (8px radius for inputs, 12px for buttons)

### 2.2 Base UI Components
- [ ] Create Button components (Primary, Secondary, Outline)
- [ ] Create Input components with labels and validation
- [ ] Create Slider component (Primary Indigo)
- [ ] Create Toggle/Pill components for unit switching
- [ ] Create Card components for content containers
- [ ] Create Select/Dropdown components
- [ ] Create Table components for data display

### 2.3 Layout Components
- [ ] Create Header component (Indigo background, curved edges)
- [ ] Create Navigation/Sidebar (responsive)
- [ ] Create Footer component
- [ ] Create Search Bar component (Pill-shaped)
- [ ] Create Modal/Dialog components

### 2.4 Chart Components
- [ ] Create Double-Ring Donut Chart component
- [ ] Create Line Graph component for growth visualization
- [ ] Create Pie Chart component for breakdowns
- [ ] Create Bar Chart component for comparisons
- [ ] Make charts responsive for mobile and desktop

---

## 🔧 Phase 3: Calculator Development - Category A: Income Tax

### 3.1 Old vs New Tax Regime Calculator
- [ ] Design input form:
  - [ ] Gross Salary field
  - [ ] HRA exemption inputs
  - [ ] LTA exemption inputs
  - [ ] 80C, 80D, 80CCD deduction inputs
  - [ ] Home loan interest input
- [ ] Implement calculation logic
- [ ] Create comparison output:
  - [ ] Tax liability under both regimes
  - [ ] Tax saved amount
  - [ ] Recommendation display
- [ ] Integrate chart visualization
- [ ] Add "Talk to Expert" CTA

### 3.2 HRA Exemption Calculator
- [ ] Design input form:
  - [ ] Basic Salary + DA inputs
  - [ ] HRA Received field
  - [ ] Actual Rent Paid field
  - [ ] City Type selector (Metro/Non-Metro)
- [ ] Implement HRA exemption calculation logic
- [ ] Display Exempt HRA and Taxable HRA amounts

### 3.3 Advance Tax Calculator
- [ ] Design input form:
  - [ ] Income from Salary
  - [ ] Capital Gains income
  - [ ] Business income
  - [ ] TDS deducted input
- [ ] Implement advance tax calculation
- [ ] Create installment schedule display:
  - [ ] Due dates
  - [ ] Payment amounts
- [ ] Add interest penalty calculations (Section 234B/C)

### 3.4 Gratuity Calculator
- [ ] Design input form:
  - [ ] Basic Salary + DA
  - [ ] Years of Service
- [ ] Implement gratuity calculation logic (Section 4(3) of Gratuity Act)
- [ ] Display total gratuity payable

---

## 💰 Phase 4: Calculator Development - Category B: Investment

### 4.1 Mutual Fund Overlap Calculator
- [ ] Design multi-select interface for up to 5 funds
- [ ] Integrate Mutual Fund Data API (AMFI/Morningstar)
- [ ] Implement overlap calculation logic
- [ ] Create Venn diagram or matrix visualization
- [ ] Display common stock holdings with percentages

### 4.2 Step-Up SIP Calculator
- [ ] Design input form:
  - [ ] Initial Investment amount
  - [ ] Annual Step-up % (slider + input)
  - [ ] Expected Rate of Return
  - [ ] Investment Tenure
- [ ] Implement Step-Up SIP calculation
- [ ] Compare with standard SIP
- [ ] Visualize wealth growth over time (Line chart)

### 4.3 Mutual Fund Commission Analyser
- [ ] Design input form:
  - [ ] Investment amount
  - [ ] Tenure
  - [ ] Expense Ratio difference (Regular vs Direct)
- [ ] Calculate commission over tenure
- [ ] Display potential extra wealth in Direct plans
- [ ] Show long-term cost comparison

---

## 🏠 Phase 5: Calculator Development - Category C: Loan & Debt

### 5.1 Loan Prepayment Calculator
- [ ] Design input form:
  - [ ] Outstanding Principal
  - [ ] Interest Rate
  - [ ] Remaining Tenure
  - [ ] Prepayment Amount
- [ ] Implement prepayment calculation logic
- [ ] Calculate interest saved
- [ ] Show tenure reduction (months/years)
- [ ] Display new loan closure date

### 5.2 Floating Rate Loan Reset Calculator
- [ ] Design input form:
  - [ ] Current Principal
  - [ ] Old Rate
  - [ ] New Rate (Repo rate based)
- [ ] Calculate EMI impact (increase/decrease)
- [ ] Calculate tenure impact (extension/reduction)
- [ ] Show visual comparison

### 5.3 Loan Refinance Calculator
- [ ] Design input form:
  - [ ] Outstanding Principal
  - [ ] Current Interest Rate
  - [ ] New Lender's Rate
  - [ ] Processing Fees/Charges
- [ ] Calculate net savings/loss
- [ ] Determine break-even period
- [ ] Show refinancing recommendation

---

## 🛡️ Phase 6: Calculator Development - Category D: Insurance

### 6.1 Insurance Surrender Value Calculator
- [ ] Design input form:
  - [ ] Policy Start Year
  - [ ] Premium Amount
  - [ ] Policy Term
  - [ ] Number of Premiums Paid
  - [ ] Sum Assured
- [ ] Calculate Guaranteed Surrender Value Calculate Special Surrender
- [ ] Value
- [ ] Display estimated payout comparison

### 6.2 Insurance Commission Analyser
- [ ] Design input form:
  - [ ] Policy Type selector
  - [ ] Annual Premium
  - [ ] Policy Term
- [ ] Estimate agent commission over policy life
- [ ] Display commission breakdown by year

---

## 🏖️ Phase 7: Calculator Development - Category E: Retirement

### 7.1 Retirement Corpus Calculator
- [ ] Design input form:
  - [ ] Current Age
  - [ ] Retirement Age
  - [ ] Current Monthly Expenses
  - [ ] Inflation Rate
  - [ ] Life Expectancy
- [ ] Calculate total corpus required at retirement
- [ ] Calculate monthly savings needed
- [ ] Visualize corpus growth (Line chart)

### 7.2 NPS Calculator
- [ ] Design input form:
  - [ ] Current Age
  - [ ] Contribution Amount
  - [ ] Expected ROI
- [ ] Calculate total corpus at age 60
- [ ] Calculate Lump sum (60%)
- [ ] Calculate Monthly Pension (40%)
- [ ] Display annuity options

---

## 🔌 Phase 8: Backend & API Development

### 8.1 Next.js API Routes Setup
- [ ] Create calculator calculation endpoints
- [ ] Set up tax slab API endpoints
- [ ] Create Mutual Fund data API proxy
- [ ] Implement user history save/retrieve endpoints
- [ ] Set up authentication API routes (future)

### 8.2 Database Integration
- [ ] Set up Supabase project
- [ ] Create database schema:
  - [ ] Users table
  - [ ] Calculations history table
  - [ ] Saved calculations table
- [ ] Connect to Next.js API routes
- [ ] Implement data validation and sanitization

### 8.3 Headless CMS Setup (Sanity.io/Strapi)
- [ ] Configure CMS for blog content
- [ ] Create content schemas for calculator descriptions
- [ ] Set up SEO metadata structure
- [ ] Create API endpoints for content fetching

---

## 📱 Phase 9: Page Development

### 9.1 Dashboard/Home Page
- [ ] Implement Header with user greeting
- [ ] Create Search bar component
- [ ] Build Categories Grid (4-column layout)
- [ ] Add Recent History section
- [ ] Make responsive (Mobile-First → Desktop)

### 9.2 Calculator Pages (14 calculators)
- [ ] Create individual calculator routes:
  - [ ] /calculators/tax-regime
  - [ ] /calculators/hra-exemption
  - [ ] /calculators/advance-tax
  - [ ] /calculators/gratuity
  - [ ] /calculators/mutual-fund-overlap
  - [ ] /calculators/step-up-sip
  - [ ] /calculators/commission-analyser
  - [ ] /calculators/loan-prepayment
  - [ ] /calculators/floating-rate-reset
  - [ ] /calculators/loan-refinance
  - [ ] /calculators/insurance-surrender
  - [ ] /calculators/insurance-commission
  - [ ] /calculators/retirement-corpus
  - [ ] /calculators/nps

### 9.3 Comparison Views
- [ ] Implement Loan vs Loan comparison interface
- [ ] Create split view for EMI differences
- [ ] Add visual indicators (Green text for cheaper)

### 9.4 History/Saved Page
- [ ] Create vertical list view layout
- [ ] Implement date badge cards
- [ ] Add swipe-to-delete functionality
- [ ] Create save calculation feature

---

## 🔍 Phase 10: SEO & Content

### 10.1 SEO Optimization
- [ ] Set up dynamic metadata for each calculator
- [ ] Create SEO-rich content templates
- [ ] Implement Open Graph tags
- [ ] Set up JSON-LD structured data
- [ ] Create sitemap.xml
- [ ] Configure robots.txt

### 10.2 Educational Content (Below Calculators)
- [ ] Write calculator-specific content:
  - [ ] How to use guide
  - [ ] FAQs section
  - [ ] Related calculators links
- [ ] Integrate with CMS
- [ ] Add internal linking structure

---

## 📊 Phase 11: Analytics & Monitoring

### 11.1 Analytics Setup
- [ ] Install Google Analytics 4
- [ ] Set up conversion tracking for CTAs
- [ ] Configure event tracking for calculator usage
- [ ] Create dashboards for popular calculators

### 11.2 Performance Monitoring
- [ ] Set up PostHog (optional)
- [ ] Configure error tracking (Sentry)
- [ ] Monitor Core Web Vitals
- [ ] Set up performance alerts

---

## ✅ Phase 12: Testing & Quality Assurance

### 12.1 Unit Testing
- [ ] Write calculator logic tests (decimal.js precision)
- [ ] Test input validation
- [ ] Test edge cases (boundary values)
- [ ] Achieve 80%+ code coverage

### 12.2 Integration Testing
- [ ] Test API endpoints
- [ ] Test database connections
- [ ] Test CMS integration
- [ ] Test third-party API (Mutual Fund data)

### 12.3 UI/UX Testing
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Mobile device testing (iOS, Android)
- [ ] Accessibility testing (WCAG compliance)
- [ ] Performance testing (Load time < 1 second)

### 12.4 User Acceptance Testing
- [ ] Create test scenarios for each calculator
- [ ] Recruit beta testers
- [ ] Collect feedback and iterate
- [ ] Final sign-off

---

## 🚀 Phase 13: Deployment

### 13.1 Vercel Setup
- [ ] Connect GitHub repository to Vercel
- [ ] Configure environment variables
- [ ] Set up preview deployments
- [ ] Configure custom domain (amorwealth.com)
- [ ] Set up SSL certificate

### 13.2 Production Checklist
- [ ] Run final security audit
- [ ] Verify all environment variables
- [ ] Test production build locally
- [ ] Set up CI/CD pipeline
- [ ] Create backup strategy

---

## 📦 Future Enhancements (Phase 2+)

### Authentication & User Accounts
- [ ] Implement Google OAuth (Supabase)
- [ ] Create email/password authentication
- [ ] Build user profile management
- [ ] Set up password reset functionality

### PDF Reports
- [ ] Implement react-pdf for report generation
- [ ] Create professional PDF templates
- [ ] Add downloadable tax reports
- [ ] Enable investment portfolio PDFs

### Additional Calculators (Future)
- [ ] EPF Calculator
- [ ] SWP (Systematic Withdrawal Plan) Calculator
- [ ] Education/Child Marriage Savings Calculator
- [ ] Inflation Calculator
- [ ] CAGR Calculator

### Advanced Features
- [ ] Real-time market data integration
- [ ] Portfolio tracking
- [ ] Investment recommendations
- [ ] Chatbot integration for queries
- [ ] Multi-language support (Hindi + Regional languages)

---

## 📊 Task Summary

| Phase | Tasks | Priority | Category |
|-------|----------|-------|----------|
| 1 | Project Setup | 14 | High |
| 2 | Design System | 17 | High |
| 3 | Tax Calculators | 19 | High |
| 4 | Investment Calculators | 13 | High |
| 5 | Loan Calculators | 13 | High |
| 6 | Insurance Calculators | 10 | Medium |
| 7 | Retirement Calculators | 10 | Medium |
| 8 | Backend & API | 9 | High |
| 9 | Page Development | 22 | High |
| 10 | SEO & Content | 10 | High |
| 11 | Analytics | 8 | Medium |
| 12 | Testing | 18 | High |
| 13 | Deployment | 6 | High |

**Total Tasks: 169**

---

## 🎯 Immediate Next Steps

1. **Initialize Next.js project** with TypeScript and Tailwind
2. **Configure Design System** colors and typography
3. **Build Calculator Component Library** (shared inputs, sliders, cards)
4. **Start with EMI Calculator** (most common use case)
5. **Set up Vercel deployment** early for preview URLs

---

*Last Updated: Based on Tech Stack v1.0, PRD v1.0, Design System v1.0*
*Document Version: 1.0*

