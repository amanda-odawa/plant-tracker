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
            return plant.to_dict(), 201

    class PlantItem(Resource):
        def get(self, plant_id):  
            plant = Plant.query.get(plant_id)
            if not plant:
                return {"error": f"Plant with ID {plant_id} not found"}, 404
            return plant.to_dict()

        def put(self, plant_id):
            plant = Plant.query.get(plant_id)
            if not plant:
                return {"error": f"Plant with ID {plant_id} not found, unable to update"}, 404
            for k, v in request.json.items():
                setattr(plant, k, v)
            db.session.commit()
            return plant.to_dict()

        def delete(self, plant_id):
            plant = Plant.query.get(plant_id)
            if not plant:
                return {"error": f"Plant with ID {plant_id} not found, unable to delete"}, 404
            db.session.delete(plant)
            db.session.commit()
            return {'message': f'Plant with ID {plant_id} deleted successfully'}, 200

    # USERS
    class UserList(Resource):
        def get(self):
            return [u.to_dict() for u in User.query.all()]

        def post(self):
            data = request.json
            existing_user = User.query.filter_by(username=data['username']).first()
            if existing_user:
                return {'error': 'User already exists'}, 400  
            user = User(**data)
            db.session.add(user)
            db.session.commit()
            return user.to_dict(), 201 

    class UserItem(Resource):
        def get(self, user_id):  
            user = User.query.get(user_id)
            if not user:
                return {"error": f"User with ID {user_id} not found"}, 404
            return user.to_dict()

    # WATERING LOGS
    class WaterLogList(Resource):
        def get(self):
            logs = WateringLog.query.order_by(WateringLog.id.desc()).all()
            return [log.to_dict() for log in logs]

        def post(self):
            data = request.json
            user = User.query.get(data.get('user_id'))
            plant = Plant.query.get(data.get('plant_id'))

            if not user:
                return {"error": f"User with ID {data.get('user_id')} does not exist"}, 400
            if not plant:
                return {"error": f"Plant with ID {data.get('plant_id')} does not exist"}, 400

            log = WateringLog(**data)
            db.session.add(log)
            db.session.commit()
            db.session.refresh(log)
            return log.to_dict(), 201


    class WaterLogItem(Resource):
        def get(self, log_id):  
            log = WateringLog.query.get(log_id)
            if not log:
                return {"error": f"Watering log with ID {log_id} not found"}, 404
            return log.to_dict()

    # Register all routes
    api.add_resource(PlantList, '/plants')
    api.add_resource(PlantItem, '/plants/<int:plant_id>')
    api.add_resource(UserList, '/users')
    api.add_resource(UserItem, '/users/<int:user_id>')
    api.add_resource(WaterLogList, '/logs')
    api.add_resource(WaterLogItem, '/logs/<int:log_id>')
