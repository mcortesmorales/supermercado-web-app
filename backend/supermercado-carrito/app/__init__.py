from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS  # Importa CORS
from app.config import Config

app = Flask(__name__)
app.config.from_object(Config)
app.debug = True

# Habilita CORS
CORS(app)

mongo = PyMongo(app)

from app import routes

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)