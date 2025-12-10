# ABPTS System Architecture

## Overview

Automated Bid & Proposal Tracker System (ABPTS) is built on a modern, scalable architecture using React frontend, FastAPI backend, and MongoDB database.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │  Desktop   │  │   Tablet   │  │   Mobile   │            │
│  │  Browser   │  │   Browser  │  │   Browser  │            │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘            │
│        │                │                │                   │
└────────┼────────────────┼────────────────┼───────────────────┘
         │                │                │
         └────────────────┴────────────────┘
                          │
                          │ HTTPS
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                    PRESENTATION LAYER                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              React Application (SPA)                  │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │  │
│  │  │ Dashboard  │  │   Tracker  │  │  Reports   │     │  │
│  │  └────────────┘  └────────────┘  └────────────┘     │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │  │
│  │  │ Compliance │  │ Documents  │  │ Opp Detail │     │  │
│  │  └────────────┘  └────────────┘  └────────────┘     │  │
│  │                                                       │  │
│  │  Components: Recharts, Shadcn UI, TailwindCSS        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          │ REST API (JSON)
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                     APPLICATION LAYER                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │               FastAPI Backend                         │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │           API Router (/api)                    │  │  │
│  │  │  ┌──────────┐  ┌──────────┐  ┌──────────┐     │  │  │
│  │  │  │ Opportu- │  │Compliance│  │Documents │     │  │  │
│  │  │  │ nities   │  │  APIs    │  │   APIs   │     │  │  │
│  │  │  └──────────┘  └──────────┘  └──────────┘     │  │  │
│  │  │  ┌──────────┐  ┌──────────┐                   │  │  │
│  │  │  │Activities│  │Statistics│                   │  │  │
│  │  │  │   APIs   │  │   APIs   │                   │  │  │
│  │  │  └──────────┘  └──────────┘                   │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                                                       │  │
│  │  Business Logic Layer:                                │  │
│  │  - Pydantic Models (Validation)                       │  │
│  │  - Business Rules                                     │  │
│  │  - Data Transformation                                │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          │ Motor (Async Driver)
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                       DATA LAYER                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  MongoDB Database                     │  │
│  │  ┌──────────────┐  ┌──────────────┐                  │  │
│  │  │opportunities │  │  compliance  │                  │  │
│  │  │ Collection   │  │  Collection  │                  │  │
│  │  └──────────────┘  └──────────────┘                  │  │
│  │  ┌──────────────┐  ┌──────────────┐                  │  │
│  │  │  documents   │  │  activities  │                  │  │
│  │  │  Collection  │  │  Collection  │                  │  │
│  │  └──────────────┘  └──────────────┘                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Frontend Architecture (React)

```
src/
├── App.js                    # Main application entry
├── App.css                   # Global styles
├── index.css                 # Tailwind & base styles
│
├── components/
│   ├── Layout.jsx           # Navigation & sidebar
│   └── ui/                  # Shadcn UI components
│       ├── button.jsx
│       ├── card.jsx
│       ├── dialog.jsx
│       ├── input.jsx
│       ├── select.jsx
│       ├── tabs.jsx
│       └── ... (30+ components)
│
└── pages/
    ├── Dashboard.jsx        # Executive overview
    ├── BidTracker.jsx       # Opportunity management
    ├── OpportunityDetail.jsx # Single opportunity view
    ├── ComplianceChecker.jsx # Compliance tracking
    ├── DocumentManager.jsx   # Version control
    └── Reports.jsx          # Analytics & export
```

**State Management:**
- React Hooks (useState, useEffect)
- Local component state
- API calls via Axios
- No global state manager (not needed for this scale)

**Routing:**
```javascript
/ → Dashboard
/tracker → BidTracker
/opportunity/:id → OpportunityDetail
/compliance/:id → ComplianceChecker
/documents/:id → DocumentManager
/reports → Reports
```

---

### Backend Architecture (FastAPI)

```
backend/
├── server.py              # Main application
├── init_sample_data.py   # Data initialization
├── requirements.txt      # Python dependencies
└── .env                  # Environment variables

server.py structure:
├── Imports & Setup
├── MongoDB Connection
├── Pydantic Models
│   ├── Opportunity
│   ├── ComplianceItem
│   ├── Document
│   └── Activity
├── API Routes
│   ├── /api/opportunities/*
│   ├── /api/compliance/*
│   ├── /api/documents/*
│   ├── /api/activities/*
│   └── /api/statistics
└── Middleware & Config
```

**API Design Pattern: RESTful**

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/opportunities | List all |
| POST | /api/opportunities | Create new |
| GET | /api/opportunities/{id} | Get single |
| PUT | /api/opportunities/{id} | Update |
| DELETE | /api/opportunities/{id} | Delete |

---

### Database Schema (MongoDB)

#### Opportunities Collection
```json
{
  "_id": "ObjectId (auto)",
  "id": "uuid-string",
  "client": "string",
  "project_type": "string",
  "rfp_release_date": "date-string",
  "submission_deadline": "iso-datetime",
  "proposal_owner": "string",
  "status": "enum[Drafting|Review|Approved|Submitted|Won|Lost]",
  "compliance_percentage": "int (0-100)",
  "priority_level": "enum[High|Medium|Low]",
  "portal_link": "url-string",
  "risk_flags": ["string"],
  "submission_format": "enum[Portal|Email|Hybrid]",
  "budget": "string",
  "industry": "string",
  "created_at": "iso-datetime"
}
```

#### Compliance Collection
```json
{
  "_id": "ObjectId (auto)",
  "id": "uuid-string",
  "opportunity_id": "uuid-string (FK)",
  "requirement": "text",
  "status": "enum[Pending|Compliant|Non-Compliant]",
  "notes": "text",
  "assigned_to": "string",
  "created_at": "iso-datetime"
}
```

#### Documents Collection
```json
{
  "_id": "ObjectId (auto)",
  "id": "uuid-string",
  "opportunity_id": "uuid-string (FK)",
  "document_name": "string",
  "version": "string (V1, V2, V3...)",
  "category": "enum[Proposal|Annexures|Financials|Compliance|Supporting]",
  "uploaded_by": "string",
  "created_at": "iso-datetime"
}
```

#### Activities Collection
```json
{
  "_id": "ObjectId (auto)",
  "id": "uuid-string",
  "opportunity_id": "uuid-string (FK)",
  "activity_type": "string",
  "description": "text",
  "user": "string",
  "created_at": "iso-datetime"
}
```

---

## Data Flow Diagrams

### Creating New Opportunity

```
┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
│  User    │─────▶│ React    │─────▶│ FastAPI  │─────▶│ MongoDB  │
│  Action  │      │ Component│      │ Backend  │      │ Database │
└──────────┘      └──────────┘      └──────────┘      └──────────┘
    │                   │                  │                  │
    │ 1. Click "Add     │                  │                  │
    │    Opportunity"   │                  │                  │
    │                   │                  │                  │
    │ 2. Fill form      │                  │                  │
    │    & submit       │                  │                  │
    │───────────────────▶                  │                  │
    │                   │ 3. POST /api/    │                  │
    │                   │    opportunities │                  │
    │                   │──────────────────▶                  │
    │                   │                  │ 4. Validate      │
    │                   │                  │    with Pydantic │
    │                   │                  │                  │
    │                   │                  │ 5. insert_one()  │
    │                   │                  │──────────────────▶
    │                   │                  │                  │
    │                   │                  │ 6. Return doc    │
    │                   │                  │◀──────────────────
    │                   │                  │                  │
    │                   │ 7. Return JSON   │                  │
    │                   │    (200 OK)      │                  │
    │                   │◀──────────────────                  │
    │                   │                  │                  │
    │ 8. Update UI      │                  │                  │
    │◀───────────────────                  │                  │
    │                   │                  │                  │
    │ 9. Show toast     │                  │                  │
    │    notification   │                  │                  │
    │                   │                  │                  │
```

---

### Loading Dashboard Statistics

```
┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
│  User    │      │ React    │      │ FastAPI  │      │ MongoDB  │
│  Visits  │      │Dashboard │      │ Backend  │      │ Database │
└──────────┘      └──────────┘      └──────────┘      └──────────┘
    │                   │                  │                  │
    │ 1. Navigate to    │                  │                  │
    │    Dashboard      │                  │                  │
    │───────────────────▶                  │                  │
    │                   │                  │                  │
    │                   │ 2. useEffect()   │                  │
    │                   │    triggers      │                  │
    │                   │                  │                  │
    │                   │ 3. GET /api/     │                  │
    │                   │    statistics    │                  │
    │                   │──────────────────▶                  │
    │                   │                  │ 4. count_documents│
    │                   │                  │    (all collections)
    │                   │                  │──────────────────▶
    │                   │                  │                  │
    │                   │                  │ 5. Aggregate:    │
    │                   │                  │    - Total count │
    │                   │                  │    - Status breakdown
    │                   │                  │    - Win rate    │
    │                   │                  │    - Avg compliance
    │                   │                  │    - Urgent count│
    │                   │                  │◀──────────────────
    │                   │                  │                  │
    │                   │ 6. Return JSON   │                  │
    │                   │◀──────────────────                  │
    │                   │                  │                  │
    │ 7. Render:        │                  │                  │
    │    - Stat cards   │                  │                  │
    │    - Charts       │                  │                  │
    │    - Recent list  │                  │                  │
    │◀───────────────────                  │                  │
```

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Kubernetes Cluster                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   Nginx Ingress                       │  │
│  │                                                       │  │
│  │  ┌─────────────────────────────────────────────┐    │  │
│  │  │  Route: /api/* → Backend (8001)             │    │  │
│  │  │  Route: /* → Frontend (3000)                │    │  │
│  │  └─────────────────────────────────────────────┘    │  │
│  └──────────┬────────────────────────┬──────────────────┘  │
│             │                        │                     │
│  ┌──────────▼─────────┐   ┌─────────▼─────────┐          │
│  │  Frontend Pod      │   │  Backend Pod       │          │
│  │  ─────────────     │   │  ─────────────     │          │
│  │  - React App       │   │  - FastAPI         │          │
│  │  - Node.js 16      │   │  - Python 3.8      │          │
│  │  - Port: 3000      │   │  - Port: 8001      │          │
│  │  - Hot Reload: ON  │   │  - Hot Reload: ON  │          │
│  └────────────────────┘   └──────────┬─────────┘          │
│                                      │                     │
│                           ┌──────────▼─────────┐          │
│                           │  MongoDB Pod       │          │
│                           │  ─────────────     │          │
│                           │  - MongoDB 5.x     │          │
│                           │  - Port: 27017     │          │
│                           │  - Data: /data/db  │          │
│                           └────────────────────┘          │
│                                                            │
│  Process Manager: Supervisor                              │
│  - frontend service                                       │
│  - backend service                                        │
│  - mongodb service                                        │
└─────────────────────────────────────────────────────────────┘

External Access:
- URL: https://proposalflow-1.preview.emergentagent.com/
- SSL: Managed by Kubernetes
- CDN: Optional (not implemented)
```

---

## Security Architecture

### Authentication & Authorization
**Current State:** Not implemented (MVP focus)

**Planned Architecture:**
```
┌──────────────────────────────────────────────────┐
│             Authentication Flow                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  1. User Login                                   │
│     ├─→ Email/Password                           │
│     └─→ OAuth (Google, Microsoft)                │
│                                                  │
│  2. JWT Token Generation                         │
│     ├─→ Access Token (15 min)                    │
│     └─→ Refresh Token (7 days)                   │
│                                                  │
│  3. Token Storage                                │
│     ├─→ httpOnly Cookie (preferred)              │
│     └─→ localStorage (alternative)               │
│                                                  │
│  4. API Authorization                            │
│     ├─→ Bearer Token in Header                   │
│     └─→ Role-based access control                │
│                                                  │
│  5. Token Refresh                                │
│     └─→ Automatic renewal before expiry          │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Data Security
- **In Transit:** HTTPS/TLS encryption
- **At Rest:** MongoDB encryption (configurable)
- **Sensitive Data:** Environment variables only
- **Input Validation:** Pydantic models
- **SQL Injection:** N/A (NoSQL database)
- **XSS Protection:** React auto-escaping

---

## Performance Optimization

### Frontend Optimizations
1. **Code Splitting:** React lazy loading (not implemented yet)
2. **Asset Optimization:** 
   - Minified JS/CSS in production
   - Image optimization (quality: 20 for screenshots)
3. **Caching:**
   - Browser caching headers
   - Service worker (optional)
4. **Rendering:**
   - Virtual scrolling for large lists (future)
   - Debounced search inputs

### Backend Optimizations
1. **Async Operations:** Motor async driver
2. **Database Indexes:**
   ```javascript
   opportunities: { id: 1 } (unique)
   compliance: { opportunity_id: 1 }
   documents: { opportunity_id: 1 }
   activities: { opportunity_id: 1, created_at: -1 }
   ```
3. **Query Optimization:**
   - Projection: Exclude `_id` field
   - Limit: 1000 docs max per query
4. **API Response:**
   - Pydantic serialization
   - JSON compression (gzip)

### Database Optimizations
1. **Connection Pooling:** Motor default
2. **Query Patterns:**
   - Find by ID: O(1) with index
   - Find by opportunity_id: O(log n)
   - Aggregations: Optimized pipelines
3. **Data Volume:**
   - Current: ~10-100 opportunities
   - Scalable to: 10,000+ opportunities

---

## Monitoring & Logging

### Backend Logging
```python
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
```

**Log Locations:**
- Backend: `/var/log/supervisor/backend.*.log`
- Frontend: Browser console
- MongoDB: `/var/log/mongodb/mongod.log`

### Error Handling
1. **Frontend:**
   - Try-catch blocks in API calls
   - Toast notifications for errors
   - User-friendly error messages

2. **Backend:**
   - HTTPException for API errors
   - 404: Not Found
   - 500: Internal Server Error
   - Validation errors: 422

---

## Scalability Considerations

### Horizontal Scaling
**Current:** Single instance
**Future:**
- Multiple frontend pods (stateless)
- Multiple backend pods (stateless)
- MongoDB replica set (3+ nodes)
- Load balancer: Kubernetes Ingress

### Vertical Scaling
**Current Resources:**
- Frontend: 512MB RAM
- Backend: 512MB RAM
- MongoDB: 1GB RAM

**Scaling Path:**
- Add more CPU/RAM as needed
- Monitor metrics
- Scale based on usage

### Database Scaling
1. **Sharding:** By client ID or industry
2. **Indexing:** Add as query patterns emerge
3. **Caching:** Redis for statistics (future)
4. **Archiving:** Move old opportunities to cold storage

---

## Technology Stack Details

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.0.0 | UI framework |
| React Router | 7.5.1 | Navigation |
| Axios | 1.8.4 | HTTP client |
| Recharts | 2.10.4 | Data visualization |
| Tailwind CSS | 3.4.17 | Styling |
| Shadcn UI | Latest | Component library |
| jsPDF | 2.5.2 | PDF generation |
| XLSX | 0.18.5 | Excel export |
| Sonner | 2.0.3 | Toast notifications |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.8+ | Runtime |
| FastAPI | 0.110.1 | Web framework |
| Motor | 3.3.1 | MongoDB driver |
| Pydantic | 2.6.4 | Data validation |
| Uvicorn | 0.25.0 | ASGI server |
| python-dotenv | 1.0.1 | Environment vars |

### Database
| Technology | Version | Purpose |
|------------|---------|---------|
| MongoDB | 5.x | Primary database |

### DevOps
| Technology | Purpose |
|------------|---------|
| Supervisor | Process management |
| Nginx | Reverse proxy |
| Kubernetes | Container orchestration |
| Docker | Containerization |

---

## Development Workflow

```
┌────────────────────────────────────────────────┐
│           Development Process                  │
├────────────────────────────────────────────────┤
│                                                │
│  1. Code Changes                               │
│     ├─→ Frontend: /app/frontend/src/          │
│     └─→ Backend: /app/backend/                │
│                                                │
│  2. Hot Reload                                 │
│     ├─→ React: Automatic (create-react-app)   │
│     └─→ FastAPI: Automatic (uvicorn --reload) │
│                                                │
│  3. Testing                                    │
│     ├─→ Manual: Browser testing                │
│     ├─→ API: curl commands                     │
│     └─→ Automated: Playwright (future)         │
│                                                │
│  4. Linting                                    │
│     ├─→ Frontend: ESLint                       │
│     └─→ Backend: Black, isort                  │
│                                                │
│  5. Deployment                                 │
│     ├─→ Git push                               │
│     ├─→ CI/CD pipeline                         │
│     └─→ Kubernetes rolling update              │
│                                                │
└────────────────────────────────────────────────┘
```

---

## API Documentation

### Automatically Generated
FastAPI provides automatic API documentation at:
- Swagger UI: `/docs`
- ReDoc: `/redoc`

### Example API Call
```bash
# Get all opportunities
curl -X GET \
  https://proposalflow-1.preview.emergentagent.com/api/opportunities \
  -H 'Content-Type: application/json'

# Create opportunity
curl -X POST \
  https://proposalflow-1.preview.emergentagent.com/api/opportunities \
  -H 'Content-Type: application/json' \
  -d '{
    "client": "Acme Corp",
    "project_type": "Cloud Migration",
    "rfp_release_date": "2025-01-15",
    "submission_deadline": "2025-02-15T17:00:00",
    "proposal_owner": "John Doe",
    "status": "Drafting",
    "compliance_percentage": 0,
    "priority_level": "High",
    "submission_format": "Portal",
    "portal_link": "",
    "risk_flags": [],
    "budget": "$1M",
    "industry": "Technology"
  }'
```

---

## Future Architecture Enhancements

### Microservices Migration
```
Current: Monolithic FastAPI
Future:
├── opportunity-service (CRUD operations)
├── compliance-service (Compliance tracking)
├── document-service (File management)
├── analytics-service (Reporting & statistics)
└── notification-service (Email alerts)
```

### Event-Driven Architecture
```
Message Broker: RabbitMQ/Kafka
Events:
├── opportunity.created
├── opportunity.status.changed
├── compliance.updated
└── deadline.approaching
```

### Caching Layer
```
Redis:
├── Statistics (TTL: 5 min)
├── Opportunity list (TTL: 1 min)
└── User sessions
```

---

## Conclusion

ABPTS is built on a modern, scalable architecture that can grow from a portfolio project to an enterprise-grade system. The clean separation of concerns, RESTful API design, and component-based frontend make it maintainable and extensible.

**Key Architectural Strengths:**
- ✅ Modular component architecture
- ✅ RESTful API design
- ✅ Async operations throughout
- ✅ Type-safe data models
- ✅ Responsive design
- ✅ Scalable infrastructure ready

**Ready for:**
- Enterprise deployment
- Multi-tenant architecture
- International expansion
- Integration with external systems

---

*Architecture Document Version: 1.0*  
*Last Updated: December 2025*
