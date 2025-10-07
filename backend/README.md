# Backend ASP.NET Core JWT Example

Este backend provee endpoints protegidos con JWT para autenticación y CRUD de usuarios.

## Endpoints principales
- `/api/auth/login` — Devuelve un JWT tras login exitoso
- `/api/users` — CRUD de usuarios (protegido)

## Cómo ejecutar
1. Instala .NET 6 o superior
2. Ejecuta:
   ```bash
   dotnet run
   ```
3. El frontend puede consumir los endpoints usando el JWT
