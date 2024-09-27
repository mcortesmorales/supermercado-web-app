# Construcción de la aplicación React
FROM node:16-alpine as build

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos package.json y package-lock.json
COPY package*.json ./

# Instalamos las dependencias de npm
RUN npm install

# Copiamos el resto de los archivos de la aplicación
COPY . .

# Construimos la aplicación para producción
RUN npm run build

# Servir la aplicación con NGINX
FROM nginx:alpine

# Copiamos los archivos estáticos generados en la etapa de construcción al directorio de NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Exponemos el puerto 80 para el servidor NGINX
EXPOSE 80

# Iniciamos NGINX
CMD ["nginx", "-g", "daemon off;"]