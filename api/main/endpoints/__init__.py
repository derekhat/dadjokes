from pprint import pprint
from flask import Flask
from flask import request
from flask import jsonify
from flask import Blueprint
from sqlalchemy.sql.expression import func
from ..models.Joke import Joke
from ..models.Telling import Telling
from ..models import ModelBase

main_api = Blueprint('main_api', __name__)

@main_api.route('/tellings', methods=['POST'])
def tell_joke():
    teller_name = request.json.get('tellerName')
    session = ModelBase.get_session()
    joke_query = session.query(Joke).order_by(func.random()).limit(1)
    random_joke = joke_query.first()
    random_joke_id = random_joke.joke_id
    random_joke_text = random_joke.joke_text;
    new_telling = Telling(teller=teller_name, joke_id=random_joke_id)
    session.add(new_telling)
    session.commit()
    session.close()
    return jsonify({'teller': teller_name, 'jokeText': random_joke_text})


@main_api.route('/tellingsSince/<id>', methods=['GET'])
def get_tellings(id):
    session = ModelBase.get_session()
    query = session.query(Telling).filter(Telling.telling_id > id).order_by(Telling.joke_time.desc()).limit(10)
    tellings = query.all()
    result = list(map(lambda telling: telling.as_json(), tellings))
    session.commit()
    session.close()
    return jsonify(result)

