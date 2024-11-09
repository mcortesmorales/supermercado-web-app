# Usa una imagen base de Node.js
FROM node:18

# Define el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de tu aplicación al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto que usará tu aplicación
EXPOSE 4000

# Comando para ejecutar tu aplicación
CMD ["node", "src/index.js"]