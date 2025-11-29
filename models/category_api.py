from fastapi import APIRouter, HTTPException

try:
    from app.schemas.category_schema import CategorySchema, CategoryUpdateSchema
    from app.database import supabase
except ModuleNotFoundError:
    from schemas.category_schema import CategorySchema, CategoryUpdateSchema
    from database import supabase

router = APIRouter(prefix="/categories", tags=["categories"])


@router.post("/", status_code=201)
def create_category(category: CategorySchema):
    response = supabase.table("categories").insert(category.dict()).execute()
    if response.error:
        raise HTTPException(status_code=500, detail=response.error.message)
    return {"message": "Category created", "data": response.data}


@router.patch("/{category_id}")
def update_category(category_id: int, payload: CategoryUpdateSchema):
    response = (
        supabase.table("categories")
        .update(payload.dict(exclude_none=True))
        .eq("id", category_id)
        .execute()
    )
    if response.error:
        raise HTTPException(status_code=500, detail=response.error.message)
    if not response.data:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"message": "Category updated", "data": response.data}
