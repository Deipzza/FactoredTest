from typing import List
import fastapi as _fastapi
import fastapi.security as _security
import sqlalchemy.orm as _orm
import services as _services
import schemas as _schemas

app = _fastapi.FastAPI()

@app.post("/api/users")
async def create_user(
    user: _schemas.UserCreate, 
    db: _orm.Session = _fastapi.Depends(_services.get_db)
):
    db_user = await _services.get_user_by_email(user.email, db)  # async func
    
    # If user already exists in the database
    if db_user:
        raise _fastapi.HTTPException(
            status_code = 400, 
            detail = "Email already in use"
        )

    user = await _services.create_user(user, db)

    return await _services.create_token(user)

@app.post("/api/token")
async def generate_token(
    form_data: _security.OAuth2PasswordRequestForm = _fastapi.Depends(),
    db: _orm.Session = _fastapi.Depends(_services.get_db)
):
    user = await _services.authenticate_user(
        form_data.username,
        form_data.password,
        db
    )
    
    if not user:
        raise _fastapi.HTTPException(
            status_code = 401,
            detail = "Invalid Credentials"
        )

    return await _services.create_token(user)

# Retrieve credentials of the authenticated user
@app.get("/api/users/me", response_model=_schemas.User)
async def get_user(
    user: _schemas.User = _fastapi.Depends(_services.get_current_user)
):
    return user

# Create skills
@app.post("/api/skills", response_model = _schemas.Skill)
async def create_skill(
    skill: _schemas.SkillCreate,
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db)
):
    return await _services.create_skill(user = user, db = db, skill = skill)

# Return all skills of the given user
@app.get("/api/skills", response_model = List[_schemas.Skill])
async def get_skills(
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db)
):
    return await _services.get_skills(user = user, db = db)

# Return a specific skill given by its id
@app.get("/api/skills/{skill_id}", status_code = 200)
async def get_skill(
    skill_id: int,
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db)
):
    return await _services.get_skill(skill_id, user, db)

# Delete a skill from a user by its id
@app.delete("/api/skills/{skill_id}", status_code = 204)
async def delete_skill(
    skill_id: int,
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db)
):
    await _services.delete_skill(skill_id, user, db)

    return {"message": "Successfully deleted"}

# Update a skill from a user by its id
@app.put("/api/skills/{skill_id}", status_code = 200)
async def update_skill(
    skill_id: int,
    skill: _schemas.SkillCreate,
    user: _schemas.User = _fastapi.Depends(_services.get_current_user),
    db: _orm.Session = _fastapi.Depends(_services.get_db)
):
    await _services.update_skill(skill_id, skill, user, db)

    return {"message": "Successfully updated"}

@app.get("/api")
async def root():
    return {"message": "Company's employer management system"}