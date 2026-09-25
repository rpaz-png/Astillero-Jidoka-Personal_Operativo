# Guía de pruebas — Simulador de terminal de validación Jidoka (CM-04)

Este documento indica exactamente qué ingresar en el simulador (`index.html`) para reproducir cada uno de los
cinco escenarios de la Tabla 26 del documento de tesis, más los dos casos de autenticación híbrida (Figura 26).
Sirve tanto para probar el prototipo a mano como de guion para grabar el video de funcionamiento.

El simulador tiene dos pestañas:
- **Asistencia**: la pantalla del terminal (donde se escriben los datos y se presiona "Marcar") y, a la
  izquierda, los siete botones de **Escenario rápido**.
- **Historial**: el registro acumulado de todas las marcas hechas durante la sesión.

Cada escenario tiene un botón directo en **"Escenario rápido"** que llena los campos de la pantalla por ti y
queda a la espera de que presiones **"Marcar"**. Abajo se explica también cómo escribir cada campo a mano
directamente en la pantalla, por si quieres mostrar el llenado campo por campo en el video.

---

## Antes de empezar

Todos los datos de prueba (operarios, tarjetas, PIN, OT y turnos) están fijos en `data.js`. No necesitas
inventar nada: usa exactamente los valores de esta guía. La tabla completa de operarios está en
`datos-de-prueba.md`. Después de ver un resultado, presiona **"Registrar otra marca"** para que la pantalla
vuelva a quedar en blanco y puedas cargar el siguiente caso.

---

## Caso 1 — Marca conforme

**Qué demuestra:** la identidad del operario coincide con la OT programada, dentro de su turno. El sistema
libera el registro sin intervención.

- Botón rápido: **① Marca conforme**
- A mano en la pantalla: Tarjeta detectada = `TAG-2048`, PIN de respaldo = `2048`, OT que intenta registrar = `OT-48213`, Hora de la marca = `09:30`, interruptor de conexión = apagado
- Resultado esperado: panel verde, **MARCA CONFORME**

---

## Caso 2 — Marca no conforme

**Qué demuestra:** el operario marca una OT que no es la suya. El sistema bloquea el cierre del parte.

- Botón rápido: **② Marca no conforme**
- A mano en la pantalla: Tarjeta detectada = `TAG-2001` (es de Jorge Ramírez Soto, cuya OT real es `OT-48190`), PIN = `2015`, pero **OT que intenta registrar** = `OT-48213` (la de otro taller), Hora = `09:30`
- Resultado esperado: panel rojo, **MARCA NO CONFORME — PARTE BLOQUEADO**, mencionando su OT real entre paréntesis

---

## Caso 3 — Marca sin programación

**Qué demuestra:** el operario no tiene ninguna OT activa asignada hoy.

- Botón rápido: **③ Marca sin programación**
- A mano en la pantalla: Tarjeta detectada = `TAG-2069` (Luis Cárdenas Peña, sin ninguna OT asignada), PIN = `2069`, OT que intenta registrar = cualquiera de la lista, Hora = `09:30`
- Resultado esperado: panel ámbar, **MARCA SIN PROGRAMACIÓN**

---

## Caso 4 — Marca fuera de horario

**Qué demuestra:** la OT es correcta, pero la hora de marca cae fuera del turno programado (07:00–15:00).

- Botón rápido: **④ Marca fuera de horario**
- A mano en la pantalla: Tarjeta detectada = `TAG-2034` (Rosa Delgado Vidal), PIN = `2034`, OT = `OT-48221` (la suya), **Hora de la marca = `16:42`**
- Resultado esperado: panel ámbar, **MARCA FUERA DE HORARIO**, mostrando el taller y el rango de horas programado

> Prueba adicional sugerida: cambia la hora a `06:45` (antes del turno) y confirma que también da fuera de horario.

---

## Caso 5 — Identidad confirmada por PIN (respaldo)

**Qué demuestra:** el flujo híbrido de la Figura 26 — cuando la tarjeta no es reconocida, el sistema pide el PIN
como respaldo antes de continuar con la validación normal.

- Botón rápido: **⑤ Identidad por PIN (respaldo)**
- A mano en la pantalla: en **Tarjeta detectada** escribe un valor que no exista, por ejemplo `TAG-9999`. En **PIN de respaldo** ingresa `1953` (el de Ana Torres Medina). OT = `OT-48201` (la suya), Hora = `09:30`
- Resultado esperado: panel verde, **MARCA CONFORME**, y debajo del nombre del operario aparece la etiqueta **"Identidad confirmada por PIN"** en vez de "por tarjeta"

---

## Caso 6 — Marca rechazada

**Qué demuestra:** ni la tarjeta ni el PIN corresponden a ningún operario registrado.

- Botón rápido: **⑥ Marca rechazada**
- A mano en la pantalla: Tarjeta detectada = `TAG-9999` (no existe), PIN de respaldo = `0000` (no corresponde a nadie)
- Resultado esperado: panel rojo, **MARCA RECHAZADA**, sin nombre de operario ("No identificado")

---

## Caso 7 — Terminal sin conexión

**Qué demuestra:** el terminal no logra contrastar contra Unisys y registra en modo de contingencia local.

- Botón rápido: **⑦ Terminal sin conexión** — a diferencia de los otros seis, este botón muestra el resultado
  de inmediato, sin necesidad de presionar "Marcar". Tiene sentido así: si el terminal no tiene conexión, no
  hay ningún dato que contrastar ni ninguna tarjeta o PIN que evaluar, así que no existe un estado intermedio de
  "esperando marca" para este caso.
- Resultado esperado: panel gris, **TERMINAL SIN CONEXIÓN**, sin operario identificado

---

## Guion sugerido para el video (orden recomendado)

1. Caso 1 (conforme) — para mostrar el camino "feliz" primero.
2. Caso 5 (PIN de respaldo) — para mostrar el método híbrido de autenticación.
3. Caso 2 (no conforme) y Caso 3 (sin programación) — los dos bloqueos.
4. Caso 4 (fuera de horario) — el único caso de alerta sin bloqueo.
5. Caso 6 (rechazada) — el límite del sistema de autenticación.
6. Caso 7 (sin conexión) — para cerrar mostrando la contingencia, y enlazarlo con la limitación explicada en
   `README.md` sobre la ausencia de conexión real a Unisys.

Después de cada caso, cambia a la pestaña **Historial**: ahí queda visible el registro acumulado de toda la
demostración, útil para mostrar varios casos seguidos y cerrar el video con el resumen completo.
