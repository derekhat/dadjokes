from sqlalchemy import Column, BigInteger, String, ForeignKey, TIMESTAMP
from sqlalchemy.orm import relationship
from .ModelBase import ModelBase


class Telling(ModelBase):
    __tablename__ = 'tellings'

    telling_id = Column('telling_id', BigInteger, primary_key=True)
    joke_id = Column('joke_id', BigInteger, ForeignKey('jokes.joke_id'))
    joke = relationship('Joke')
    teller = Column('teller', String)
    joke_time = Column('joke_time', TIMESTAMP, server_default='')

    def as_json(self):
        result = {
            'tellingId': self.telling_id,
            'jokeId': self.joke_id,
            'jokeText': self.joke.joke_text,
            'teller': self.teller,
            'jokeTime': self.joke_time
        }
        return result

