# Construcción de la aplicación React
FROM node:18

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos package.json y package-lock.json
COPY package*.json ./

# Instalamos las dependencias de npm
RUN npm install package.json

# Copiamos el resto de los archivos de la aplicación
COPY . .

# Habilitar polling para cambios en archivos
ENV WATCHPACK_POLLING=true

# Exponer el puerto y arrancar la aplicación
EXPOSE 3000
CMD ["npm","start"]
