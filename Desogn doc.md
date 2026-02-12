# **Design System Document: Amorwealth**

## **1\. Design Philosophy**

* **Core Aesthetic:** Clean, Modern, Trustworthy.  
* **Visual Strategy:** "Mobile-First." The design prioritizes touch-friendly interfaces, distinct content cards, and clear data visualization, which scales up to desktop web views.  
* **Key Principle:** **"Input-Output Clarity."** Input fields are distinctly separated from result cards to ensure the user understands the cause-and-effect relationship of their financial data.

## **2\. Color Palette**

Based on the provided design screenshots, the color system defines the brand identity.

| Role | Color Name | Approx Hex | Usage |
| :---- | :---- | :---- | :---- |
| **Primary** | **Amorwealth Indigo** | \#4A55A2 | Top headers, primary "Calculate" buttons, active icons. |
| **Secondary** | **Soft Blue** | \#7885CB | Secondary buttons (e.g., "Share Result"), gradients. |
| **Background** | **Pale Slate** | \#F4F6F9 | App/Page background to create contrast with white cards. |
| **Surface** | **Pure White** | \#FFFFFF | Content cards, input containers. |
| **Accent 1** | **Growth Green** | \#4CAF50 | Positive results, "Interest" segments in charts. |
| **Accent 2** | **Alert Orange** | \#FF9800 | "Principal" segments, warnings, highlights. |
| **Text** | **Dark Charcoal** | \#333333 | Primary text, labels. |

## **3\. Typography**

* **Font Family:** **Inter** or **Roboto** (Clean, sans-serif, high legibility).  
* **Hierarchy:**  
  * **H1 (Page Titles):** 20px \- 24px, Bold, White (on Indigo header).  
  * **H2 (Card Headers):** 18px, Semi-Bold, Dark Charcoal.  
  * **Body Text:** 14px \- 16px, Regular, Grey.  
  * **Data Highlights:** 24px \- 32px, Bold, Indigo (for displaying EMI or Total amounts).

## **4\. UI Component Library**

### **A. Navigation & Header**

* **Style:** Solid Indigo background with curved bottom edges (optional aesthetic flair from reference).  
* **Elements:**  
  * "Hello, \[User\]" greeting.  
  * Profile/Menu icon on the top right.  
  * "Back" arrow for sub-pages.  
* **Search Bar:** Pill-shaped, white background with search icon, placed prominently on the Dashboard.

### **B. Input Fields (The Calculator Form)**

* **Structure:** Stacked vertical layout.  
* **Field Style:** Rounded rectangles (approx. 8px radius) with light grey borders.  
* **Unit Toggles:** Pill-shaped toggle switches inside or above fields (e.g., switching Tenure between "Months" and "Years").  
* **Sliders:** (Optional but recommended alongside text inputs) Interactive sliders colored in Primary Indigo.

### **C. Data Visualization (The Result Card)**

* **Chart Type:** **Double-Ring Donut Chart**.  
  * *Outer Ring:* Total value representation.  
  * *Inner Data:* Percentage displayed in the center.  
* **Legend:** Clear bullet points below the chart using the Accent colors (Orange/Green) to denote Principal vs. Interest.  
* **Comparison Columns:** For "Compare Loans," use side-by-side vertical columns to show Loan 1 vs. Loan 2 metrics.

### **D. Buttons & CTAs**

* **Primary Button:** Full width, rounded corners (pill shape or 12px radius), Indigo background, White text. Text: "Calculate", "Share Result".  
* **Secondary Button:** Outlined or lighter shade. Text: "Reset", "Save as".  
* **Category Icons:** Colorful square icons with rounded corners and soft drop shadows for the main dashboard grid.

## **5\. Screen Specifications (Mapping to PRD)**

### **Screen 1: The Dashboard (Home)**

* **Header:** User greeting \+ Notification bell.  
* **Search:** "Search Anything" bar for finding specific calculators.  
* **Categories Grid:** A 4-column or 3-column grid displaying icons for:  
  * *Loan/EMI Calculators*  
  * *SIP/Investment*  
  * *Tax Planning* (from PRD)  
  * *Retirement* (from PRD)  
* **Recent History:** A list view snippet showing the last 3 calculations.

### **Screen 2: Universal Calculator View (EMI / SIP / Tax)**

* **Top Section:** Input Form.  
  * Fields: Amount, Interest Rate, Tenure/Period.  
  * Processing Fee input (as seen in design).  
* **Action:** "Calculate" button.  
* **Bottom Section:** Result Card.  
  * Donut chart visualizing the breakdown.  
  * Key Metrics: Monthly EMI, Total Interest, Total Payment.  
  * Buttons: "Share Result" and "Save as".

### **Screen 3: Comparison View (Loan vs. Loan)**

* **Inputs:** Two distinct columns or tabs for "Loan 1" and "Loan 2".  
* **Result:** A split view showing:  
  * EMI Difference (e.g., "Difference: ₹325").  
  * Total Interest Difference.  
  * Visual indicator (Green text) showing which loan is cheaper.

### **Screen 4: History/Saved Calculations**

* **Layout:** Vertical list view.  
* **Card Item:**  
  * Date badge (Blue square on left).  
  * Title: Calculator Type (e.g., "Home Loan").  
  * Snippet: "Amount \- 20,000 (10.0%)".  
  * Swipe action to delete (standard mobile pattern).

## **6\. Responsive Adaptation (Mobile to Web)**

Since Amorwealth is a website, the design shown (Mobile App) must adapt to Desktop screens:

* **Mobile View:** Stacked layout (Header \-\> Inputs \-\> Button \-\> Results).  
* **Desktop View:** Split-screen layout.  
  * **Left Pane:** Input parameters and sliders.  
  * **Right Pane:** Sticky (fixed position) Result Card. As the user changes the input on the left, the charts on the right update in real-time.  
  * **Navigation:** The dashboard grid becomes a sidebar or a mega-menu on the top.