from fastapi import FastAPI
from app.container_routes import container_router
from app.image_routes import image_router
from app.volume_routes import volume_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
# Set up CORS to allow connections from your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins; you can restrict it later to your React app's URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods like GET, POST, etc.
    allow_headers=["*"],  # Allows all headers
)
# Registrar las rutas (endpoints) de cada módulo
app.include_router(container_router, prefix="/containers", tags=["Containers"])
app.include_router(image_router, prefix="/images", tags=["Images"])
app.include_router(volume_router, prefix="/volumes", tags=["Volumes"])

# Ruta de bienvenida
@app.get("/")
def read_root():
    return {"message": "Bienvenido a la API de Docker Clone"}

# Para ejecutar el servidor
# uvicorn app.main:app --reload
