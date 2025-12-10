from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import re

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Models
class OpportunityCreate(BaseModel):
    client: str
    project_type: str
    rfp_release_date: str
    submission_deadline: str
    proposal_owner: str
    status: str
    compliance_percentage: int
    priority_level: str
    portal_link: Optional[str] = ""
    risk_flags: List[str] = []
    submission_format: str
    budget: Optional[str] = ""
    industry: Optional[str] = ""

class Opportunity(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client: str
    project_type: str
    rfp_release_date: str
    submission_deadline: str
    proposal_owner: str
    status: str
    compliance_percentage: int
    priority_level: str
    portal_link: str = ""
    risk_flags: List[str] = []
    submission_format: str
    budget: str = ""
    industry: str = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ComplianceItemCreate(BaseModel):
    opportunity_id: str
    requirement: str
    status: str
    notes: str = ""
    assigned_to: str

class ComplianceItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    opportunity_id: str
    requirement: str
    status: str
    notes: str = ""
    assigned_to: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class DocumentCreate(BaseModel):
    opportunity_id: str
    document_name: str
    version: str
    category: str
    uploaded_by: str

class Document(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    opportunity_id: str
    document_name: str
    version: str
    category: str
    uploaded_by: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

class ActivityCreate(BaseModel):
    opportunity_id: str
    activity_type: str
    description: str
    user: str

class Activity(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    opportunity_id: str
    activity_type: str
    description: str
    user: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

# Opportunities endpoints
@api_router.post("/opportunities", response_model=Opportunity)
async def create_opportunity(data: OpportunityCreate):
    opportunity = Opportunity(**data.model_dump())
    doc = opportunity.model_dump()
    await db.opportunities.insert_one(doc)
    return opportunity

@api_router.get("/opportunities", response_model=List[Opportunity])
async def get_opportunities():
    opportunities = await db.opportunities.find({}, {"_id": 0}).to_list(1000)
    return opportunities

@api_router.get("/opportunities/{opportunity_id}", response_model=Opportunity)
async def get_opportunity(opportunity_id: str):
    opportunity = await db.opportunities.find_one({"id": opportunity_id}, {"_id": 0})
    if not opportunity:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    return opportunity

@api_router.put("/opportunities/{opportunity_id}", response_model=Opportunity)
async def update_opportunity(opportunity_id: str, data: OpportunityCreate):
    opportunity = Opportunity(id=opportunity_id, **data.model_dump())
    doc = opportunity.model_dump()
    result = await db.opportunities.replace_one({"id": opportunity_id}, doc)
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    return opportunity

@api_router.delete("/opportunities/{opportunity_id}")
async def delete_opportunity(opportunity_id: str):
    result = await db.opportunities.delete_one({"id": opportunity_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    return {"message": "Opportunity deleted successfully"}

# Compliance endpoints
@api_router.post("/compliance", response_model=ComplianceItem)
async def create_compliance_item(data: ComplianceItemCreate):
    item = ComplianceItem(**data.model_dump())
    doc = item.model_dump()
    await db.compliance.insert_one(doc)
    return item

@api_router.get("/compliance/{opportunity_id}", response_model=List[ComplianceItem])
async def get_compliance_items(opportunity_id: str):
    items = await db.compliance.find({"opportunity_id": opportunity_id}, {"_id": 0}).to_list(1000)
    return items

@api_router.put("/compliance/{item_id}", response_model=ComplianceItem)
async def update_compliance_item(item_id: str, data: ComplianceItemCreate):
    item = ComplianceItem(id=item_id, **data.model_dump())
    doc = item.model_dump()
    result = await db.compliance.replace_one({"id": item_id}, doc)
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Compliance item not found")
    return item

@api_router.delete("/compliance/{item_id}")
async def delete_compliance_item(item_id: str):
    result = await db.compliance.delete_one({"id": item_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Compliance item not found")
    return {"message": "Compliance item deleted successfully"}

# Documents endpoints
@api_router.post("/documents", response_model=Document)
async def create_document(data: DocumentCreate):
    document = Document(**data.model_dump())
    doc = document.model_dump()
    await db.documents.insert_one(doc)
    return document

@api_router.get("/documents/{opportunity_id}", response_model=List[Document])
async def get_documents(opportunity_id: str):
    documents = await db.documents.find({"opportunity_id": opportunity_id}, {"_id": 0}).to_list(1000)
    return documents

@api_router.delete("/documents/{document_id}")
async def delete_document(document_id: str):
    result = await db.documents.delete_one({"id": document_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Document not found")
    return {"message": "Document deleted successfully"}

# Activities endpoints
@api_router.post("/activities", response_model=Activity)
async def create_activity(data: ActivityCreate):
    activity = Activity(**data.model_dump())
    doc = activity.model_dump()
    await db.activities.insert_one(doc)
    return activity

@api_router.get("/activities/{opportunity_id}", response_model=List[Activity])
async def get_activities(opportunity_id: str):
    activities = await db.activities.find({"opportunity_id": opportunity_id}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return activities

# Dashboard statistics
@api_router.get("/statistics")
async def get_statistics():
    total_opportunities = await db.opportunities.count_documents({})
    
    # Status counts
    status_counts = {}
    statuses = ["Drafting", "Review", "Approved", "Submitted", "Won", "Lost"]
    for status in statuses:
        count = await db.opportunities.count_documents({"status": status})
        status_counts[status] = count
    
    # Calculate win/loss ratio
    won = status_counts.get("Won", 0)
    lost = status_counts.get("Lost", 0)
    win_rate = (won / (won + lost) * 100) if (won + lost) > 0 else 0
    
    # Urgent deadlines (within 48 hours)
    now = datetime.now(timezone.utc)
    urgent_deadline = now + timedelta(hours=48)
    all_opps = await db.opportunities.find({}, {"_id": 0}).to_list(1000)
    urgent_count = sum(1 for opp in all_opps 
                      if opp['status'] not in ['Won', 'Lost', 'Submitted'] and 
                      datetime.fromisoformat(opp['submission_deadline'].replace('Z', '+00:00')) <= urgent_deadline)
    
    # Average compliance
    avg_compliance = 0
    if total_opportunities > 0:
        opps = await db.opportunities.find({}, {"_id": 0}).to_list(1000)
        total_compliance = sum(opp.get('compliance_percentage', 0) for opp in opps)
        avg_compliance = total_compliance / total_opportunities if total_opportunities > 0 else 0
    
    return {
        "total_opportunities": total_opportunities,
        "status_counts": status_counts,
        "win_rate": round(win_rate, 1),
        "urgent_deadlines": urgent_count,
        "average_compliance": round(avg_compliance, 1)
    }

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()