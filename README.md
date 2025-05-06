# 📊 Invoice de Codearts

Sistema de gestión de facturas, servicios y clientes con gestión de roles.

---

## 📝 Descripción General

Invoice de Codearts es una aplicación completa para la gestión de facturas, servicios y clientes. El sistema incorpora una gestión avanzada de roles que permite diferentes niveles de acceso y funcionalidades según el tipo de usuario.

---

## 🛠️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalados en tu sistema:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/downloads)

---

## 🚀 Instalación y Despliegue

### 1️⃣ Clonar el repositorio

Ejecuta el siguiente comando para clonar el proyecto:

```bash
git clone git@github.com:CodeArts-Solutions/lions-A-Codearts-Invoice.git
cd lions-A-Codearts-Invoice
```

### 2️⃣ Levantar los contenedores

Para iniciar los servicios en segundo plano, ejecuta:

```bash
docker-compose up -d
```

📌 **Nota:** La primera vez que inicies los servicios, puede tardar unos minutos en configurarse completamente.

### 3️⃣ Verificar que los contenedores están corriendo

Comprueba el estado de los contenedores con:

```bash
docker ps
```

### 4️⃣ Acceder a la aplicación

- **Aplicación web:** Abre la siguiente URL en tu navegador:
  ```
  http://localhost:4200
  ```

---

## 🔄 Detener y Reiniciar los Contenedores

Si deseas detener los contenedores en ejecución:
```bash
docker-compose down
```

Para volver a iniciarlos:
```bash
docker-compose up -d
```

---

## 🧹 Eliminar los Contenedores y Datos Persistentes

Si quieres eliminar los contenedores junto con los volúmenes y datos almacenados:
```bash
docker-compose down -v
```

⚠️ **Advertencia:** Esto eliminará todos los datos almacenados en la base de datos.

---

## 👥 Gestión de Roles y Permisos

El sistema cuenta con tres tipos de roles principales, cada uno con diferentes permisos:

### 🔐 SuperAdmin

El SuperAdmin tiene acceso completo al sistema y puede:
- Gestionar facturas (crear, editar, eliminar, visualizar)
- Gestionar servicios (crear, editar, eliminar, visualizar)
- Gestionar clientes (crear, editar, eliminar, visualizar)
- Crear y administrar usuarios con diferentes roles (SuperAdmin, Gestor, Cliente)
- Acceder a todos los módulos y funcionalidades del sistema

### 👨‍💼 Gestor

El Gestor tiene permisos intermedios:
- Gestionar facturas (crear, editar, visualizar)
- Gestionar servicios (crear, editar, visualizar)
- Gestionar clientes (solo crear y visualizar)
- Puede crear nuevos usuarios pero no modificar roles

### 👤 Cliente

El Cliente tiene acceso limitado:
- Ver sus propios servicios contratados
- Ver y descargar sus facturas
- No puede modificar información ni acceder a datos de otros clientes

---

## 📋 Flujo de Trabajo

1. El **SuperAdmin** configura el sistema creando los usuarios con roles adecuados.
2. Los **Gestores** pueden registrar clientes y asociarles servicios.
3. Los **Servicios** asignados a los clientes generan **Facturas** automáticamente.
4. Los **Clientes** pueden iniciar sesión para ver y descargar sus facturas.

---

## 📡 API y Endpoints

La aplicación expone diversos endpoints para la interacción con el sistema. A continuación, se presentan los más relevantes:

### Autenticación
| Método | Endpoint           | Descripción                           |
|--------|-------------------|---------------------------------------|
| POST   | `/api/login`      | Autenticación de usuarios             |
| POST   | `/api/logout`     | Cierre de sesión                      |

### Usuarios
| Método | Endpoint                | Descripción                           |
|--------|------------------------|---------------------------------------|
| GET    | `/api/users`           | Lista de usuarios (SuperAdmin)         |
| POST   | `/api/users`           | Crear nuevo usuario (SuperAdmin)       |
| PUT    | `/api/users/{id}`      | Actualizar usuario (SuperAdmin)        |
| DELETE | `/api/users/{id}`      | Eliminar usuario (SuperAdmin)          |

### Facturas
| Método | Endpoint                | Descripción                           |
|--------|------------------------|---------------------------------------|
| GET    | `/api/invoices`        | Lista de facturas (según rol)          |
| GET    | `/api/invoices/{id}`   | Detalle de factura                     |
| POST   | `/api/invoices`        | Crear factura (SuperAdmin/Gestor)      |
| PUT    | `/api/invoices/{id}`   | Actualizar factura (SuperAdmin/Gestor) |
| DELETE | `/api/invoices/{id}`   | Eliminar factura (SuperAdmin)          |
| GET    | `/api/invoices/pdf/{id}` | Descargar factura en PDF             |

### Servicios
| Método | Endpoint                | Descripción                           |
|--------|------------------------|---------------------------------------|
| GET    | `/api/services`        | Lista de servicios (según rol)         |
| POST   | `/api/services`        | Crear servicio (SuperAdmin/Gestor)     |
| PUT    | `/api/services/{id}`   | Actualizar servicio (SuperAdmin/Gestor)|
| DELETE | `/api/services/{id}`   | Eliminar servicio (SuperAdmin)         |

### Clientes
| Método | Endpoint                | Descripción                           |
|--------|------------------------|---------------------------------------|
| GET    | `/api/clients`         | Lista de clientes (según rol)          |
| POST   | `/api/clients`         | Crear cliente (SuperAdmin/Gestor)      |
| PUT    | `/api/clients/{id}`    | Actualizar cliente (SuperAdmin)        |
| DELETE | `/api/clients/{id}`    | Eliminar cliente (SuperAdmin)          |

---

## 🛠️ Comandos Útiles

- Para acceder al contenedor principal:
```bash
docker exec -it nombre_contenedor bash
```

- Para visualizar los logs en tiempo real:
```bash
docker-compose logs -f
```

---

## 🔍 Solución de Problemas

### Problemas de conexión a la base de datos
Verifica que los contenedores Docker están corriendo correctamente y que la configuración de la base de datos es correcta.

### Errores de permisos
Si encuentras errores relacionados con permisos, ajusta los permisos de los directorios como se indica en la sección de comandos útiles.

---

## 📞 Soporte

Para cualquier problema técnico o consulta, contactar con el equipo de desarrollo de CodeArts Solutions.

---

## ©️ Licencia

Este proyecto es propiedad de CodeArts Solutions. Todos los derechos reservados.
