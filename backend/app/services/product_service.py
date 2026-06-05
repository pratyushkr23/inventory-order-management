from sqlalchemy.orm import Session

from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate


def create_product(db: Session, product: ProductCreate):

    existing_product = (
        db.query(Product)
        .filter(Product.sku == product.sku)
        .first()
    )

    if existing_product:
        raise ValueError("SKU already exists")

    db_product = Product(
        name=product.name,
        sku=product.sku,
        price=product.price,
        quantity_in_stock=product.quantity_in_stock
    )

    db.add(db_product)
    db.commit()
    db.refresh(db_product)

    return db_product


def get_products(db: Session):
    return db.query(Product).all()


def get_product_by_id(db: Session, product_id: int):
    return (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

def update_product(
    db: Session,
    product_id: int,
    product: ProductUpdate
):
    db_product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not db_product:
        return None

    existing_sku = (
        db.query(Product)
        .filter(
            Product.sku == product.sku,
            Product.id != product_id
        )
        .first()
    )

    if existing_sku:
        raise ValueError("SKU already exists")

    db_product.name = product.name
    db_product.sku = product.sku
    db_product.price = product.price
    db_product.quantity_in_stock = product.quantity_in_stock

    db.commit()
    db.refresh(db_product)

    return db_product


def delete_product(
    db: Session,
    product_id: int
):
    db_product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not db_product:
        return False

    db.delete(db_product)
    db.commit()

    return True