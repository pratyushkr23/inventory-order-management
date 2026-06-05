from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.schemas.customer import CustomerCreate


def create_customer(
    db: Session,
    customer: CustomerCreate
):
    existing_customer = (
        db.query(Customer)
        .filter(Customer.email == customer.email)
        .first()
    )

    if existing_customer:
        raise ValueError("Email already exists")

    db_customer = Customer(
        full_name=customer.full_name,
        email=customer.email,
        phone_number=customer.phone_number
    )

    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)

    return db_customer


def get_customers(db: Session):
    return db.query(Customer).all()


def get_customer_by_id(
    db: Session,
    customer_id: int
):
    return (
        db.query(Customer)
        .filter(Customer.id == customer_id)
        .first()
    )


def delete_customer(
    db: Session,
    customer_id: int
):
    customer = (
        db.query(Customer)
        .filter(Customer.id == customer_id)
        .first()
    )

    if not customer:
        return False

    db.delete(customer)
    db.commit()

    return True