import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime, timedelta, timezone
import uuid
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Sample data
sample_opportunities = [
    {
        "id": str(uuid.uuid4()),
        "client": "GlobalTech Solutions",
        "project_type": "Cloud Migration Services",
        "rfp_release_date": "2025-01-05",
        "submission_deadline": (datetime.now(timezone.utc) + timedelta(days=10)).isoformat(),
        "proposal_owner": "Sarah Johnson",
        "status": "Drafting",
        "compliance_percentage": 65,
        "priority_level": "High",
        "portal_link": "https://globaltechportal.com/rfp/12345",
        "risk_flags": ["Tight Timeline", "Complex Requirements"],
        "submission_format": "Portal",
        "budget": "$2.5M - $3.5M",
        "industry": "Technology",
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "client": "Healthcare Alliance",
        "project_type": "EHR System Implementation",
        "rfp_release_date": "2025-01-10",
        "submission_deadline": (datetime.now(timezone.utc) + timedelta(days=2)).isoformat(),
        "proposal_owner": "Michael Chen",
        "status": "Review",
        "compliance_percentage": 85,
        "priority_level": "High",
        "portal_link": "https://healthportal.gov/opportunities/789",
        "risk_flags": ["Urgent Deadline"],
        "submission_format": "Hybrid",
        "budget": "$5M - $7M",
        "industry": "Healthcare",
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "client": "Financial Services Corp",
        "project_type": "Cybersecurity Assessment",
        "rfp_release_date": "2024-12-20",
        "submission_deadline": (datetime.now(timezone.utc) + timedelta(days=5)).isoformat(),
        "proposal_owner": "David Martinez",
        "status": "Approved",
        "compliance_percentage": 92,
        "priority_level": "High",
        "portal_link": "",
        "risk_flags": [],
        "submission_format": "Email",
        "budget": "$1.2M - $1.8M",
        "industry": "Finance",
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "client": "State Department of Education",
        "project_type": "Learning Management System",
        "rfp_release_date": "2025-01-08",
        "submission_deadline": (datetime.now(timezone.utc) + timedelta(hours=30)).isoformat(),
        "proposal_owner": "Emily Wong",
        "status": "Drafting",
        "compliance_percentage": 70,
        "priority_level": "High",
        "portal_link": "https://education.state.gov/bids/2025-LMS",
        "risk_flags": ["Urgent Deadline", "Government Contract"],
        "submission_format": "Portal",
        "budget": "$3M - $4M",
        "industry": "Government",
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "client": "Retail Innovations Inc",
        "project_type": "Supply Chain Optimization",
        "rfp_release_date": "2024-12-15",
        "submission_deadline": (datetime.now(timezone.utc) + timedelta(days=20)).isoformat(),
        "proposal_owner": "James Wilson",
        "status": "Drafting",
        "compliance_percentage": 55,
        "priority_level": "Medium",
        "portal_link": "https://retailinnovations.com/procurement/sc-opt",
        "risk_flags": [],
        "submission_format": "Portal",
        "budget": "$800K - $1.2M",
        "industry": "Retail",
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "client": "Energy Solutions Ltd",
        "project_type": "Smart Grid Implementation",
        "rfp_release_date": "2024-11-25",
        "submission_deadline": (datetime.now(timezone.utc) - timedelta(days=5)).isoformat(),
        "proposal_owner": "Lisa Anderson",
        "status": "Submitted",
        "compliance_percentage": 95,
        "priority_level": "High",
        "portal_link": "",
        "risk_flags": [],
        "submission_format": "Email",
        "budget": "$10M - $15M",
        "industry": "Energy",
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "client": "Manufacturing Hub",
        "project_type": "IoT Integration",
        "rfp_release_date": "2024-11-10",
        "submission_deadline": (datetime.now(timezone.utc) - timedelta(days=15)).isoformat(),
        "proposal_owner": "Robert Taylor",
        "status": "Won",
        "compliance_percentage": 98,
        "priority_level": "High",
        "portal_link": "https://mfghub.com/rfp/iot2024",
        "risk_flags": [],
        "submission_format": "Portal",
        "budget": "$4M - $6M",
        "industry": "Manufacturing",
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "client": "Transportation Authority",
        "project_type": "Fleet Management System",
        "rfp_release_date": "2024-10-20",
        "submission_deadline": (datetime.now(timezone.utc) - timedelta(days=20)).isoformat(),
        "proposal_owner": "Amanda Brooks",
        "status": "Lost",
        "compliance_percentage": 78,
        "priority_level": "Medium",
        "portal_link": "",
        "risk_flags": ["Price Sensitivity"],
        "submission_format": "Hybrid",
        "budget": "$2M - $3M",
        "industry": "Transportation",
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "client": "Telecom Global",
        "project_type": "5G Network Expansion",
        "rfp_release_date": "2025-01-12",
        "submission_deadline": (datetime.now(timezone.utc) + timedelta(days=15)).isoformat(),
        "proposal_owner": "Kevin Park",
        "status": "Review",
        "compliance_percentage": 88,
        "priority_level": "High",
        "portal_link": "https://telecomglobal.net/bids/5g-expansion",
        "risk_flags": [],
        "submission_format": "Portal",
        "budget": "$20M - $25M",
        "industry": "Telecommunications",
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": str(uuid.uuid4()),
        "client": "City Planning Department",
        "project_type": "Smart City Infrastructure",
        "rfp_release_date": "2025-01-01",
        "submission_deadline": (datetime.now(timezone.utc) + timedelta(days=7)).isoformat(),
        "proposal_owner": "Michelle Lee",
        "status": "Drafting",
        "compliance_percentage": 60,
        "priority_level": "Medium",
        "portal_link": "https://cityplanning.gov/smartcity-rfp",
        "risk_flags": ["Multiple Stakeholders"],
        "submission_format": "Portal",
        "budget": "$8M - $12M",
        "industry": "Government",
        "created_at": datetime.now(timezone.utc).isoformat()
    }
]

async def init_data():
    print("Clearing existing data...")
    await db.opportunities.delete_many({})
    await db.compliance.delete_many({})
    await db.documents.delete_many({})
    await db.activities.delete_many({})
    
    print("Inserting sample opportunities...")
    await db.opportunities.insert_many(sample_opportunities)
    print(f"Inserted {len(sample_opportunities)} opportunities")
    
    print("Sample data initialization complete!")

if __name__ == "__main__":
    asyncio.run(init_data())
    print("Done!")