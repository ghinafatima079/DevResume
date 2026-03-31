from fastapi import FastAPI
from database import Base, engine
from fastapi import Depends
from sqlalchemy.orm import Session
from database import SessionLocal
import json
from datetime import datetime
from schemas import ResumeCreate, ResumeUpdate
from models import Resume

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def root():
    return {"message": "DevResume API running"}

@app.post("/resumes")
def create_resume(data: ResumeCreate, db: Session = Depends(get_db)):

    new_resume = Resume(
        user_id=data.user_id,
        title=data.title, 
        user_data=json.dumps(data.user_data),
        sections=json.dumps(data.sections),
        created_at=str(datetime.utcnow())
    )

    db.add(new_resume)
    db.commit()
    db.refresh(new_resume)

    return {"message": "Resume saved", "id": new_resume.id}

@app.get("/resumes")
def get_resumes(db: Session = Depends(get_db)):
    resumes = db.query(Resume).all()

    result = []

    for r in resumes:
        result.append({
            "id": r.id,
            "user_id": r.user_id,
            "title": r.title,
            "user_data": json.loads(r.user_data),
            "sections": json.loads(r.sections),
            "created_at": r.created_at
        })

    return result

@app.delete("/resumes/{resume_id}")
def delete_resume(resume_id: int, db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(Resume.id == resume_id).first()

    if not resume:
        return {"error": "Resume not found"}

    db.delete(resume)
    db.commit()

    return {"message": "Deleted"}

Base.metadata.create_all(bind=engine)

@app.put("/resumes/{resume_id}")
def update_resume(resume_id: int, data: ResumeUpdate, db: Session = Depends(get_db)):
    resume = db.query(Resume).filter(Resume.id == resume_id).first()

    if not resume:
        return {"error": "Resume not found"}

    if data.title is not None:
        resume.title = data.title

    db.commit()
    db.refresh(resume)

    return {"message": "Updated"}