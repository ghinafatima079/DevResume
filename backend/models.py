from sqlalchemy import Column, Integer, String, Text, JSON
from database import Base

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True)
    title = Column(String, nullable=True)
    user_data = Column(Text)   # JSON string
    sections = Column(Text)    # JSON string

    created_at = Column(String)
    
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)

    name = Column(String, nullable=True)
    github = Column(String, nullable=True)
    linkedin = Column(String, nullable=True)
    mobile = Column(String, nullable=True)

    education = Column(JSON, nullable=True)
    skills = Column(JSON, nullable=True)