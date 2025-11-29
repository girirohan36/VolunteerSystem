python
from fastapi import HTTPException


def check_response(response):
    """Supabase client returns object with .error and .data"""
    if getattr(response, "error", None):
        raise HTTPException(status_code=500, detail=str(response.error))
    return getattr(response, "data", None)