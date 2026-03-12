## AI DESIGN AUDIT PROMPT

You are acting as a Chief Design Officer performing a platform-level UX audit.

Use the rules and standards in this document to review the interface and identify design issues.

## Layout Preservation Rule

The existing layout structure of the platform is considered correct.

This audit must not:

• change page layouts
• restructure grids
• move major sections
• alter column structures

All recommendations must work within the existing layout system.

When auditing UI components:

1. Evaluate visual hierarchy.
2. Check spacing consistency.
3. Validate typography hierarchy.
4. Identify inconsistent components.
5. Identify unclear navigation or interactions.
6. Suggest improvements aligned with Apple, Stripe, and Linear design standards.

Focus on:

• clarity  
• minimalism  
• interaction feedback  
• usability  
• accessibility  
• product polish  

Your output should include:

1. Identified UI issues
2. Suggested improvements
3. Priority level (High / Medium / Low)
4. Recommended design changes

Do not redesign the product. Focus on identifying improvements and validating the interface.


# Platform UI/UX Audit
### Apple + Stripe + Linear Level Product Design Review

Author: Internal Design Audit  
Scope: Full platform interface and interaction system  
Goal: Achieve premium product clarity, consistency, and usability comparable to Apple, Stripe Dashboard, and Linear.

---

# Executive Summary

This audit evaluates the platform’s design system, interface patterns, usability, and interaction behavior.

The objective is to validate whether the platform meets premium SaaS product standards in:

- Visual hierarchy
- Layout consistency
- Spacing rhythm
- Interaction clarity
- Component consistency
- Accessibility
- Product feel

Overall the platform demonstrates a strong structural foundation including modular card layouts and a clear dashboard structure.

However several improvements are required to reach a Stripe / Linear / Apple-grade interface quality.

Key improvement areas:

1. Interaction feedback
2. Spacing system standardization
3. Component consistency
4. Information hierarchy clarity
5. Tab and navigation clarity
6. Motion and micro-interactions

---

# Visual Hierarchy

Users should understand the purpose of a page in under **2 seconds**.

Hierarchy should follow this pattern:

Page Title  
Section Title  
Card Title  
Primary Content  
Metadata

Issues to validate:

- Titles visually competing with card content
- Metrics not emphasized enough
- Too many elements using accent color
- Important actions not visually dominant

---

# Layout System

# Layout Validation

The current platform layout structure is considered valid and should remain unchanged.

This audit does not recommend restructuring page layouts, grid systems, or card placement.

Instead, the layout should be validated against the following criteria:

• Primary content appears first in the visual hierarchy  
• Secondary controls appear in supporting positions  
• Content does not feel cramped or overly sparse  
• Cards align cleanly within the existing layout  
• Column spacing remains visually balanced

Example of correct hierarchy:

Finance Activity | Payout Schedule  
                 | Finance Controls

The goal of this audit is to **refine the interface within the existing layout**, not redesign it.
----

# Spacing Audit

Adopt a strict spacing scale.

4px  
8px  
12px  
16px  
24px  
32px  
40px  
48px  
64px

Card spacing should follow:

Card padding: 24px  
Card gap: 24px  
Subcard gap: 16px  
Text spacing: 8px  
Section gap: 32px

Spacing inconsistencies should be corrected across all screens.

---

# Typography

Typography hierarchy should remain consistent.

Page Title  
32px semibold

Section Title  
20px semibold

Card Title  
16px semibold

Body Text  
14px regular

Metadata  
12px medium

Typography should prioritize readability over stylistic variation.

---

# Color Usage

Primary accent color should be used sparingly.

Recommended uses:

- Primary buttons
- Active navigation elements
- Icons
- Highlighted metrics

Avoid using accent colors for large background surfaces.

Neutral palette should dominate the UI.

---

# Card System

Cards are the core UI primitive.

Standard Card:

Border radius: 28px  
Padding: 24px  
Border: gray-200  
Shadow: subtle

Subcards:

Radius: 20–24px  
Padding: 16px  
Border: gray-200  
Spacing between subcards: 16px

---

# Tables

Tables must prioritize readability.

Row height: minimum 48px

Numeric columns should be right aligned.

Add row hover state:

Background: gray-50

---

# Interaction Design

Every interactive component must support:

Hover  
Active  
Focus  
Disabled  
Loading

Buttons should visually respond to user interaction.

Hover duration should remain between 120–150ms.

---

# Motion

Motion should feel fast and calm.

Recommended durations:

Micro interactions: 120ms  
Hover transitions: 150ms  
Modal entry: 200ms

Animations should never slow down task completion.

---

# Information Architecture

Users should instantly understand:

Where they are  
What actions they can perform  
What happens next

Navigation should follow a consistent structure.

Example:

Dashboard  
Events  
Orders  
Finance  
Marketing  
Settings

---

# Accessibility

Minimum accessibility requirements:

WCAG AA contrast compliance  
Keyboard navigation support  
Visible focus states

Accessibility should not be treated as optional.

---

# Final Assessment

Design maturity score:

8 / 10

Strengths:

- Clean dashboard architecture
- Strong card system
- Good whitespace usage
- Clear financial data layout

Areas to improve:

- Interaction clarity
- Spacing consistency
- Component state feedback

With these improvements the platform can reach Stripe / Linear grade design quality.

---

End of Audit