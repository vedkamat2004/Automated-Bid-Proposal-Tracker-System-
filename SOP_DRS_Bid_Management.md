# Standard Operating Procedures (SOP)
## DRS Analyst - Bid & Proposal Management

**Document Version:** 1.0  
**Last Updated:** December 2025  
**Applicable To:** DRS Analysts, Proposal Coordinators, Bid Managers  
**Purpose:** Standardized procedures for managing bids and proposals using ABPTS

---

## Table of Contents

1. [System Access & Setup](#1-system-access--setup)
2. [Daily Operations](#2-daily-operations)
3. [Opportunity Management](#3-opportunity-management)
4. [Compliance Tracking](#4-compliance-tracking)
5. [Document Management](#5-document-management)
6. [Reporting Procedures](#6-reporting-procedures)
7. [Error Handling](#7-error-handling)
8. [Best Practices](#8-best-practices)
9. [Workflow Diagrams](#9-workflow-diagrams)

---

## 1. System Access & Setup

### 1.1 Initial Access

**Steps:**
1. Navigate to system URL: `https://proposalflow-1.preview.emergentagent.com/`
2. System automatically loads Dashboard view
3. Verify data is loading correctly (check statistics cards)

**Verification:**
- [ ] Dashboard displays current statistics
- [ ] Navigation sidebar is visible
- [ ] All menu items are accessible

### 1.2 Navigation Overview

**Primary Navigation (Sidebar):**
- **Dashboard** - Executive overview and KPIs
- **Bid Tracker** - Main opportunity management
- **Reports** - Analytics and export functions

**Secondary Navigation:**
- From Bid Tracker → Opportunity Detail → Compliance Checker
- From Bid Tracker → Opportunity Detail → Document Manager

---

## 2. Daily Operations

### 2.1 Morning Routine (8:00 AM - 8:30 AM)

**Procedure:**

1. **Access Dashboard**
   - Click "Dashboard" in sidebar
   - Review "Urgent Deadlines" alert box
   - Note count of opportunities < 48 hours

2. **Check Key Metrics**
   - Total Opportunities: Track overall pipeline
   - Win Rate: Monitor success trends
   - Avg Compliance: Ensure > 80%
   - Urgent Deadlines: Prioritize daily work

3. **Review Charts**
   - Status Distribution: Identify bottlenecks
   - Opportunities by Status: Check pipeline balance

4. **Identify Priorities**
   - Sort opportunities by deadline
   - Flag any red (< 24h) or yellow (< 48h) deadlines
   - Create priority list for the day

**Expected Time:** 15-20 minutes

---

### 2.2 Opportunity Status Updates (Throughout Day)

**Procedure:**

1. **Navigate to Bid Tracker**
   - Click "Bid Tracker" in sidebar
   - Use search/filter to find specific opportunity

2. **Update Status**
   - Click Edit icon (pencil) next to opportunity
   - Update relevant fields:
     - Status (if milestone reached)
     - Compliance % (if review completed)
     - Notes in appropriate section
   - Click "Update" to save

3. **Verify Update**
   - Check that table reflects changes
   - Confirm compliance bar updates
   - Verify deadline coloring is correct

**Frequency:** As events occur (minimum 2x daily)

---

### 2.3 End-of-Day Review (5:00 PM - 5:30 PM)

**Procedure:**

1. **Status Verification**
   - Review all opportunities worked on today
   - Ensure all updates are saved
   - Check for any missed deadlines

2. **Tomorrow's Planning**
   - Review next day's deadlines
   - Prepare materials for upcoming submissions
   - Flag any blockers to management

3. **Quick Metrics Check**
   - Return to Dashboard
   - Screenshot statistics for daily log (optional)
   - Note any significant changes

**Expected Time:** 15-20 minutes

---

## 3. Opportunity Management

### 3.1 Creating New Opportunity

**When to Use:** New RFP received

**Procedure:**

1. **Access Creation Form**
   - Navigate to Bid Tracker
   - Click "Add Opportunity" button (top right)

2. **Enter Required Information** (marked with *)
   - **Client Name:** Full legal name from RFP
   - **Project Type:** Brief description (e.g., "Cloud Migration")
   - **RFP Release Date:** Date RFP was published
   - **Submission Deadline:** Date AND time from RFP
   - **Proposal Owner:** Assigned team lead
   - **Status:** Set to "Drafting" initially
   - **Compliance %:** Start at 0%
   - **Priority Level:** High/Medium/Low based on:
     - Budget size
     - Client importance
     - Strategic fit
   - **Submission Format:** Portal/Email/Hybrid

3. **Enter Optional Information**
   - **Industry:** Sector classification
   - **Budget:** Estimated or stated budget
   - **Portal Link:** URL to submission portal
   - **Risk Flags:** Any identified concerns

4. **Save and Verify**
   - Click "Create" button
   - Verify opportunity appears in tracker
   - Confirm all data is correct

**Common Mistakes to Avoid:**
- ❌ Using nickname instead of legal client name
- ❌ Missing time component of deadline
- ❌ Incorrect priority assessment
- ❌ Forgetting to add portal link

---

### 3.2 Updating Opportunity Status

**Status Workflow:**
```
Drafting → Review → Approved → Submitted → Won/Lost
```

**Procedure for Each Status:**

#### Drafting → Review
**Trigger:** Initial draft complete  
**Actions:**
1. Update status to "Review"
2. Set compliance to actual %
3. Add note: "Draft completed on [date]"
4. Notify reviewers (external to system)

#### Review → Approved
**Trigger:** All reviews complete, no major issues  
**Actions:**
1. Update status to "Approved"
2. Compliance should be 85%+
3. Add note: "Approved by [name] on [date]"
4. Verify all documents uploaded

#### Approved → Submitted
**Trigger:** Proposal submitted to client  
**Actions:**
1. Update status to "Submitted"
2. Set compliance to final %
3. Add note: "Submitted on [date] at [time] via [method]"
4. Upload submission confirmation

#### Submitted → Won/Lost
**Trigger:** Client decision received  
**Actions:**
1. Update status to "Won" or "Lost"
2. Add note: "Decision received on [date] - [reason]"
3. Update activity log with lessons learned

---

### 3.3 Editing Existing Opportunity

**When to Use:** 
- Deadline extended
- New information available
- Correction needed

**Procedure:**

1. **Locate Opportunity**
   - Use search bar or scroll in tracker
   - Click Edit icon (pencil)

2. **Make Changes**
   - Update only necessary fields
   - Add explanation in notes if significant change
   - Verify no typos introduced

3. **Save and Communicate**
   - Click "Update"
   - Inform team if deadline or priority changed
   - Update related compliance items if needed

---

### 3.4 Deleting Opportunity

**When to Use:**
- Duplicate entry
- RFP cancelled by client
- Test entry created in error

**Procedure:**

1. **Verify Deletion Justified**
   - Check with supervisor if unsure
   - Confirm no related documents needed
   - Verify not part of current reporting

2. **Delete**
   - Click Delete icon (trash)
   - Confirm deletion in popup
   - Verify removal from tracker

**⚠️ Warning:** Deletion is permanent. For cancelled RFPs, consider changing status to "Lost" instead for reporting purposes.

---

## 4. Compliance Tracking

### 4.1 Starting Compliance Check

**When to Use:** RFP received with requirements list

**Procedure:**

1. **Access Compliance Checker**
   - Navigate to Bid Tracker
   - Click View icon (eye) next to opportunity
   - Click "Compliance Checker" button

2. **Review Compliance Matrix**
   - Check current compliance rate
   - Note number of total requirements
   - Identify pending items

---

### 4.2 Adding Compliance Requirements

**Procedure:**

1. **Click "Add Requirement"**

2. **Enter Requirement Details**
   - **Requirement:** Copy exact text from RFP
     - Example: "Must have ISO 27001 certification"
   - **Status:** 
     - Pending: Not yet addressed
     - Compliant: Requirement met
     - Non-Compliant: Cannot meet requirement
   - **Assigned To:** Team member responsible
   - **Notes:** Additional context, references, or concerns

3. **Save Requirement**
   - Click "Add Requirement"
   - Verify appears in compliance matrix

**Best Practices:**
- Break complex requirements into individual items
- Use exact RFP language for traceability
- Assign specific team members
- Update status as soon as verified

---

### 4.3 Updating Compliance Status

**Procedure:**

1. **Review Requirement**
   - Read requirement text
   - Check if met in current proposal draft
   - Verify evidence available

2. **Update Status**
   - Change from Pending to Compliant/Non-Compliant
   - Add notes explaining how requirement is met
   - Attach reference to supporting document

3. **Monitor Compliance Rate**
   - Check overall % after update
   - Target: 90%+ before submission
   - Flag issues if < 80%

---

### 4.4 Compliance Gap Analysis

**When to Use:** Before final submission

**Procedure:**

1. **Filter Non-Compliant Items**
   - Review all items marked "Non-Compliant"
   - Review all items still "Pending"

2. **Assess Impact**
   - Mandatory vs. preferred requirements
   - Point deductions for non-compliance
   - Competitive advantage if compliant

3. **Create Action Plan**
   - List what can be done before deadline
   - Estimate effort required
   - Assign urgent tasks

4. **Document Justification**
   - For items that cannot be met
   - Add notes explaining:
     - Why non-compliant
     - Alternative offered
     - Plan to achieve compliance

---

## 5. Document Management

### 5.1 Understanding Version Control

**Naming Convention:**
- System automatically assigns: V1, V2, V3...
- Based on document name matching
- Example: "Technical Proposal" → V1, V2, V3

**Categories:**
- **Proposal:** Main proposal documents
- **Annexures:** Supporting materials, appendices
- **Financials:** Pricing, cost breakdowns
- **Compliance:** Certificates, registrations
- **Supporting:** Any other relevant docs

---

### 5.2 Adding Document

**Procedure:**

1. **Navigate to Document Manager**
   - From Opportunity Detail → "Document Manager"

2. **Click "Add Document"**

3. **Enter Document Information**
   - **Document Name:** Descriptive name
     - Good: "Technical Proposal"
     - Bad: "Doc1" or "Final"
   - **Category:** Select appropriate category
   - **Uploaded By:** Your name

4. **Save**
   - System auto-assigns version number
   - Verify document appears in correct category

**Notes:**
- Actual file upload not implemented (metadata only)
- For real implementation, would integrate with cloud storage
- Current system tracks document versions for audit trail

---

### 5.3 Version Control Best Practices

**Guidelines:**

1. **Consistent Naming**
   - Use same name for all versions of a document
   - Don't include version in name (system handles)
   - Use descriptive, professional names

2. **When to Create New Version**
   - Major edits (e.g., after review)
   - Before submitting to different reviewer
   - After incorporating feedback
   - NOT for minor typo fixes

3. **Version Tracking**
   - V1: Initial draft
   - V2: After internal review
   - V3: After senior review
   - V4: After client Q&A
   - V5: Final submission version

4. **Deletion Policy**
   - Keep all versions until submission
   - After win/loss, archive per company policy
   - Never delete V1 (audit trail)

---

### 5.4 Category Management

**Rules for Each Category:**

**Proposal:**
- Technical proposal
- Executive summary
- Cover letter
- Company profile

**Annexures:**
- Team CVs
- Case studies
- Reference letters
- Methodology details

**Financials:**
- Price proposal
- Cost breakdown
- Payment schedule
- T&C documents

**Compliance:**
- Certificates (ISO, etc.)
- Insurance documents
- Registration papers
- Legal documents

**Supporting:**
- Presentations
- Videos
- Supplementary materials

---

## 6. Reporting Procedures

### 6.1 Weekly Report Generation

**Schedule:** Every Friday at 3:00 PM

**Procedure:**

1. **Navigate to Reports**
   - Click "Reports" in sidebar

2. **Review Data**
   - Verify statistics are current
   - Check urgent action items
   - Review compliance analysis

3. **Generate PDF Report**
   - Click "Generate PDF Report"
   - Wait for download
   - Review report for accuracy

4. **Customize if Needed**
   - Add executive summary (manual)
   - Highlight key issues
   - Include recommendations

5. **Distribute**
   - Email to stakeholders
   - File in shared drive
   - Keep copy for records

**Expected Time:** 20-30 minutes

---

### 6.2 Excel Data Export

**When to Use:**
- Monthly analysis required
- Custom reporting needed
- Data for external tools

**Procedure:**

1. **Export Data**
   - Navigate to Reports
   - Click "Export to Excel"
   - Save file with date

2. **Verify Export**
   - Open Excel file
   - Check both sheets (Opportunities, Statistics)
   - Verify data completeness

3. **Further Analysis**
   - Use pivot tables
   - Create custom charts
   - Filter/sort as needed

---

### 6.3 Custom Reporting

**Ad-Hoc Report Requests:**

**Common Requests:**
- "Show all high-priority opportunities"
- "What's our win rate by industry?"
- "Which opportunities are behind schedule?"

**Procedure:**
1. Export to Excel
2. Apply filters
3. Create visualizations
4. Present findings

---

## 7. Error Handling

### 7.1 Common Issues & Solutions

#### Issue: Opportunity Not Saving

**Symptoms:** Form doesn't submit, error message

**Solution:**
1. Check all required fields filled (marked with *)
2. Verify date format is correct
3. Ensure deadline is future date
4. Try refreshing page and re-entering

---

#### Issue: Compliance % Not Updating

**Symptoms:** Percentage doesn't change after status update

**Solution:**
1. Refresh page
2. Verify all items saved
3. Check calculation: (Compliant items / Total items) × 100

---

#### Issue: Document Not Appearing

**Symptoms:** Document added but not visible

**Solution:**
1. Check correct opportunity selected
2. Verify category filter
3. Refresh page
4. Try adding again with different name

---

#### Issue: Report Export Failing

**Symptoms:** PDF/Excel doesn't download

**Solution:**
1. Check browser popup blocker
2. Verify data loaded on Reports page
3. Try different browser
4. Check file download location

---

### 7.2 Escalation Process

**Level 1 - Self-Solve:**
- Check this SOP
- Review error message
- Verify data entry
- Try alternative approach

**Level 2 - Team Lead:**
- If issue persists > 30 minutes
- If data corruption suspected
- If system-wide issue

**Level 3 - IT Support:**
- If technical failure
- If database issue
- If security concern

---

## 8. Best Practices

### 8.1 Data Quality

**Guidelines:**

1. **Accuracy**
   - Double-check all dates
   - Verify client names (legal entity)
   - Confirm budget figures
   - Test portal links

2. **Completeness**
   - Fill all available fields
   - Add notes for context
   - Update regularly
   - Don't leave stale data

3. **Consistency**
   - Use standard abbreviations
   - Follow naming conventions
   - Maintain categories
   - Update status promptly

---

### 8.2 Time Management

**Daily Schedule:**

- **8:00-8:30 AM:** Dashboard review
- **8:30-10:00 AM:** Urgent opportunities
- **10:00-12:00 PM:** Compliance checks
- **12:00-1:00 PM:** Lunch
- **1:00-3:00 PM:** Document updates
- **3:00-4:30 PM:** Status updates
- **4:30-5:00 PM:** Next day planning

---

### 8.3 Communication

**Stakeholder Updates:**

- **Daily:** Urgent issues only
- **Weekly:** Status report
- **Monthly:** Full analytics

**Team Coordination:**

- Use activity log for tracking
- Update notes in opportunities
- Flag blockers immediately
- Share lessons learned

---

### 8.4 Security & Compliance

**Guidelines:**

1. **Data Protection**
   - No client data in personal devices
   - Use secure connections only
   - Log out when away
   - Report breaches immediately

2. **Audit Trail**
   - Keep all versions
   - Document decisions
   - Track status changes
   - Save communications

3. **Confidentiality**
   - No screenshots of sensitive data
   - No sharing login credentials
   - Follow NDA requirements
   - Secure all exports

---

## 9. Workflow Diagrams

### 9.1 Opportunity Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│                     RFP RECEIVED                            │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
         ┌────────────────────────┐
         │   CREATE OPPORTUNITY   │
         │   - Enter details      │
         │   - Set priority       │
         │   - Assign owner       │
         └────────┬───────────────┘
                  │
                  ▼
         ┌────────────────────────┐
         │   STATUS: DRAFTING     │
         │   - Add compliance     │
         │   - Upload documents   │
         │   - Track progress     │
         └────────┬───────────────┘
                  │
                  ▼
         ┌────────────────────────┐
         │   STATUS: REVIEW       │
         │   - Review compliance  │
         │   - Check documents    │
         │   - Get approvals      │
         └────────┬───────────────┘
                  │
                  ▼
         ┌────────────────────────┐
         │   STATUS: APPROVED     │
         │   - Final checks       │
         │   - Prepare submission │
         │   - Confirm details    │
         └────────┬───────────────┘
                  │
                  ▼
         ┌────────────────────────┐
         │   STATUS: SUBMITTED    │
         │   - Await decision     │
         │   - Track follow-ups   │
         │   - Update notes       │
         └────────┬───────────────┘
                  │
         ┌────────┴────────┐
         │                 │
         ▼                 ▼
┌────────────────┐  ┌────────────────┐
│  STATUS: WON   │  │  STATUS: LOST  │
│  - Celebrate!  │  │  - Learn       │
│  - Document    │  │  - Improve     │
└────────────────┘  └────────────────┘
```

---

### 9.2 Daily Workflow

```
START OF DAY
     │
     ▼
[Dashboard Review]
     │
     ├──[Check Urgent Deadlines] ──> [Create Priority List]
     │
     ├──[Review KPIs] ──> [Note Trends]
     │
     └──[Check Alerts] ──> [Flag Issues]
     │
     ▼
WORK ON PRIORITIES
     │
     ├──[Update Opportunities]
     │   │
     │   ├──> Edit status
     │   ├──> Update compliance
     │   └──> Add notes
     │
     ├──[Compliance Checks]
     │   │
     │   ├──> Add requirements
     │   ├──> Update status
     │   └──> Run gap analysis
     │
     ├──[Document Management]
     │   │
     │   ├──> Upload versions
     │   └──> Organize categories
     │
     └──[Team Coordination]
         │
         └──> Update activity log
     │
     ▼
END OF DAY
     │
     ├──[Verify Updates Saved]
     │
     ├──[Plan Tomorrow]
     │
     └──[Report Issues]
     │
     ▼
DONE
```

---

### 9.3 Compliance Checking Process

```
                    ┌─────────────────────┐
                    │  RFP REQUIREMENTS   │
                    │  DOCUMENT RECEIVED  │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  EXTRACT EACH       │
                    │  REQUIREMENT        │
                    └──────────┬──────────┘
                               │
                               ▼
            ┌──────────────────┴──────────────────┐
            │                                     │
            ▼                                     ▼
    ┌──────────────┐                    ┌──────────────┐
    │  MANDATORY   │                    │  PREFERRED   │
    │  REQUIREMENT │                    │  REQUIREMENT │
    └──────┬───────┘                    └──────┬───────┘
           │                                    │
           │     [Add to Compliance Matrix]     │
           │                                    │
           └────────────┬───────────────────────┘
                        │
                        ▼
             ┌──────────────────────┐
             │  ASSIGN TO TEAM      │
             │  MEMBER              │
             └──────────┬───────────┘
                        │
                        ▼
             ┌──────────────────────┐
             │  TEAM INVESTIGATES   │
             │  COMPLIANCE          │
             └──────────┬───────────┘
                        │
         ┌──────────────┼──────────────┐
         │              │              │
         ▼              ▼              ▼
    ┌────────┐    ┌─────────┐    ┌────────────┐
    │ YES    │    │ PARTIAL │    │ NO         │
    │ (100%) │    │ (50%)   │    │ (0%)       │
    └───┬────┘    └────┬────┘    └─────┬──────┘
        │              │                │
        │              │                ▼
        │              │         ┌────────────┐
        │              │         │ DEVELOP    │
        │              │         │ MITIGATION │
        │              │         │ PLAN       │
        │              │         └─────┬──────┘
        │              │               │
        │              │               ▼
        │              │         ┌────────────┐
        │              │         │ DOCUMENT   │
        │              │         │ REASON     │
        │              │         └─────┬──────┘
        │              │               │
        └──────────────┴───────────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │  UPDATE STATUS IN    │
            │  COMPLIANCE MATRIX   │
            └──────────┬───────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │  CALCULATE OVERALL   │
            │  COMPLIANCE %        │
            └──────────┬───────────┘
                       │
                       ▼
                   [≥ 90%?]
                       │
         ┌─────────────┴─────────────┐
         │                           │
         ▼ YES                       ▼ NO
    ┌─────────┐              ┌─────────────┐
    │ READY   │              │ NEEDS MORE  │
    │ FOR     │              │ WORK        │
    │ REVIEW  │              │             │
    └─────────┘              └─────────────┘
```

---

## Appendix A: Quick Reference Card

### Daily Checklist
- [ ] Check Dashboard for alerts
- [ ] Update opportunity statuses
- [ ] Review urgent deadlines
- [ ] Update compliance items
- [ ] Upload document versions
- [ ] Log activities
- [ ] Plan next day

### Keyboard Shortcuts
(Note: Standard browser shortcuts apply)
- Ctrl + F: Search in page
- Ctrl + R: Refresh page
- Ctrl + Click: Open in new tab

### Contact Information
- **System Support:** [IT Helpdesk]
- **Process Questions:** [Team Lead]
- **Escalations:** [Manager]

---

## Appendix B: Naming Conventions

### Opportunity Names
- Use full legal client name
- Title case
- No abbreviations unless official

### Project Types
- Descriptive and concise
- Industry-standard terminology
- Max 50 characters

### Document Names
- Clear and professional
- No version numbers (auto-assigned)
- Use title case
- Examples:
  - "Technical Proposal"
  - "Financial Annexure"
  - "Compliance Certificate - ISO 27001"

---

## Appendix C: Troubleshooting Guide

| Problem | Solution |
|---------|----------|
| Page not loading | Refresh browser, clear cache |
| Data not saving | Check internet connection, retry |
| Wrong deadline color | Verify date format, check timezone |
| Export not working | Try different browser, check popups |
| Compliance % wrong | Recount items manually, refresh |
| Missing opportunities | Check filters, verify search terms |

---

**Document Control:**
- **Version:** 1.0
- **Approved By:** [Name]
- **Review Date:** Quarterly
- **Next Review:** March 2025

---

*This SOP is a living document and should be updated as processes evolve or system features change.*
