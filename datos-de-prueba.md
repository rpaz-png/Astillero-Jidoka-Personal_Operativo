# Datos fijos de prueba

Estos son los únicos datos que reconoce el simulador. Están definidos en `data.js` y no cambian entre sesiones
(no hay base de datos ni backend: todo vive en ese archivo).

## Operarios

| Operario | Código | Tarjeta (TAG) | PIN | OT asignada | Taller | Turno |
|---|---|---|---|---|---|---|
| Marcelo Huamán Ríos | 20481 | `TAG-2048` | `2048` | OT-48213 | X32, Estructuras y Calas | 07:00–15:00 |
| Ana Torres Medina | 19532 | `TAG-1953` | `1953` | OT-48201 | X23, Mecanizado | 07:00–15:00 |
| Jorge Ramírez Soto | 20015 | `TAG-2001` | `2015` | OT-48190 | X21, Producción | 07:00–15:00 |
| Luis Cárdenas Peña | 20699 | `TAG-2069` | `2069` | *(ninguna)* | — | 07:00–15:00 |
| Rosa Delgado Vidal | 20344 | `TAG-2034` | `2034` | OT-48221 | X90, Pintura | 07:00–15:00 |

## Órdenes de trabajo disponibles en el selector "OT que intenta registrar"

| OT | Taller |
|---|---|
| OT-48190 | Taller X21, Producción |
| OT-48201 | Taller X23, Mecanizado |
| OT-48213 | Taller X32, Estructuras y Calas |
| OT-48221 | Taller X90, Pintura |

## Cómo agregar tus propios casos de prueba

Edita el arreglo `WORKERS` en `data.js`. Cada operario acepta estos campos:

```js
{
  nombre: "Nombre completo",
  codigo: "12345",
  tarjeta: "TAG-XXXX",     // ID que el lector "detecta"
  pin: "1234",             // PIN de respaldo
  otAsignada: "OT-XXXXX",  // o null para simular "sin programación"
  turnoInicio: "07:00",
  turnoFin: "15:00",
  horaSugerida: "09:30",   // hora que se autocompleta al elegir este operario
}
```

Si agregas una OT que no está en `ALL_OTS`, agrégala también ahí para que aparezca en el selector.
