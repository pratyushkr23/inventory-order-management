from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.order import (
    OrderCreate,
    OrderResponse
)

from app.schemas.order_details import (
    OrderDetailResponse
)

from app.services.order_service import (
    get_order_details
)

from app.services.order_service import (
    create_order,
    get_orders,
    get_order_by_id,
    delete_order,
    get_orders_with_customer_names
)

from app.schemas.order_response import (
    OrderListResponse
)

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)

@router.post(
    "/",
    response_model=OrderResponse,
    status_code=201
)
def create_order_endpoint(
    order: OrderCreate,
    db: Session = Depends(get_db)
):
    try:
        return create_order(db, order)

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

@router.get(
    "/",
    response_model=list[OrderListResponse]
)
def get_all_orders(
    db: Session = Depends(get_db)
):
    return get_orders_with_customer_names(db)

@router.get(
    "/{order_id}",
    response_model=OrderResponse
)
def get_order(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = get_order_by_id(
        db,
        order_id
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return order

@router.delete("/{order_id}")
def delete_order_endpoint(
    order_id: int,
    db: Session = Depends(get_db)
):
    deleted = delete_order(
        db,
        order_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return {
        "message": "Order deleted successfully"
    }

@router.get(
    "/{order_id}/details",
    response_model=OrderDetailResponse
)
def get_order_details_endpoint(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = get_order_details(
        db,
        order_id
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return order