from pydantic import BaseModel
from datetime import datetime


class OrderItemDetail(BaseModel):
    product_name: str
    quantity: int
    unit_price: float

    class Config:
        from_attributes = True


class OrderDetailResponse(BaseModel):
    id: int
    customer_name: str
    total_amount: float
    created_at: datetime
    items: list[OrderItemDetail]

    class Config:
        from_attributes = True