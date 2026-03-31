from pydantic import BaseModel
from typing import Any, Optional, Dict

class ResumeCreate(BaseModel):
    user_email: str
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
    
class UserCreate(BaseModel):
    email: str
    name: Optional[str] = None
    github: Optional[str] = None
    linkedin: Optional[str] = None
    mobile: Optional[str] = None
    education: Optional[Dict] = None
    skills: Optional[Dict] = None

class UserResponse(BaseModel):
    id: int
    email: str
    name: Optional[str]
    github: Optional[str]
    linkedin: Optional[str]
    mobile: Optional[str]
    education: Optional[Dict]
    skills: Optional[Dict]

    class Config:
        from_attributes = True