# Usa una imagen base de Python
FROM python:3.10-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de la aplicación
COPY . /app

# Instala las dependencias
RUN pip install -r requirements.txt

# Expone el puerto 5000 para Flask
EXPOSE 5000

# Comando para iniciar la aplicación Flask
CMD ["flask", "run", "--host=0.0.0.0"]
