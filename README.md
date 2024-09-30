# Aplicación supermercado

## Instalación

1. **Clonar el repositorio** :

   ```bash
   git clone https://github.com/mcortesmorales/supermercado-web-app.git
   cd appInternet
   ```

2. **Construir y ejecutar la aplicación** :

   Navegar al directorio raíz del proyecto:
   ```bash
   cd path/to/appInternet
   ```
   
   construir y correr los contenedores:
   ```bash
   docker-compose up --build
   ```
## Consideraciones

- **Carpeta `node_modules`**: La carpeta del frontend, llamada `supermercado-frontend-react`, originalmente contiene un directorio llamado `node_modules`, que alberga todas las dependencias necesarias para que React funcione y para integrar bibliotecas adicionales, esta generalmente no se sube al github porque esta incluida en el `gitignore` por defecto.
- Esto no es un problema al correr el frontend dentro de Docker, ya que el Dockerfile se encargará de ejecutar el comando `npm install`, que instalará todas las dependencias especificadas en el archivo `package.json`.
- Si prefieres ejecutar el frontend localmente (fuera del contenedor Docker) para facilitar el desarrollo y las pruebas, debes correr `npm install` dentro de la carpeta `supermercado-frontend-react` para generar la carpeta `node_modules` y seguido el comando `npm start` para iniciarlo.
