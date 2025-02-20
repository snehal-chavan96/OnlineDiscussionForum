from flask import Blueprint, request, jsonify
from bson import ObjectId
from database import mongo

dashboard = Blueprint('dashboard', __name__)

@dashboard.route('/profile/<user_id>', methods=['GET'])
def get_user_profile(user_id):
    try:
        user_profile = mongo.db.profiles.find_one({'_id': ObjectId(user_id)}, {'_id': 0}) 

        if not user_profile:
            return jsonify({'success': False, 'message': 'Profile not found'}), 404

        return jsonify({'success': True, 'profile': user_profile})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 400


@dashboard.route('/recent-discussions', methods=['GET'])
def get_recent_discussions():
    try:
        discussions = list(mongo.db.discussions.find({}, {'_id': 1, 'title': 1, 'created_at': 1})
                           .sort([("created_at", -1), ("_id", -1)]).limit(5))

        for discussion in discussions:
            discussion['_id'] = str(discussion['_id'])

        return jsonify({'success': True, 'recent_discussions': discussions})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 400

@dashboard.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    try:
        leaderboard = list(mongo.db.leaderboard.find({}, {'_id': 0, 'username': 1, 'score': 1})
                           .sort("score", -1).limit(5))

        return jsonify({'success': True, 'leaderboard': leaderboard})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 400
