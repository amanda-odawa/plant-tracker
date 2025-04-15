from flask import request
from flask_restful import Resource, Api
from models import db, User, Plant, WateringLog

def create_routes(app):
    api = Api(app)

    # PLANTS
    class PlantList(Resource):
        def get(self):
             return [p.to_dict() for p in Plant.query.order_by(Plant.id.desc()).all()]

        def post(self):
            data = request.json
            plant = Plant(**data)
            db.session.add(plant)
            db.session.commit()
            return plant.to_dict()

    class PlantItem(Resource):
        def get(self, plant_id):  
            plant = Plant.query.get_or_404(plant_id)
            return plant.to_dict()

        def put(self, plant_id):
            plant = Plant.query.get_or_404(plant_id)
            for k, v in request.json.items():
                setattr(plant, k, v)
            db.session.commit()
            return plant.to_dict()

        def delete(self, plant_id):
            plant = Plant.query.get_or_404(plant_id)
            db.session.delete(plant)
            db.session.commit()
            return {'message': 'Plant deleted successfully'}, 200

    # USERS
    class UserList(Resource):
        def get(self):
            return [u.to_dict() for u in User.query.all()]

        def post(self):
            data = request.json
            # Check if the user already exists
            existing_user = User.query.filter_by(username=data['username']).first()
            if existing_user:
                return {'message': 'User already exists'}, 400  

            user = User(**data)
            db.session.add(user)
            db.session.commit()
            return user.to_dict(), 201 

    # WATERING LOGS
    class WaterLogList(Resource):
        def get(self):
            logs = WateringLog.query.order_by(WateringLog.id.desc()).all()
            return [log.to_dict() for log in logs]

        def post(self):
            data = request.json
            log = WateringLog(**data)
            db.session.add(log)
            db.session.commit()
            return log.to_dict()

    # Register all routes
    api.add_resource(PlantList, '/plants')
    api.add_resource(PlantItem, '/plants/<int:plant_id>')
    api.add_resource(UserList, '/users')
    api.add_resource(WaterLogList, '/logs')
