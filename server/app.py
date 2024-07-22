from flask import Flask, request, jsonify, session, redirect, url_for
from flask_cors import CORS
from prompt_handler import generate_sql_prompt
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
from flask_session import Session
from models import db, User
import os

# Load environment variables
load_dotenv()

# App instance
app = Flask(__name__)
CORS(app, supports_credentials=True)  # Enable CORS for all routes

# Configure SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI', 'sqlite:///sql_query_generator.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your_secret_key_here')  # Replace with your own secret key

# Configure session
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

db.init_app(app)

# Create tables based on models
with app.app_context():
    db.create_all()

# /api/home
@app.route('/api/home', methods=['GET'])
def return_home():
    return jsonify(message="Welcome to SQL Query generator")

# /generate_sql
@app.route('/generate_sql', methods=['POST'])
def generate_sql():
    data = request.json
    prompt = data.get('prompt')

    if not prompt:
        return jsonify({"error": "Prompt is required"}), 400

    response = generate_sql_prompt(prompt)

    if "error" in response or "invalid input" in response:
        return jsonify({"error": response}), 500

    return jsonify({
        "prompt": prompt,
        "sql_query": response
    })

# /user/<username>
@app.route('/user/<username>', methods=['GET'])
def get_user(username):
    user = User.query.filter_by(username=username).first()

    if user:
        return jsonify({
            "username": user.username,
            "email": user.email  # Adjust based on your User model attributes
        })
    else:
        return jsonify({"error": "User not found"}), 404

# /signup
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    if not username or not password or not email:
        return jsonify({"error": "Username, password, and email are required"}), 400

    if User.query.filter_by(username=username).first() is not None:
        return jsonify({"error": "Username already exists"}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password, email=email)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

# /logout
@app.route('/logout', methods=['POST'])
def logout():
    # Clear session
    session.clear()
    return jsonify({"message": "Logged out successfully"}), 200

# /users
@app.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    users_list = []
    for user in users:
        users_list.append({
            "username": user.username,
            "email": user.email
        })
    return jsonify(users_list), 200

# /signin
@app.route('/signin', methods=['POST'])
def signin():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    user = User.query.filter_by(username=username).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid username or password"}), 401

    # Store user session
    session['user_id'] = user.id
    session['username'] = user.username

    return jsonify({"message": "Sign-in successful"}), 200

# /current_user
@app.route('/current_user', methods=['GET'])
def get_current_user():
    if 'username' not in session:
        return jsonify({"error": "Not logged in"}), 401

    username = session['username']
    user = User.query.filter_by(username=username).first()

    if user:
        return jsonify({
            "username": user.username,
            "email": user.email
        })
    else:
        return jsonify({"error": "User not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=8080)
