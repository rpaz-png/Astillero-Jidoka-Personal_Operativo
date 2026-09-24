// ============================================================================
// DATOS FIJOS DE PRUEBA — Simulador de terminal de validación Jidoka (CM-04)
// ----------------------------------------------------------------------------
// Esto reemplaza, de forma local y sin conexión real, lo que en producción
// vendría del middleware consultando a Unisys (ver README.md, sección
// "Qué NO hace este prototipo"). Edita esta lista para agregar tus propios
// casos de prueba — no se necesita tocar index.html.
// ============================================================================

const WORKERS = [
  {
    nombre: "Marcelo Huamán Ríos",
    codigo: "20481",
    tarjeta: "TAG-2048",
    pin: "2048",
    otAsignada: "OT-48213",
    turnoInicio: "07:00",
    turnoFin: "15:00",
    horaSugerida: "09:30",
  },
  {
    nombre: "Ana Torres Medina",
    codigo: "19532",
    tarjeta: "TAG-1953",
    pin: "1953",
    otAsignada: "OT-48201",
    turnoInicio: "07:00",
    turnoFin: "15:00",
    horaSugerida: "09:30",
  },
  {
    nombre: "Jorge Ramírez Soto",
    codigo: "20015",
    tarjeta: "TAG-2001",
    pin: "2015",
    otAsignada: "OT-48190",
    turnoInicio: "07:00",
    turnoFin: "15:00",
    horaSugerida: "09:30",
  },
  {
    nombre: "Luis Cárdenas Peña",
    codigo: "20699",
    tarjeta: "TAG-2069",
    pin: "2069",
    otAsignada: null,          // sin ninguna OT asignada -> escenario "sin programación"
    turnoInicio: "07:00",
    turnoFin: "15:00",
    horaSugerida: "09:30",
  },
  {
    nombre: "Rosa Delgado Vidal",
    codigo: "20344",
    tarjeta: "TAG-2034",
    pin: "2034",
    otAsignada: "OT-48221",
    turnoInicio: "07:00",
    turnoFin: "15:00",
    horaSugerida: "09:30",
  },
];

const ALL_OTS = [
  { codigo: "OT-48190", taller: "Taller X21, Producción" },
  { codigo: "OT-48201", taller: "Taller X23, Mecanizado" },
  { codigo: "OT-48213", taller: "Taller X32, Estructuras y Calas" },
  { codigo: "OT-48221", taller: "Taller X90, Pintura" },
];
