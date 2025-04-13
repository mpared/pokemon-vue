# Proyecto Pokémon MVVM - Vite + Vue
## Descripción

Este proyecto consiste en un juego de selección y batalla de Pokémon desarrollado con arquitectura MVVM (Model-View-ViewModel), utilizando Vite y Vue para crear una interfaz moderna y reactiva.

El usuario puede:
- Introducir los nombres de los jugadores.
- Seleccionar un equipo de Pokémon.
- Ordenar los Pokémon según distintos criterios.
- Visualizar la batalla Pokémon con animaciones y efectos.
- El sistema permite juego contra otro jugador o contra la CPU.


### Requisitos previos:
- Navegador (Firefox, Chrome…)

### Pasos para ejecutarlo en local:

1. Abrir la carpeta del proyecto en la terminal
2.  http-server --cors

##  Uso

1. Al iniciar, escribe el nombre del jugador o jugadores.
2. Selecciona Pokémons hasta gastar los créditos.
3. Comienza la batalla y observa los resultados.
4. Gana quien tenga Pokémons supervivientes al final del combate.

## Características

- Arquitectura MVVM clara y separada
- Uso de Vue + Vite
- Lógica de combate y selección dinámica
- CPU autoselecciona equipo si no hay segundo jugador
- Imágenes y poderes especiales cargados desde JSON


## Pasos realizados con Git
# Entrar en la carpeta del proyecto
cd ~/Desktop/DAW/Programación\ Gerard/Ra7/P01G

# Inicializar repositorio Git
git init

# Configurar usuario
git config --global user.name "Martina Paredes"
git config --global user.email "mpared@insdanielblanxart.cat"

# Añadir todos los archivos al repositorio
git add . 

# Hacer commits 
git commit -m "Commit inicial, sin readme"

# Crear el repositorio remoto en GitHub, en la página web 
https://github.com/mpared/pokemon-vue.git

# Enlazar el repositorio remoto en la terminal
git remote add origin https://github.com/mpared/pokemon-vue.git

# verificar el origen
git remote -v

# Hacer el push inicial
git push -u origin master

# Pide una autenticación con TOKEN al hacer el paso 12
En ajustes, tokens, generar un "New token (classic) y habilitar "repo".