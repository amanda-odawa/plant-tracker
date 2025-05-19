from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_migrate import Migrate
from models import db
from routes import create_routes
import config
import os

app = Flask(__name__, static_folder='frontend/build')
app.config.from_object(config)
CORS(app)
db.init_app(app)
migrate = Migrate(app, db)
create_routes(app)

# Serve React static files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
