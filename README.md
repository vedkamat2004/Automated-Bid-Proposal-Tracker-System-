# 🎯 ABPTS - Automated Bid & Proposal Tracker System

[![Status](https://img.shields.io/badge/Status-Production%20Ready-success)]()
[![Tech](https://img.shields.io/badge/Tech-React%20%7C%20FastAPI%20%7C%20MongoDB-blue)]()
[![Purpose](https://img.shields.io/badge/Purpose-Portfolio%20%2F%20DRS%20Analyst-orange)]()

> **A comprehensive web-based system demonstrating DRS (Deals & Risk Solutions) Analyst capabilities for professional consulting roles at firms like Deloitte.**

---

## 📋 Quick Overview

ABPTS is an enterprise-grade bid and proposal management system that simulates real-world responsibilities of a Deloitte DRS Analyst. Built to showcase:
- ✅ Process management & workflow optimization
- ✅ Data analysis & KPI tracking
- ✅ Compliance verification & gap analysis
- ✅ Document version control
- ✅ Executive reporting & visualization
- ✅ Full-stack development proficiency

**Live Demo:** [https://proposalflow-1.preview.emergentagent.com/](https://proposalflow-1.preview.emergentagent.com/)

---

## 🚀 Key Features

### 1. **Executive Dashboard**
- Real-time KPI monitoring (Win Rate, Compliance, Urgent Deadlines)
- Interactive charts (Bar, Pie, Timeline)
- Urgent deadline alerts
- Recent activities feed

### 2. **Bid & RFP Tracker**
- Excel-like opportunity tracking
- Conditional formatting (deadline warnings)
- Status workflow (Drafting → Review → Approved → Submitted → Won/Lost)
- Advanced search & filtering
- Priority-based sorting

### 3. **Compliance Checker**
- RFP requirement matrix
- Gap analysis reporting
- Team member assignment
- Automated compliance % calculation
- Status tracking (Pending/Compliant/Non-Compliant)

### 4. **Document Manager**
- Automatic version control (V1, V2, V3...)
- Category-based organization
- Version history tracking
- Upload metadata management

### 5. **Reports & Analytics**
- PDF report generation (leadership-ready)
- Excel data export (analysis-ready)
- Status summaries
- Strategic recommendations
- Compliance analysis

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────┐
│              React Frontend (SPA)               │
│  Dashboard | Tracker | Compliance | Reports    │
└──────────────────┬──────────────────────────────┘
                   │ REST API (JSON)
┌──────────────────▼──────────────────────────────┐
│           FastAPI Backend (Python)              │
│  Business Logic | Validation | API Routes      │
└──────────────────┬──────────────────────────────┘
                   │ Motor (Async)
┌──────────────────▼──────────────────────────────┐
│              MongoDB Database                   │
│  opportunities | compliance | documents         │
└─────────────────────────────────────────────────┘
```

---

## 📊 Sample Data

**10 Pre-loaded Opportunities** covering:
- 🏥 Healthcare - EHR Implementation ($5M-$7M)
- 💰 Finance - Cybersecurity Assessment ($1.2M-$1.8M)
- 🏫 Government - Learning Management System ($3M-$4M)
- ⚡ Energy - Smart Grid Implementation ($10M-$15M)
- 🏭 Manufacturing - IoT Integration ($4M-$6M)
- And 5 more across various industries...

**Scenarios Include:**
- ⏰ Urgent deadlines (< 48 hours)
- ✅ Won opportunities
- ❌ Lost opportunities
- 📝 Various compliance levels (55%-98%)
- 🔴🟡🟢 Different priority levels

---

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern UI framework
- **React Router** - Navigation
- **TailwindCSS** - Utility-first styling
- **Shadcn UI** - Premium component library
- **Recharts** - Data visualization
- **jsPDF & XLSX** - Report generation

### Backend
- **FastAPI** - High-performance Python framework
- **Motor** - Async MongoDB driver
- **Pydantic** - Data validation
- **Python 3.8+** - Runtime

### Database
- **MongoDB** - Document-based storage

### DevOps
- **Kubernetes** - Container orchestration
- **Supervisor** - Process management
- **Nginx** - Reverse proxy

---

## 📁 Project Structure

```
ABPTS_Project/
│
├── backend/
│   ├── server.py                 # Main FastAPI application
│   ├── init_sample_data.py       # Sample data loader
│   ├── requirements.txt          # Python dependencies
│   └── .env                      # Environment variables
│
├── frontend/
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── App.js               # Main application
│   │   ├── App.css              # Global styles
│   │   ├── components/
│   │   │   ├── Layout.jsx       # Navigation & sidebar
│   │   │   └── ui/              # Shadcn components (30+)
│   │   └── pages/
│   │       ├── Dashboard.jsx
│   │       ├── BidTracker.jsx
│   │       ├── OpportunityDetail.jsx
│   │       ├── ComplianceChecker.jsx
│   │       ├── DocumentManager.jsx
│   │       └── Reports.jsx
│   ├── package.json             # Node dependencies
│   └── .env                     # Environment variables
│
├── ABPTS_Documentation.md        # Complete system documentation
├── SOP_DRS_Bid_Management.md     # Standard Operating Procedures
├── SYSTEM_ARCHITECTURE.md        # Technical architecture
└── README.md                     # This file
```

---

## 🎯 For DRS Analyst Role

### Skills Demonstrated

**1. Process Management:**
- Understanding of complete bid lifecycle
- Workflow optimization
- Deadline management & prioritization
- SLA adherence

**2. Analytical Capabilities:**
- KPI tracking & monitoring
- Data-driven decision making
- Compliance gap analysis
- Win/loss ratio analytics

**3. Technical Proficiency:**
- Full-stack development
- RESTful API design
- Database modeling
- Report generation & automation

**4. Attention to Detail:**
- Compliance tracking at requirement level
- Version control systems
- Data validation & accuracy
- Audit trail maintenance

**5. Stakeholder Communication:**
- Executive dashboard design
- Leadership reports (PDF format)
- Clear data visualization
- Actionable insights & recommendations

---

## 📖 Documentation

Comprehensive documentation is provided in separate files:

### 1. **ABPTS_Documentation.md** (Main Guide)
- System overview & capabilities
- Feature details with use cases
- User guide for DRS analysts
- Skills showcase for interviews
- 50+ pages of detailed documentation

### 2. **SOP_DRS_Bid_Management.md** (Operations Manual)
- Standard Operating Procedures
- Daily workflow guidelines
- Step-by-step instructions
- Error handling procedures
- Best practices
- Workflow diagrams

### 3. **SYSTEM_ARCHITECTURE.md** (Technical Specs)
- High-level architecture
- Component details
- Data flow diagrams
- API documentation
- Security considerations
- Scalability planning

---

## 📊 API Endpoints

### Opportunities
```
GET    /api/opportunities       # List all
POST   /api/opportunities       # Create
GET    /api/opportunities/{id}  # Get one
PUT    /api/opportunities/{id}  # Update
DELETE /api/opportunities/{id}  # Delete
```

### Compliance
```
POST   /api/compliance          # Add item
GET    /api/compliance/{opp_id} # Get items
PUT    /api/compliance/{id}     # Update
DELETE /api/compliance/{id}     # Delete
```

### Documents & Activities
```
POST   /api/documents           # Add document
GET    /api/documents/{opp_id}  # Get documents
POST   /api/activities          # Log activity
GET    /api/activities/{opp_id} # Get activities
```

### Analytics
```
GET    /api/statistics          # Dashboard stats
```

**Full API Docs:** Available at `/docs` (Swagger UI)

---

## 📈 System Statistics

| Metric | Value |
|--------|-------|
| **Pages** | 6 fully functional |
| **API Endpoints** | 15+ RESTful |
| **Components** | 40+ React components |
| **Sample Data** | 10 opportunities |
| **Industries** | 9 different sectors |
| **Export Formats** | PDF, Excel |
| **Chart Types** | 4+ visualizations |

---

## 🏆 Showcase Value

### What Makes This Portfolio-Worthy?

1. **Real-World Simulation**
   - Actual DRS analyst workflows
   - Production-ready quality
   - Enterprise-grade design

2. **Technical Depth**
   - Full-stack implementation
   - RESTful API design
   - Async operations
   - Data modeling

3. **Business Understanding**
   - Process automation
   - Compliance tracking
   - KPI monitoring
   - Executive reporting

4. **Professional Standards**
   - Clean code architecture
   - Comprehensive documentation
   - Best practices throughout
   - Scalability considerations

---

## 📞 System Access

**Live URL:** [https://proposalflow-1.preview.emergentagent.com/](https://proposalflow-1.preview.emergentagent.com/)

**Demo Credentials:** No login required (public demo)

**Status:** ✅ Fully operational with sample data

---

## 📚 Additional Resources

- **ABPTS_Documentation.md** - Complete feature documentation
- **SOP_DRS_Bid_Management.md** - Operational procedures
- **SYSTEM_ARCHITECTURE.md** - Technical architecture
- **API Docs** - Available at `/docs` endpoint

---

## ✨ Final Notes

ABPTS demonstrates a comprehensive understanding of:
- Bid & proposal management processes
- Full-stack software development
- Data analysis & visualization
- Process automation & optimization
- Enterprise-grade system design

**Perfect for demonstrating skills in:**
- Consulting roles (Deloitte, Accenture, McKinsey)
- Analyst positions (DRS, Risk, Strategy)
- Technical roles (Full-stack, DevOps)
- Product management positions

---

## 📊 Quick Start Commands

```bash
# View sample data
cd /app/backend && python init_sample_data.py

# Check services
sudo supervisorctl status

# Restart services (if needed)
sudo supervisorctl restart backend frontend

# Test API
curl https://proposalflow-1.preview.emergentagent.com/api/statistics
```

---

**System Status:** ✅ Production Ready  
**Sample Data:** ✅ Pre-loaded (10 opportunities)  
**Documentation:** ✅ Complete  
**Demo Ready:** ✅ Yes  

**🎯 Ready to showcase technical and business acumen for DRS Analyst roles!**

---

*Made with ❤️ for aspiring DRS Analysts and consulting professionals*
