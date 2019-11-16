from flask import Flask
from flask_cors import CORS
from .config import config
from .endpoints import main_api

def create_app():

    new_app = Flask(__name__, instance_relative_config=True)
    CORS(new_app)
    new_app.config.from_pyfile('config-prod.py')

    for config_key in new_app.config.keys():
        config[config_key] = new_app.config[config_key]

    new_app.register_blueprint(main_api, url_prefix='/')
    return new_app



app = create_app()