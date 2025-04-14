from flask import request
from flask_restful import Resource, Api
from models import db, User, Plant, WateringLog

def create_routes(app):
    api = Api(app)

    # PLANTS
    class PlantList(Resource):
        def get(self):
            return [p.to_dict() for p in Plant.query.all()]

        def post(self):
            data = request.json
            plant = Plant(**data)
            db.session.add(plant)
            db.session.commit()
            return plant.to_dict()

    class PlantItem(Resource):
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
            return {'message': 'deleted'}

    # USERS
    class UserList(Resource):
        def get(self):
            return [u.to_dict() for u in User.query.all()]

        def post(self):
            data = request.json
            user = User(**data)
            db.session.add(user)
            db.session.commit()
            return user.to_dict()

    # WATERING LOGS
    class WaterLogList(Resource):
        def get(self):
            logs = WateringLog.query.all()
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
