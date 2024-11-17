from pydantic import BaseModel
from typing import Optional, List, Dict

class VolumeModel(BaseModel):
    name: str
    driver: Optional[str] = None
    mount_point: Optional[str] = None