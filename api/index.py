import logging
import os
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

import requests
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, EmailStr, Field


ROOT_DIR = Path(__file__).resolve().parent.parent
load_dotenv(ROOT_DIR / ".env")

GOOGLE_SHEETS_WEBHOOK_URL = os.environ.get("GOOGLE_SHEETS_WEBHOOK_URL", "").strip()
ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.environ.get("CORS_ORIGINS", "*").split(",")
    if origin.strip()
]

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(title="DataOS Landing API")


class LeadCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")

    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    company: Optional[str] = Field(default="", max_length=160)
    phone: Optional[str] = Field(default="", max_length=40)
    message: Optional[str] = Field(default="", max_length=2000)
    cta_source: Optional[str] = Field(default="unknown", max_length=80)


class LeadResponse(BaseModel):
    success: bool
    lead_id: str
    sheet_synced: bool
    message: str


def forward_to_sheet(payload: dict) -> bool:
    if not GOOGLE_SHEETS_WEBHOOK_URL:
        logger.warning("GOOGLE_SHEETS_WEBHOOK_URL is not configured.")
        return False

    try:
        response = requests.post(
            GOOGLE_SHEETS_WEBHOOK_URL,
            json=payload,
            timeout=10,
            allow_redirects=True,
        )
    except requests.RequestException as exc:
        logger.warning("Sheet webhook request failed: %s", exc)
        return False

    if response.status_code not in (200, 201, 202):
        logger.warning(
            "Sheet webhook responded with %s: %s",
            response.status_code,
            response.text[:200],
        )
        return False

    return True


@app.get("/")
async def root():
    return {
        "service": "DataOS Landing API",
        "status": "ok",
        "sheets_configured": bool(GOOGLE_SHEETS_WEBHOOK_URL),
        "storage": "google-sheets-webhook",
    }


@app.get("/health")
async def health():
    return {"status": "healthy", "time": datetime.now(timezone.utc).isoformat()}


@app.post("/leads", response_model=LeadResponse)
async def create_lead(input: LeadCreate):
    lead_id = str(uuid.uuid4())
    timestamp = datetime.now(timezone.utc).isoformat()

    payload = {
        "id": lead_id,
        "timestamp": timestamp,
        "name": input.name,
        "email": input.email,
        "company": input.company or "",
        "phone": input.phone or "",
        "message": input.message or "",
        "cta_source": input.cta_source or "unknown",
    }

    synced = forward_to_sheet(payload)
    if not synced and not GOOGLE_SHEETS_WEBHOOK_URL:
        raise HTTPException(
            status_code=500,
            detail="Lead capture is not configured. Set GOOGLE_SHEETS_WEBHOOK_URL in Vercel.",
        )

    if not synced:
        raise HTTPException(
            status_code=502,
            detail="Could not forward the lead to Google Sheets. Please try again.",
        )

    return LeadResponse(
        success=True,
        lead_id=lead_id,
        sheet_synced=True,
        message="Thanks! We'll be in touch shortly.",
    )


@app.get("/leads")
async def list_leads():
    raise HTTPException(
        status_code=501,
        detail="Lead listing is not available in the Vercel deployment. Check the Google Sheet directly.",
    )


app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=ALLOWED_ORIGINS or ["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
