# Simulador — Terminal de validación Jidoka (CM-04)

Prototipo funcional en HTML/CSS/JS, sin dependencias ni backend, que reproduce la lógica de validación descrita
en el capítulo 3 (apartado 3.3) de la tesis *"Implementación de herramientas Lean para el control del avance y
la asignación de personal en el DPCP"* — SIMA-PERÚ. Corre enteramente en el navegador de quien lo abre.

**[Ver guía de pruebas paso a paso →](./GUIA-DE-PRUEBAS.md)** · **[Ver tabla de datos fijos →](./datos-de-prueba.md)**

---

## Qué es esto

Un simulador de la interfaz de terminal que un operario tocaría en el dique o la grada: presenta una tarjeta de
proximidad (o su PIN de respaldo), y el sistema contrasta esa identidad contra la programación de Unisys para
clasificar la marca en uno de cinco estados (Tabla 26 de la tesis): **conforme**, **no conforme**, **sin
programación**, **fuera de horario**, o **terminal sin conexión**.

Implementa exactamente:
- El flujo de autenticación híbrida de la **Figura 26** (tarjeta primaria → PIN de respaldo → rechazo).
- Los cinco escenarios de contraste de la **Tabla 26**.
- El diseño visual de los prototipos de interfaz (Figuras 27, 28, A2–A4).

## Cómo abrirlo

No necesita instalación ni servidor. Dos formas:

1. **Local:** descarga la carpeta y abre `index.html` directamente en cualquier navegador moderno.
2. **GitHub Pages:** sube la carpeta a un repositorio y activa Pages (Settings → Pages → Deploy from branch →
   `main` / raíz). El sitio queda en `https://<usuario>.github.io/<repositorio>/`.

## Estructura del repositorio

```
├── index.html            # la aplicación (interfaz + lógica de validación)
├── data.js                # datos fijos de prueba (operarios, tarjetas, PIN, OT)
├── GUIA-DE-PRUEBAS.md      # qué ingresar para reproducir cada uno de los 7 casos
├── datos-de-prueba.md      # tabla completa de los datos fijos
└── README.md               # este archivo
```

## Cómo probarlo

En la pestaña **Asistencia**, usa los siete botones de **"Escenario rápido"** para cargar cada caso con un clic
(quedan a la espera de que presiones "Marcar"), o completa los campos directamente en la pantalla del terminal.
La pestaña **Historial** acumula el registro de todas las marcas de la sesión. El detalle exacto de qué escribir
en cada campo está en [`GUIA-DE-PRUEBAS.md`](./GUIA-DE-PRUEBAS.md).

---

## Qué SÍ hace este prototipo

- Reproduce fielmente la lógica de decisión (identidad → contraste contra la programación → clasificación en
  uno de cinco estados), tal como está descrita en el documento.
- Deja editar los datos de prueba en un solo archivo (`data.js`), sin tocar el HTML.
- Sirve como demo visual y funcional para grabar el video de los casos de uso, sin necesitar ningún sistema
  externo.

## Qué NO hace este prototipo — consideraciones de conexión pendientes

Este es un simulador de la **lógica**, no una implementación del **sistema**. Antes de considerarlo un producto
usable en el astillero, faltan explícitamente estas piezas, ninguna de las cuales está resuelta aquí:

### 1. No hay conexión real a Unisys
Los datos de operarios, tarjetas, PIN y OT programadas están escritos a mano en `data.js`. En producción, esa
información la entrega el middleware descrito en la Figura 27/29, consultando a Unisys en el instante de la
marca. Aquí no hay ninguna llamada de red: todo el "contraste contra la programación" ocurre contra un arreglo
fijo en el navegador. Falta definir y construir:
- El endpoint o servicio del middleware que consulta Unisys en tiempo real.
- El contrato de datos exacto (qué campos expone Unisys, formatos, códigos de error).
- Manejo de latencia, tiempos de espera y reintentos ante una respuesta lenta de Unisys.

### 2. El interruptor "sin conexión" es manual, no una detección real
En este prototipo, "terminal sin conexión" es un botón que el usuario activa. Un terminal real necesita
detectar la pérdida de conectividad por sí mismo (timeout de red, error de DNS, etc.) y decidir automáticamente
cuándo entrar en modo de contingencia local, no depender de que alguien lo indique.

### 3. No hay cola de sincronización para el modo de contingencia
El prototipo muestra el mensaje de "pendiente de validación al reconectar", pero no *hace* nada con eso: no
guarda la marca en ningún almacenamiento local persistente (ni siquiera en el navegador) ni la reenvía cuando
la conexión vuelve. Un terminal real necesita una cola local (por ejemplo, IndexedDB o almacenamiento en el
propio dispositivo) y un proceso de sincronización automática al reconectar.

### 4. La lectura de tarjeta es un campo de texto, no un lector real
Aquí "detectar la tarjeta" es escribir su ID en una caja de texto. Un terminal físico necesita integrarse con
hardware real de lectura de proximidad (RFID/NFC), con su propio SDK o driver, y con un teclado numérico físico
o táctil seguro para el PIN (que no debería viajar ni mostrarse en texto plano como aquí).

### 5. No hay registro de excepciones (RF-09 / Tabla 27)
El prototipo clasifica correctamente una marca como "no conforme" o "sin programación", pero no implementa el
flujo posterior de que un jefe de taller *registre* una excepción autorizada (reasignación de emergencia,
cobertura de ausencia, etc.) con su responsable y plazo. Esa pantalla y su flujo de aprobación no están
construidos todavía.

### 6. No hay autenticación del propio terminal frente a Unisys
En producción, cada terminal físico necesita autenticarse a sí mismo ante el middleware (certificado, API key
o credencial de dispositivo) para que Unisys pueda confiar en los datos que recibe. Este prototipo no tiene
ningún concepto de identidad del dispositivo: cualquiera que abra el archivo puede "marcar" como cualquier
operario de la lista.

### 7. La hora de la marca es un dato que el usuario edita libremente
Aquí la hora es un campo editable, útil para poder probar el escenario de "fuera de horario" sin esperar a que
sea realmente esa hora. Un terminal real debe tomar la hora de una fuente confiable y sincronizada (NTP), nunca
de una entrada editable por quien está marcando.

### 8. Sin persistencia ni multiterminal
El registro de sesión que se ve abajo a la derecha vive solo en la memoria de esa pestaña del navegador: se
borra al recargar la página. La Tabla 28 de la tesis contempla seis terminales cubriendo cuatro frentes de
trabajo; este prototipo no tiene ningún concepto de "varios terminales" ni de un registro compartido entre
ellos — esa consistencia la debe resolver Unisys y el middleware, no cada terminal por separado.

---

## Resumen para quien retome esto después

Este prototipo demuestra que la lógica de decisión de Jidoka (Figura 26 + Tabla 26) es correcta y clara. Lo que
falta para llevarlo a producción no es "más pantallas", es la capa de integración: una conexión real a Unisys,
manejo real de fallas de red con cola de sincronización, hardware de lectura real, y el flujo de excepciones
del jefe de taller. Ese es exactamente el trabajo que describen los requisitos RF-08, RF-09 y RNF-01 a RNF-02
del Anexo 5 del documento de tesis.
