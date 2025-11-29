```python
from pydantic import BaseModel

class VolunteerSchema(BaseModel):
    name: str
    category: str
    subcategory: str
    date: str
    time: str
    status: str
    email: str | None = None
    phone: str | None = None
```