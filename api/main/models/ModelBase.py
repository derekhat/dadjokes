from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy import create_engine
from sqlalchemy.engine.url import URL
from ..config import config

def get_database_uri():
    db_uri = URL(
        'postgresql+psycopg2',
        username=config['DB_USER'],
        password=config['DB_PASSWORD'],
        host=config['DB_HOST'],
        database=config['DB_NAME'],
        )
    return db_uri

ModelBase = declarative_base()

_database_session = None

def get_session():
    global _database_session
    if _database_session is None:
        engine = create_engine(get_database_uri(), \
            pool_size=9, \
            max_overflow=0)
        _database_session = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

    return _database_session
