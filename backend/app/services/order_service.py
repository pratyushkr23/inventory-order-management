from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.models.product import Product
from app.models.order import Order
from app.models.order_item import OrderItem

from app.schemas.order import OrderCreate

def create_order(
    db: Session,
    order_data: OrderCreate
):
    customer = (
        db.query(Customer)
        .filter(Customer.id == order_data.customer_id)
        .first()
    )

    if not customer:
        raise ValueError("Customer not found")

    total_amount = 0

    order_items = []

    for item in order_data.items:

        product = (
            db.query(Product)
            .filter(Product.id == item.product_id)
            .first()
        )

        if not product:
            raise ValueError(
                f"Product {item.product_id} not found"
            )

        if product.quantity_in_stock < item.quantity:
            raise ValueError(
                f"Insufficient stock for {product.name}"
            )

        line_total = (
            product.price * item.quantity
        )

        total_amount += line_total

        order_items.append(
            {
                "product": product,
                "quantity": item.quantity,
                "unit_price": product.price
            }
        )

    order = Order(
        customer_id=order_data.customer_id,
        total_amount=total_amount
    )

    db.add(order)
    db.flush()

    for item in order_items:

        order_item = OrderItem(
            order_id=order.id,
            product_id=item["product"].id,
            quantity=item["quantity"],
            unit_price=item["unit_price"]
        )

        db.add(order_item)

        item["product"].quantity_in_stock -= (
            item["quantity"]
        )

    db.commit()
    db.refresh(order)

    return order

def get_orders(db: Session):
    return db.query(Order).all()


def get_order_by_id(
    db: Session,
    order_id: int
):
    return (
        db.query(Order)
        .filter(Order.id == order_id)
        .first()
    )


def delete_order(
    db: Session,
    order_id: int
):
    order = (
        db.query(Order)
        .filter(Order.id == order_id)
        .first()
    )

    if not order:
        return False

    db.delete(order)
    db.commit()

    return True

def get_orders_with_customer_names(
    db: Session
):
    orders = db.query(Order).all()

    result = []

    for order in orders:
        result.append(
            {
                "id": order.id,
                "customer_name":
                    order.customer.full_name,
                "total_amount":
                    order.total_amount,
                "created_at":
                    order.created_at
            }
        )

    return result

def get_order_details(
    db: Session,
    order_id: int
):
    order = (
        db.query(Order)
        .filter(Order.id == order_id)
        .first()
    )

    if not order:
        return None

    return {
        "id": order.id,
        "customer_name":
            order.customer.full_name,
        "total_amount":
            order.total_amount,
        "created_at":
            order.created_at,
        "items": [
            {
                "product_name":
                    item.product.name,
                "quantity":
                    item.quantity,
                "unit_price":
                    item.unit_price
            }
            for item in order.items
        ]
    }