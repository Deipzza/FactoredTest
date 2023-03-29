import fastapi as _fastapi
import fastapi.security as _security
import jwt as _jwt
import database as _database
import sqlalchemy.orm as _orm
import models as _models
import schemas as _schemas
import passlib.hash as _hash
import os as _os
from dotenv import load_dotenv

BASE_DIR = _os.path.dirname(_os.path.dirname(_os.path.abspath(__file__)))
load_dotenv(_os.path.join(BASE_DIR, 'backend/.env'))
jwt_secret = _os.environ.get("JWT_SECRET")
oauth2schema = _security.OAuth2PasswordBearer(tokenUrl="/api/token")

def create_database():
    return _database.Base.metadata.create_all(bind=_database.engine)

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
        email=user.email, 
        hashed_password=_hash.bcrypt.hash(user.hashed_password)
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

# Create a token
async def create_token(user: _models.User):
    # Takes the module, maps it to the User schema
    user_obj = _schemas.User.from_orm(user)

    # Get JWT token from .env file
    
    token = _jwt.encode(user_obj.dict(), jwt_secret)

    return dict(access_token=token, token_type="bearer")

async def get_current_user(
    db: _orm.Session = _fastapi.Depends(get_db),
    token: str = _fastapi.Depends(oauth2schema)
):
    try:
        payload = _jwt.decode(token, jwt_secret, algorithms=["HS256"])
        user = db.query(_models.User).get(payload["id"])
    except:
        raise _fastapi.HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return _schemas.User.from_orm(user)

async def create_lead(user: _schemas.User, db: _orm.Session, lead: _schemas.LeadCreate):
    lead = _models.Lead(**lead.dict(), owner_id=user.id)
    db.add(lead)
    db.commit()
    db.refresh(lead)

    return _schemas.Lead.from_orm(lead)

async def get_leads(user: _schemas.User, db: _orm.Session):
    leads = db.query(_models.Lead).filter_by(owner_id=user.id)

    return list(map(_schemas.Lead.from_orm, leads))