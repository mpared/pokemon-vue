# 1. Entrar en la carpeta del proyecto, en la terminal
cd ~/Desktop/DAW/Programación\ Gerard/Ra7/P01G

# 2. Inicializar repositorio Git
git init

# 3. Configurar usuario 
git config --global user.name "Martina Paredes"
git config --global user.email "mpared@insdanielblanxart.cat"

# 4. Añadir todos los archivos al repositorio
git add .

# 5. Primer commit (sin README todavía)
git commit -m "Commit inicial, sin readme"

# 6. Crear el archivo README.md con descripción del proyecto 

# 7. Añadir el README al control de versiones
git add README.md

# 8. Segundo commit
git commit -m "Creacuón del readme con intrucciones hasta el momento"

# 9. Crear el repositorio remoto en GitHub, en la página web 
https://github.com/mpared/pokemon-vue.git

# 10. Enlazar el repositorio remoto en la terminal
git remote add origin https://github.com/mpared/pokemon-vue.git

# 11. verificar el origen
git remote -v

# 12. Hacer el push inicial
git push -u origin master

# 13. Añadir otra vez el README, para actualizar
git add README.md

# 14. Tercer commit
git commit -m "README actualizado con los pasos finales"

# 15. Pide una autenticación con TOKEN al hacer el paso 12
En ajustes, tokens, generar un "New token (classic) y habilitar "repo".