from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username
        }

# Plant:WateringLog - 1:M
class Plant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.Text)
    watering_frequency = db.Column(db.String(50))
    image = db.Column(db.String(300))

    logs = db.relationship('WateringLog', backref='plant', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "watering_frequency": self.watering_frequency,
            "image": self.image
        }

# User:WateringLog - 1:M
class WateringLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(50))
    water_type = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    plant_id = db.Column(db.Integer, db.ForeignKey('plant.id'))

    user = db.relationship('User', backref='logs')

    def to_dict(self):
        return {
            "id": self.id,
            "date": self.date,
            "water_type": self.water_type,
            "user": self.user.username if self.user else None,
            "plant": self.plant.name if self.plant else None,
            'plant_image': self.plant.image if self.plant else None 
        }
