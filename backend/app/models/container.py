from pydantic import BaseModel
from typing import Optional, List, Dict

class ContainerModel(BaseModel):
    name: str
    image: str
    status: Optional[str] = 'Running'
    ports: Optional[List[str]] = None
    env_vars: Optional[List[str]] = None
    volumes: Optional[List[str]] = None
    network: Optional[str] = None
    command: Optional[str] = None
    restart_policy: Optional[Dict[str, str]] = None
    healthcheck: Optional[str] = None
    cpu_quota: Optional[int] = None
    mem_limit: Optional[str] = None
    user: Optional[str] = None
    hostname: Optional[str] = None
    labels: Optional[List[str]] = None
    remove: Optional[bool] = None
    log_config: Optional[Dict[str, str]] = None