from pydantic import BaseModel
from typing import Optional

class ImageModel(BaseModel):
    name: str
    tag: Optional[str] = None
   