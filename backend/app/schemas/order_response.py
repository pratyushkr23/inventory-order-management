from pydantic import BaseModel
from datetime import datetime


class OrderListResponse(BaseModel):
    id: int
    customer_name: str
    total_amount: float
    created_at: datetime

    class Config:
        from_attributes = True