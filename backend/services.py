import fastapi as _fastapi
import fastapi.security as _security
import jwt as _jwt
import database as _database
import sqlalchemy.orm as _orm
import models as _models
import schemas as _schemas
import passlib.hash as _hash
import datetime as _dt
import os as _os
from dotenv import load_dotenv

BASE_DIR = _os.path.dirname(_os.path.dirname(_os.path.abspath(__file__)))
load_dotenv(_os.path.join(BASE_DIR, 'backend/.env'))
jwt_secret = _os.environ.get("JWT_SECRET")
oauth2schema = _security.OAuth2PasswordBearer(tokenUrl="/api/token")

def create_database():
    return _database.Base.metadata.create_all(bind = _database.engine)

def get_db():
    db = _database.SessionLocal()
    try:
        yield db
    finally:
        db.close()  # Don´t leave the session opened

async def get_user_by_email(email: str, db: _orm.Session):
    # If there's a user that exists with that email, it returns it. Otherwise
    # returns None.
    return db.query(_models.User).filter(_models.User.email == email).first()

async def create_user(user: _schemas.UserCreate, db: _orm.Session):
    user_obj = _models.User(
        email = user.email,
        name = user.name,
        position = user.position,
        hashed_password = _hash.bcrypt.hash(user.hashed_password)
    )
    
    # Add the user to the database
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj

async def authenticate_user(email: str, password: str, db: _orm.Session):
    # Check if user exists
    user = await get_user_by_email(email = email, db = db)
    if not user:
        return False

    if not user.verify_password(password):
        return False
    
    return user

# Create a new token
async def create_token(user: _models.User):
    # Takes the module and maps it to the User schema
    user_obj = _schemas.User.from_orm(user)

    # Get JWT token from .env file
    
    token = _jwt.encode(user_obj.dict(), jwt_secret)

    return dict(access_token=token, token_type="bearer")

# Return the current authenticated user
async def get_current_user(
    db: _orm.Session = _fastapi.Depends(get_db),
    token: str = _fastapi.Depends(oauth2schema)
):
    try:
        payload = _jwt.decode(token, jwt_secret, algorithms = ["HS256"])
        user = db.query(_models.User).get(payload["id"])
    except:
        raise _fastapi.HTTPException(
            status_code = 401,
            detail = "Invalid email or password"
        )

    return _schemas.User.from_orm(user)

# Create a new skill
async def create_skill(
    user: _schemas.User,
    db: _orm.Session,
    skill: _schemas.SkillCreate
):
    skill = _models.Skill(**skill.dict(), owner_id = user.id)
    db.add(skill)
    db.commit()
    db.refresh(skill)

    return _schemas.Skill.from_orm(skill)

# Return a list of all the skills of the given user
async def get_skills(user: _schemas.User, db: _orm.Session):
    skills = db.query(_models.Skill).filter_by(owner_id = user.id)

    return list(map(_schemas.Skill.from_orm, skills))

async def _skill_selector(skill_id: int, user: _schemas.User, db: _orm.Session):
    skill = (
        db.query(_models.Skill)  # Queries the Skill table
        .filter_by(owner_id = user.id)  # Filters by the owner that created it
        .filter(_models.Skill.id == skill_id)  # Find the id that matches the param
        .first()  # Return the first object that matches
    )

    if skill is None:
        raise _fastapi.HTTPException(
            status_code = 404,
            detail = "Skill does not exist"
        )

    return skill

# Return a specific skill
async def get_skill(skill_id: int, user: _schemas.User, db: _orm.Session):
    skill = await _skill_selector(skill_id = skill_id, user = user, db = db)

    return _schemas.Skill.from_orm(skill)

async def delete_skill(skill_id: int, user: _schemas.User, db: _orm.Session):
    skill = await _skill_selector(skill_id = skill_id, user = user, db = db)
    db.delete(skill)
    db.commit()

async def update_skill(
    skill_id: int,
    skill: _schemas.SkillCreate,
    user: _schemas.User,
    db: _orm.Session
):
    skill_db = await _skill_selector(skill_id = skill_id, user = user, db = db)
    skill_db.skill_name = skill.skill_name
    skill_db.skill_level = skill.skill_level
    skill_db.date_last_updated = _dt.datetime.utcnow()
    db.commit()
    db.refresh(skill_db)

    return _schemas.Skill.from_orm(skill_db)