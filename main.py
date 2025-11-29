# app/main.py
from fastapi import FastAPI
from pydantic import BaseModel
from app.config import supabase

app = FastAPI()

class Volunteer(BaseModel):
    name: str
    email: str
    phone: str
    role: str

@app.post("/volunteers")
def create_volunteer(volunteer: Volunteer):
    try:
        response = supabase.table("volunteers").insert({
            "name": volunteer.name,
            "email": volunteer.email,
            "phone": volunteer.phone,
            "role": volunteer.role
        }).execute()

        if response.error:
            return {"success": False, "error": response.error.message}

        return {"success": True, "data": response.data}

    except Exception as e:
        return {"success": False, "error": str(e)}
