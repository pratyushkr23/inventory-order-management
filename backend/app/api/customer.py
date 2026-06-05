from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.customer import (
    CustomerCreate,
    CustomerResponse
)
from app.services.customer_service import (
    create_customer,
    get_customers,
    get_customer_by_id,
    delete_customer
)

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)


@router.post(
    "/",
    response_model=CustomerResponse,
    status_code=201
)
def create_customer_endpoint(
    customer: CustomerCreate,
    db: Session = Depends(get_db)
):
    try:
        return create_customer(db, customer)

    except ValueError as e:
        raise HTTPException(
            status_code=409,
            detail=str(e)
        )


@router.get(
    "/",
    response_model=list[CustomerResponse]
)
def get_all_customers(
    db: Session = Depends(get_db)
):
    return get_customers(db)


@router.get(
    "/{customer_id}",
    response_model=CustomerResponse
)
def get_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):
    customer = get_customer_by_id(
        db,
        customer_id
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return customer


@router.delete("/{customer_id}")
def delete_customer_endpoint(
    customer_id: int,
    db: Session = Depends(get_db)
):
    deleted = delete_customer(
        db,
        customer_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return {
        "message": "Customer deleted successfully"
    }