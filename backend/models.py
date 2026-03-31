from sqlalchemy import Column, Integer, String, Text
from database import Base

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, nullable=True)  # future use
    title = Column(String, nullable=True)
    user_data = Column(Text)   # JSON string
    sections = Column(Text)    # JSON string

    created_at = Column(String)