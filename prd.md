# **Product Requirements Document (PRD): Amorwealth Financial Calculators**

## **1\. Introduction**

* **Product Name:** Amorwealth  
* **Version:** 1.0  
* **Status:** Draft  
* **Objective:** To launch a financial planning platform that empowers users to make informed decisions through a suite of precise, user-friendly financial calculators. The platform will mirror the functional depth of the reference benchmark (1finance.co.in).  
* **Target Audience:** Retail investors, salaried employees, tax-payers, and individuals planning for retirement or debt management.

## **2\. Product Scope**

The primary scope is to develop a web-based platform hosting a specific set of financial calculators. These tools must provide instant, accurate, and graphical outputs based on user inputs.

## **3\. Calculator Modules**

Based on the reference analysis, the calculators will be divided into five core categories.

### **A. Income Tax Calculators**

*Focus: Tax efficiency and compliance.*

**1\. Old vs. New Tax Regime Calculator**

* **Purpose:** Helps users decide which tax regime is more beneficial based on their income and deductions.  
* **Inputs:** Gross Salary, Exemptions (HRA, LTA), Deductions (80C, 80D, 80CCD, etc.), Interest on Home Loan.  
* **Outputs:** Comparative tax liability under both regimes, tax saved, and a clear recommendation.

**2\. HRA (House Rent Allowance) Exemption Calculator**

* **Purpose:** Calculates the exact amount of HRA exempt from tax.  
* **Inputs:** Basic Salary, DA, HRA Received, Actual Rent Paid, City Type (Metro/Non-Metro).  
* **Outputs:** Exempt HRA amount and Taxable HRA amount.

**3\. Advance Tax Calculator**

* **Purpose:** Estimates tax liability to be paid in advance installments to avoid interest penalties (Section 234B/C).  
* **Inputs:** Estimated annual income from all sources (Salary, Capital Gains, Business, etc.), TDS deducted.  
* **Outputs:** Total tax liability and the schedule of installment payments (due dates and amounts).

**4\. Gratuity Calculator**

* **Purpose:** Estimates the gratuity amount a user is eligible to receive after 5+ years of service.  
* **Inputs:** Basic Salary \+ DA, Years of Service.  
* **Outputs:** Total Gratuity Payable.

### **B. Investment Calculators**

*Focus: Wealth creation and portfolio analysis.*

**5\. Mutual Fund Overlap Calculator**

* **Purpose:** Identifies overlapping stock holdings across multiple mutual fund schemes in a user’s portfolio to prevent over-diversification.  
* **Inputs:** Select up to 5 Mutual Fund schemes.  
* **Outputs:** Percentage of overlap between funds, common stock holdings, and a visual Venn diagram or matrix.

**6\. Step-Up SIP (Increasing Contribution) Calculator**

* **Purpose:** Shows the power of compounding when the SIP amount is increased annually.  
* **Inputs:** Initial Investment, Annual Step-up % (e.g., 10%), Expected Rate of Return, Tenure.  
* **Outputs:** Total Invested Amount, Wealth Gained, Final Corpus Value (compared to a standard SIP).

**7\. Mutual Fund Commission Analyser**

* **Purpose:** Calculates the "hidden" cost of investing in Regular plans vs. Direct plans.  
* **Inputs:** Investment amount, Tenure, Expense Ratio difference (Regular vs. Direct).  
* **Outputs:** Total commission paid over the tenure and the potential extra wealth if invested in Direct plans.

### **C. Loan & Debt Calculators**

*Focus: Debt reduction and interest optimization.*

**8\. Loan Prepayment Calculator**

* **Purpose:** Helps users decide whether to prepay a loan and how it affects tenure or EMI.  
* **Inputs:** Outstanding Principal, Interest Rate, Remaining Tenure, Prepayment Amount.  
* **Outputs:** Interest saved, Tenure reduced (months/years), and new closure date.

**9\. Floating Rate Loan Reset Calculator**

* **Purpose:** Analyzes the impact of interest rate changes (Repo rate hikes/cuts) on the loan.  
* **Inputs:** Current Principal, Old Rate, New Rate.  
* **Outputs:** Impact on EMI (increase/decrease) vs. Impact on Tenure (extension/reduction).

**10\. Loan Refinance Calculator**

* **Purpose:** Evaluates if switching a loan to a new lender with a lower rate is profitable after processing fees.  
* **Inputs:** Outstanding Principal, Current Rate, New Lender’s Rate, Processing Fees/Charges.  
* **Outputs:** Net savings (or loss) from refinancing and the Break-even period.

### **D. Insurance Calculators**

*Focus: Policy value analysis.*

**11\. Insurance Surrender Value Calculator**

* **Purpose:** Estimates the payout if a traditional endowment policy is surrendered before maturity.  
* **Inputs:** Policy Start Year, Premium Amount, Policy Term, Number of Premiums Paid, Sum Assured.  
* **Outputs:** Estimated Surrender Value (Guaranteed vs. Special Surrender Value).

**12\. Insurance Commission Analyser**

* **Purpose:** Estimates the commission agent earnings embedded in an insurance premium.  
* **Inputs:** Policy Type, Annual Premium, Policy Term.  
* **Outputs:** Estimated commission paid to the agent over the policy life.

### **E. Retirement Calculators**

*Focus: Long-term corpus planning.*

**13\. Retirement Corpus Calculator**

* **Purpose:** Determines the nest egg required to maintain current lifestyle post-retirement.  
* **Inputs:** Current Age, Retirement Age, Current Monthly Expenses, Inflation Rate, Life Expectancy.  
* **Outputs:** Total Corpus Required at Retirement and the Monthly Savings required to reach it.

**14\. NPS (National Pension System) Calculator**

* **Purpose:** Projects the pension and lump sum corpus from NPS investments.  
* **Inputs:** Current Age, Contribution Amount, Expected Return on Investment (ROI).  
* **Outputs:** Total Corpus at age 60, Lump sum amount (60%), and Monthly Pension Annuity amount (40%).

## **4\. Functional Requirements**

### **4.1 User Interface (UI)**

* **Input Method:** Sliders for quick adjustments and text fields for precise entry.  
* **Visualization:** All calculators must generate dynamic charts (Pie charts for breakdown, Line graphs for growth over time).  
* **Call to Action (CTA):** Each result page should have a "Talk to an Expert" or "Get a Plan" button to convert users.

### **4.2 Technical & Backend**

* **Logic formulas:** Must use standard Indian financial formulas (e.g., reducing balance method for loans, compounding formulas for SIPs).  
* **Data Updates:** Tax slabs (Old vs. New) must be updated annually as per the Union Budget.  
* **Responsiveness:** The layout must be fully responsive (Mobile-first design) as many users will access via smartphones.

### **4.3 Third-Party Dependencies**

* **Mutual Fund Data API:** For the "Overlap Calculator," you will need an API (like AMFI or Morningstar) to fetch real-time portfolio holdings of mutual funds.

## **5\. Non-Functional Requirements**

* **Performance:** Calculator results should load in under 1 second.  
* **Privacy:** No user data entered in the calculators should be stored permanently unless the user logs in or explicitly saves it.  
* **SEO:** Each calculator should have its own dedicated URL (e.g., amorwealth.com/calculators/loan-prepayment) with SEO-rich content descriptions below the tool.