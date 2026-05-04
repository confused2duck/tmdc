"""Backend API tests for DataOS Landing.

Covers /api/, /api/health, /api/leads (POST + GET), and validation cases.
"""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://dataos-modern.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Root / Health ----------
class TestRoot:
    def test_root_status_and_payload(self, client):
        r = client.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("service") == "DataOS Landing API"
        assert data.get("status") == "ok"
        # sheets webhook should be unconfigured for this run
        assert data.get("sheets_configured") is False

    def test_health(self, client):
        r = client.get(f"{API}/health")
        assert r.status_code == 200
        d = r.json()
        assert d.get("status") == "healthy"
        assert "time" in d


# ---------- Leads CRUD-ish ----------
class TestLeads:
    def test_create_lead_minimal(self, client):
        payload = {
            "name": "TEST_Tester One",
            "email": "test_one@example.com",
        }
        r = client.post(f"{API}/leads", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["success"] is True
        assert isinstance(data["lead_id"], str) and len(data["lead_id"]) > 0
        assert data["sheet_synced"] is False  # webhook intentionally unset
        assert "message" in data

    def test_create_lead_full_then_listed(self, client):
        payload = {
            "name": "TEST_Tester Two",
            "email": "test_two@example.com",
            "company": "TEST_Co",
            "phone": "+1-555-0100",
            "message": "TEST message body",
            "cta_source": "hero-primary",
        }
        r = client.post(f"{API}/leads", json=payload)
        assert r.status_code == 200, r.text
        body = r.json()
        lead_id = body["lead_id"]
        assert body["sheet_synced"] is False

        # list and verify persistence + no _id leak
        rl = client.get(f"{API}/leads")
        assert rl.status_code == 200
        rows = rl.json()
        assert isinstance(rows, list)
        for row in rows:
            assert "_id" not in row
        match = next((x for x in rows if x.get("id") == lead_id), None)
        assert match is not None, "Lead not found in list"
        assert match["name"] == payload["name"]
        assert match["email"] == payload["email"]
        assert match["company"] == payload["company"]
        assert match["cta_source"] == payload["cta_source"]

    def test_create_lead_missing_email_returns_422(self, client):
        r = client.post(f"{API}/leads", json={"name": "TEST_NoEmail"})
        assert r.status_code == 422, r.text

    def test_create_lead_invalid_email_returns_422(self, client):
        r = client.post(
            f"{API}/leads",
            json={"name": "TEST_BadEmail", "email": "not-an-email"},
        )
        assert r.status_code == 422, r.text

    def test_create_lead_missing_name_returns_422(self, client):
        r = client.post(f"{API}/leads", json={"email": "x@example.com"})
        assert r.status_code == 422, r.text

    def test_list_leads_limit(self, client):
        r = client.get(f"{API}/leads", params={"limit": 1})
        assert r.status_code == 200
        rows = r.json()
        assert isinstance(rows, list)
        assert len(rows) <= 1
