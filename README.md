# TaskApp

Este proyecto fue generado con Angular CLI versión 16.2.14.

## Pasos para Ejecutar

* Clonar el repositorio.
* Ejecutar el comando: npm install.
* Ejecutar el comando: ng serve.

# Descripción de las Funcionalidades

## Header
Incluye el logo, una barra de búsqueda y botones para acceder al formulario de tareas y al gestor de estados.

## Formulario de Tareas
Despliega una ventana emergente para añadir nuevas tareas. El formulario incluye validaciones y botones para cerrar o cancelar la operación.

## Gestor de Estados
Muestra una ventana con un formulario para agregar nuevos estados. Incluye validaciones y permite crear una lista con las respectivas acciones asociadas a cada estado. Si existen tareas relacionadas con un estado, este no puede ser eliminado.

## Vista Tabla
Muestra todas las tareas creadas en una tabla.

* Estados Predefinidos: 
Aparecen en la parte superior, y al crear un nuevo estado, este se agrega automáticamente a la derecha.

* Contenedor de Tareas: Ubicado en la parte inferior, donde se muestran todas las tareas con su título, estado y un botón de acciones. Las acciones disponibles son: editar, eliminar y pasar al siguiente estado.

## Vista Cards
Organiza las tareas en tres estados principales, representados como contenedores.

* Tarjetas por Estado: Cada tarjeta muestra las tareas según su estado.
* Drag and Drop: Permite arrastrar y soltar tarjetas para moverlas al siguiente estado.
* Información Adicional: Muestra la fecha de creación y un botón con las acciones disponibles: editar y eliminar.

### Prototipo figma
(Archivo .fig para importar)

https://drive.google.com/file/d/1QrG7pM2Gd3-Z7Sg6g6982OTeVmncIJIP/view?usp=drive_link


## Librerias

* @angular/forms: Biblioteca para manejar formularios reactivos y plantillas en Angular.
* @angular/material: Colección de componentes de diseño basados en Material Design.
* date-fns: Biblioteca para manipular y formatear fechas de manera eficiente.
* rxjs: Librería para manejar programación reactiva basada en observables.
* sweetalert2: Biblioteca para mostrar alertas y diálogos personalizados con un diseño atractivo.
* tslib: Utilidades runtime para proyectos TypeScript que reducen el tamaño del código generado.
* uuid: Generador de identificadores únicos universales (UUIDs).

## Desciciones Tecnicas

* Componentización: Dividida en vistas y componentes como el header, formularios y vistas de tareas para facilitar el mantenimiento.
* Gestión de estados: Implementada con servicios para mantener sincronización entre componentes.
* Drag and Drop: Uso de fiunciones drop, gragover, dragstart para funcionalidad de arrastrar y soltar en las tarjetas.
* Estilo: Uso de Angular Material para diseño consistente y responsivo, Hojas de estilos SASS.
* Validaciones: Formularios con validaciones reactivas para mejorar la experiencia del usuario.
* Alertas: Integración con SweetAlert2 para mostrar mensajes interactivos.
* Gestión de datos: Uso de UUID para identificadores únicos y date-fns para manejo eficiente de fechas.
* Responsividad: Diseño adaptable para diferentes dispositivos usando CSS.
* Programación reactiva: Uso de RxJS para manejar flujos de datos asincrónicos y eventos.


