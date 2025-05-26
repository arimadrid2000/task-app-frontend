# 🚀 Frontend de Gestión de Tareas (API)

Este es un proyecto simple de gestión de tareas desarrollado en **Angular**. Permite a los usuarios iniciar sesión con su correo electrónico y realizar operaciones CRUD (crear, leer, actualizar, eliminar) sobre tareas personales.

## 🚀 Características

- 🔐 **Inicio de sesión por email**  
  Los usuarios pueden ingresar su email para iniciar sesión. Si no existe, se les ofrece la opción de crear una cuenta automáticamente.

- ✅ **Gestión de tareas personalizadas**
  - Crear nuevas tareas
  - Editar tareas existentes
  - Marcar tareas como completadas o pendientes
  - Eliminar tareas
  - Visualizar lista de tareas filtrada por usuario

- 💾 **Persistencia en backend**  
  Todas las operaciones se comunican con una API REST (servicio backend externo o local).

## 🛠️ Tecnologías utilizadas

- [Angular 17.3.6](https://angular.io/)
- Angular Material (UI)
- RxJS
- TypeScript
- LocalStorage (para sesión del usuario)

## 📦 Estructura del proyecto

src/
├── app/
│ ├── components/
│ │ ├── login/ # Componente de inicio de sesión
│ │ └── home/ # Componente principal con lista de tareas
│ │     └── task-modal/ # Modal reutilizable para crear/editar tareas
│ ├── services/ # Servicios de autenticación y tareas
│ ├── models/ # Interfaces de datos (Task, User, etc.)
│ └── app.routes.ts # Rutas principales

## ⚙️ Instrucciones de instalación

1. **Clona el repositorio:**

```bash
- git clone https://github.com/arimadrid2000/task-app-frontend
- cd task-app-frontend

## Instala las dependencias:

- npm install

## Inicia el servidor de desarrollo

- ng serve

## Accede al proyecto en el navegador:

- Abre tu navegador y accede a http://localhost:4200/

## Ejecuta las pruebas:

- ng test
``` 

## 💡 Comentarios sobre el desarrollo
- El proyecto utiliza Angular Material para la interfaz de usuario.

- El manejo de sesión se hace mediante localStorage, almacenando el userId y un token (si aplica).

- La lógica del estado de las tareas es simple pero extensible.

- Angular Material proporciona los componentes UI como tablas, diálogos, íconos, etc.

## 👩‍💻 Autor
- Desarrollado por Arianna Madrid
