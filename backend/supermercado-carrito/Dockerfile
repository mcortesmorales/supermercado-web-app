FROM python:3.10-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de la aplicación
COPY . /app

# Instala las dependencias
RUN pip install -r requirements.txt

# Expone el puerto del servicio
EXPOSE 5001

# Comando para iniciar la aplicación
CMD ["flask", "run", "--host=0.0.0.0","--port=5001"]
