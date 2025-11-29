```python
from fastapi import APIRouter, HTTPException
from app.schemas.volunteer_schema import VolunteerSchema
from app.database import supabase

router = APIRouter()

@router.post("/register")
def register(volunteer: VolunteerSchema):
    response = supabase.table("volunteers").insert(volunteer.dict()).execute()
    if response.error:
        raise HTTPException(500, response.error.message)
    return {"message": "Volunteer registered", "data": response.data}
```