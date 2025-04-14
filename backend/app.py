from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from models import db
from routes import create_routes
import config

app = Flask(__name__)
app.config.from_object(config)
CORS(app)
db.init_app(app)
migrate = Migrate(app, db)
create_routes(app)

if __name__ == '__main__':
    app.run(debug=True)
