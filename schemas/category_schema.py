from pydantic import BaseModel


class CategorySchema(BaseModel):
    name: str
    description: str | None = None
    is_active: bool = True


class CategoryUpdateSchema(BaseModel):
    description: str | None = None
    is_active: bool | None = None
