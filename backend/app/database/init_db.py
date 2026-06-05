from app.database.database import Base, engine

# Import all models
from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order
from app.models.order_item import OrderItem

Base.metadata.create_all(bind=engine)

print("Tables created successfully!")