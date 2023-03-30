import datetime as _dt
import sqlalchemy as _sql
import sqlalchemy.orm as _orm
import passlib.hash as _hash
import database as _database

class User(_database.Base):
    __tablename__ = "users"
    id = _sql.Column(_sql.Integer, primary_key = True, index = True)
    name = _sql.Column(_sql.String, index = True)
    email = _sql.Column(_sql.String, unique = True, index = True)
    position = _sql.Column(_sql.String, index = True)
    hashed_password = _sql.Column(_sql.String)

    skills = _orm.relationship("Skill", back_populates = "owner")

    def verify_password(self, password: str):
        return _hash.bcrypt.verify(password, self.hashed_password)


class Skill(_database.Base):
    __tablename__ = "skills"
    id = _sql.Column(_sql.Integer, primary_key = True, index = True)
    owner_id = _sql.Column(_sql.Integer, _sql.ForeignKey("users.id"))
    skill_name = _sql.Column(_sql.String, index = True)
    skill_level = _sql.Column(_sql.Integer, index = True)
    date_created = _sql.Column(_sql.DateTime, default = _dt.datetime.utcnow)
    date_last_updated = _sql.Column(_sql.DateTime, default = _dt.datetime.utcnow)

    owner = _orm.relationship("User", back_populates = "skills")