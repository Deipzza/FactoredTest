import datetime as _dt
import pydantic as _pydantic

class _UserBase(_pydantic.BaseModel):
    email: str
    name: str
    position: str


class UserCreate(_UserBase):
    hashed_password: str

    class Config:
        orm_mode = True


class User(_UserBase):
    id: int

    class Config:
        orm_mode = True


class _SkillBase(_pydantic.BaseModel):
    skill_name: str
    skill_level: int


class SkillCreate(_SkillBase):
    pass


class Skill(_SkillBase):
    id: int
    owner_id = int
    date_created = _dt.datetime
    date_last_updated = _dt.datetime

    class Config:
        orm_mode = True