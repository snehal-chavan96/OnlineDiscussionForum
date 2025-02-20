from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from database import get_users_collection

auth = Blueprint('auth', __name__)


users_collection = None 

@auth.before_app_request
def setup_users_collection():
    """Ensure users_collection is initialized before first request."""
    global users_collection
    users_collection = get_users_collection()

# Signup Route
@auth.route('/signup', methods=['POST'])
def signup():
    data = request.json

    # Extract data
    full_name = data.get('full_name')
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')
    interests = data.get('interests', [])

    # Check if user already exists
    if users_collection.find_one({'email': email}):
        return jsonify({'success': False, 'message': 'Email already registered'}), 400
    if users_collection.find_one({'username': username}):
        return jsonify({'success': False, 'message': 'Username already taken'}), 400

    # Hash the password for security
    hashed_password = generate_password_hash(password)

    # Save user to database
    new_user = {
        'full_name': full_name,
        'username': username,
        'email': email,
        'password': hashed_password,
        'role': role,
        'interests': interests
    }
    users_collection.insert_one(new_user)

    return jsonify({'success': True, 'message': 'Signup successful'}), 201

# Signin Route
@auth.route('/signin', methods=['POST'])
def signin():
    data = request.json

    email = data.get('email')
    password = data.get('password')

    # Find user by email
    user = users_collection.find_one({'email': email})
    if not user:
        return jsonify({'success': False, 'message': 'User not found'}), 404

    # Verify password
    if not check_password_hash(user['password'], password):
        return jsonify({'success': False, 'message': 'Incorrect password'}), 401

    return jsonify({'success': True, 'message': 'Signin successful', 'user': {'username': user['username'], 'email': user['email']}})
