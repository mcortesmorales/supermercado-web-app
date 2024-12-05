FROM python:3.10-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de la aplicación
COPY . /app

# Instala las dependencias
RUN pip install -r requirements.txt


# Establece las variables de entorno para Flask
ENV FLASK_APP=app.py 
ENV FLASK_ENV=development  

# Expone el puerto del servicio
EXPOSE 5001

# Comando para iniciar la aplicación
CMD ["python", "-m", "flask", "run", "--host=0.0.0.0", "--port=5001"]
