from pydantic import BaseModel
from typing import Any, Optional

class ResumeCreate(BaseModel):
    user_id: Optional[int] = None
    title: Optional[str] = None 
    user_data: Any
    sections: Any

class ResumeResponse(BaseModel):
    id: int
    user_id: Optional[int]
    title: Optional[str] = None 
    user_data: Any
    sections: Any
    created_at: Optional[str]

    class Config:
        from_attributes = True
        
class ResumeUpdate(BaseModel):
    title: Optional[str] = None