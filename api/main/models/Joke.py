from sqlalchemy import Column, BigInteger, String, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from .ModelBase import ModelBase

class Joke(ModelBase):
    __tablename__ = 'jokes'

    joke_id = Column('joke_id', BigInteger, primary_key=True)
    joke_text = Column('joke_text', String)


    def as_json(self):
        result = {
            'jokeId': self.joke_id,
            'jokeText': self.joke_text
        }
        return result
