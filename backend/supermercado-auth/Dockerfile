# Usa una imagen base de Node.js
FROM node:18.16.0

# Define el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de tu aplicación al contenedor
COPY package*.json ./

# Copia el resto de los archivos de la aplicación
COPY . .

RUN rm -rf node_modules/

# uninstall the current bcrypt modules
RUN npm update


# Expone el puerto que usará tu aplicación
EXPOSE 4000

# Comando para ejecutar tu aplicación
CMD ["node", "src/index.js"]