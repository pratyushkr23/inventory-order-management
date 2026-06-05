from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.product import (
    ProductCreate,
    ProductUpdate,
    ProductResponse
)
from app.services.product_service import (
    create_product,
    get_products,
    get_product_by_id,
    update_product,
    delete_product
)

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.post("/", response_model=ProductResponse, status_code=201)
def create_product_endpoint(
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    try:
        return create_product(db, product)

    except ValueError as e:
        raise HTTPException(
            status_code=409,
            detail=str(e)
        )
    
@router.get("/", response_model=list[ProductResponse])
def get_all_products(
    db: Session = Depends(get_db)
):
    return get_products(db)


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = get_product_by_id(db, product_id)

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product


@router.put("/{product_id}", response_model=ProductResponse)
def update_product_endpoint(
    product_id: int,
    product: ProductUpdate,
    db: Session = Depends(get_db)
):
    try:
        updated_product = update_product(
            db,
            product_id,
            product
        )

        if not updated_product:
            raise HTTPException(
                status_code=404,
                detail="Product not found"
            )

        return updated_product

    except ValueError as e:
        raise HTTPException(
            status_code=409,
            detail=str(e)
        )


@router.delete("/{product_id}")
def delete_product_endpoint(
    product_id: int,
    db: Session = Depends(get_db)
):
    deleted = delete_product(
        db,
        product_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return {
        "message": "Product deleted successfully"
    }