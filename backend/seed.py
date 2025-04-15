from app import app
from models import db, User, Plant, WateringLog
from datetime import datetime, timedelta
import random

def seed_data():
    print("Starting seed...")

    # Reset database
    db.drop_all()
    db.create_all()

    # Create users
    users = [
        User(username="plant_lover"),
        User(username="urban_gardener"),
        User(username="green_thumb"),
        User(username="botany_enthusiast")
    ]
    db.session.add_all(users)
    db.session.commit()

    # Create plants
    plants_data = [
        {
            "name": "Snake Plant",
            "description": "Also known as Mother-in-Law's Tongue, this hardy plant purifies air and thrives on neglect.",
            "watering_frequency": "Every 2-3 weeks",
            "image": "https://www.thespruce.com/thmb/SsHaPRyZppWJ-ZHmbKhl_vdBWBo=/2048x0/filters:no_upscale():max_bytes(150000):strip_icc()/snake-plant-care-overview-1902772-04-d3990a1d0e1d4202a824e929abb12fc1-349b52d646f04f31962707a703b94298.jpeg"
        },
        {
            "name": "Monstera Deliciosa",
            "description": "Popular for its large, holey leaves. Grows well in bright, indirect light.",
            "watering_frequency": "Weekly",
            "image": "https://www.beardsanddaisies.co.uk/cdn/shop/files/P24MonsteraMP-CoolGreyCapri_900x.jpg?v=1736336527"
        },
        {
            "name": "Fiddle Leaf Fig",
            "description": "A trendy but finicky plant that loves consistent moisture and bright light.",
            "watering_frequency": "Every 7-10 days",
            "image": "https://plantdrop.co.uk/cdn/shop/files/PlantDrop-25-4-242870-Credit-TomGriffiths-Tomgphoto.jpg?v=1716919233"
        },
        {
            "name": "ZZ Plant",
            "description": "Extremely drought-tolerant with glossy leaves. Perfect for beginners.",
            "watering_frequency": "Every 3-4 weeks",
            "image": "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1684789715-the_sill-variant-white_gloss-zz_plant.jpg?crop=1xw:0.966xh;center,top&resize=980:*"
        },
        {
            "name": "Pothos",
            "description": "Trailing vine that's nearly indestructible. Great for hanging baskets.",
            "watering_frequency": "Every 1-2 weeks",
            "image": "https://www.thespruce.com/thmb/t3_RXX51zQph3heIg5gU5LiVTnE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/jessenia-pothos-care-guide-6260923-6-80f85453ce7244bca1d6f4f5f200f606.jpg"
        },
        {
            "name": "Peace Lily",
            "description": "Produces white flowers and thrives in low light conditions.",
            "watering_frequency": "Weekly",
            "image": "https://www.happyhouseplants.co.uk/cdn/shop/files/DSC_2449_1080x.jpg?v=1697369324"
        },
        {
            "name": "Aloe Vera",
            "description": "Succulent with medicinal properties. The gel inside soothes burns.",
            "watering_frequency": "Every 2-3 weeks",
            "image": "https://img.crocdn.co.uk/images/products2/pl/20/00/02/77/pl2000027723.jpg?width=940&height=940"
        },
        {
            "name": "Spider Plant",
            "description": "Produces baby plantlets that hang down. Great for purifying air.",
            "watering_frequency": "Weekly",
            "image": "https://www.pumpkinbeth.com/wp-content/uploads/2023/12/AC231683-scaled.jpg"
        },
        {
            "name": "Rubber Plant",
            "description": "Has large, glossy leaves that can grow quite large over time.",
            "watering_frequency": "Every 1-2 weeks",
            "image": "https://media.diy.com/is/image/KingfisherDigital/ficus-elastica-rubber-tree-indoor-plant-in-8-5cm-pot-mixed-varieties~5061047680155_06c_MP?$MOB_PREV$&$width=600&$height=600"
        },
        {
            "name": "Chinese Money Plant",
            "description": "Also called Pilea, with unique circular leaves on long petioles.",
            "watering_frequency": "Every 7-10 days",
            "image": "https://www.gardenia.net/wp-content/uploads/2024/03/shutterstock_2431416235.jpg"
        },
        {
            "name": "String of Pearls",
            "description": "Unique succulent with trailing stems of bead-like leaves.",
            "watering_frequency": "Every 2 weeks",
            "image": "https://www.dahingplants.com/cdn/shop/products/hangingstringofpearls.jpg?v=1651524624"
        },
        {
            "name": "Philodendron",
            "description": "Easy-care plant with heart-shaped leaves that comes in many varieties.",
            "watering_frequency": "Every 1-2 weeks",
            "image": "https://cdn11.bigcommerce.com/s-oqm1pc/images/stencil/1280x1280/products/6716/28196/MonsteraDeliciosa_TerraCotta_1800x1800_06cde146-4169-4747-ae29-2c4692a89ba1__30058.1713469988.jpg?c=3"
        },
        {
            "name": "Jade Plant",
            "description": "Succulent with thick, woody stems and oval leaves. Symbol of good luck.",
            "watering_frequency": "Every 2-3 weeks",
            "image": "https://www.bhg.com/thmb/kTjA4BxwEU3QQcrYBn4kVTRzejA=/1245x0/filters:no_upscale():strip_icc()/jade-plant-moss-accent-table-c503ce13-9538bbfb99874b278a195fb5de4fee1a.jpg"
        },
        {
            "name": "Boston Fern",
            "description": "Lush, feathery fronds that thrive in humid conditions.",
            "watering_frequency": "2-3 times per week",
            "image": "https://cdn.mos.cms.futurecdn.net/r4jHhHZk9V9sh5jqs6pM7W-1200-80.jpg"
        },
        {
            "name": "Orchid",
            "description": "Elegant flowering plant that requires specific care to rebloom.",
            "watering_frequency": "Every 7-10 days",
            "image": "https://pistilflowers.com/wp-content/uploads/2021/04/orchid-pwhite-group-solo-scaled-e1682087098862-1280x1564.jpeg"
        },
        {
            "name": "Calathea",
            "description": "Beautiful patterned leaves that move throughout the day (nyctinasty).",
            "watering_frequency": "Weekly",
            "image": "https://www.ikea.com/at/en/images/products/calathea-potted-plant-calathea-assorted__0900579_pe594586_s5.jpg?f=s"
        },
        {
            "name": "Lucky Bamboo",
            "description": "Actually a type of Dracaena, often grown in water with decorative stalks.",
            "watering_frequency": "Keep water fresh (weekly changes)",
            "image": "https://www.ikea.com/images/several-lukcy-bamboo-shoots-in-a-vase-on-a-light-oak-table-967b8cc1e1f53bfba7d30c60036c4a1c.jpeg?f=s"
        },
        {
            "name": "Croton",
            "description": "Colorful foliage plant with vibrant red, orange, and yellow leaves.",
            "watering_frequency": "Weekly",
            "image": "https://www.ugaoo.com/cdn/shop/products/large-croton-petra-32168846196868.jpg?v=1673865898"
        },
        {
            "name": "Cactus Mix",
            "description": "Collection of various cacti with different shapes and sizes.",
            "watering_frequency": "Every 3-4 weeks",
            "image": "https://www.happygreenshop.com/3970-large_default/cactus-mix.jpg"
        },
        {
            "name": "Bird of Paradise",
            "description": "Tropical plant with large, banana-like leaves that can grow very tall.",
            "watering_frequency": "Weekly",
            "image": "https://www.homescapesonline.com/pub/media/catalog/product/cache/c24d4946486060f80c2d46dfde08e117/a/p/ap1593-1.jpg"
        }
    ]

    plants = []
    for pdata in plants_data:
        plant = Plant(
            name=pdata["name"],
            description=pdata["description"],
            watering_frequency=pdata["watering_frequency"],
            image=pdata["image"]
        )
        plants.append(plant)
    
    db.session.add_all(plants)
    db.session.commit()

    # Create sample watering logs
    water_types = ["fresh water", "rain water", "salt water"]
    for _ in range(10):
        log = WateringLog(
            date=(datetime.now() - timedelta(days=random.randint(0, 10))).strftime("%Y-%m-%d"),
            water_type=random.choice(water_types),
            user_id=random.choice(users).id,
            plant_id=random.choice(plants).id
        )
        db.session.add(log)

    db.session.commit()
    print("Seed completed successfully!")

if __name__ == '__main__':
    with app.app_context():
        seed_data()












# from app import app
# from models import db, User, Plant

# with app.app_context():
#     db.drop_all()
#     db.create_all()

#     user1 = User(username="Alice")
#     user2 = User(username="Bob")

#     plant1 = Plant(
#         name="Monstera",
#         description="Lush green indoor plant",
#         watering_frequency="Every 3 days",
#         image="data:image/jpeg;base64,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"
#     )
#     plant2 = Plant(
#         name="Cactus",
#         description="Needs little water",
#         watering_frequency="Every 10 days",
#         image="data:image/jpeg;base64,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"
#     )

#     db.session.add_all([user1, user2, plant1, plant2])
#     db.session.commit()
#     print("Seeded data.")
