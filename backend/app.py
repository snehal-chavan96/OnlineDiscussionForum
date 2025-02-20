from flask import Flask
from flask_cors import CORS
from database import init_db 

app = Flask(__name__)

CORS(app, origins="*")

init_db(app)

from routes.auth import auth  
from routes.dashboard import dashboard 

app.register_blueprint(auth, url_prefix='/auth')
app.register_blueprint(dashboard, url_prefix='/dashboard') 

if __name__ == "__main__":
    app.run(debug=True)
