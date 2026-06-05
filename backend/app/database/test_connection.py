from sqlalchemy import text
from app.database.database import engine

try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT version();"))
        print("Database connected successfully!")
        print(result.fetchone()[0])

except Exception as e:
    print("Connection failed!")
    print(e)