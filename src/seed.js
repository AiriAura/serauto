import { db } from './lib/firebase'
import { collection, addDoc } from 'firebase/firestore'

const categorias = [
  { nombre: 'Alternadores', slug: 'alternadores', icono: '⚡', orden: 1, activa: true },
  { nombre: 'Partidores', slug: 'partidores', icono: '🔧', orden: 2, activa: true },
  { nombre: 'Compresores', slug: 'compresores', icono: '❄️', orden: 3, activa: true },
  { nombre: 'Filtros', slug: 'filtros', icono: '🔬', orden: 4, activa: true },
  { nombre: 'Baterías', slug: 'baterias', icono: '🔋', orden: 5, activa: true },
  { nombre: 'Eléctrico', slug: 'electrico', icono: '💡', orden: 6, activa: true },
]

const productos = [
  { nombre: 'Alternador 24V 80A', categoria: 'Alternadores', sku: 'ALT-24V-80A', descripcion: 'Para camiones y maquinaria pesada.', activo: true, destacado: true, orden: 1 },
  { nombre: 'Alternador 12V 120A', categoria: 'Alternadores', sku: 'ALT-12V-120A', descripcion: 'Para vehículos livianos y medianos.', activo: true, destacado: false, orden: 2 },
  { nombre: 'Partidor 24V 7.5KW', categoria: 'Partidores', sku: 'PAR-24V-75KW', descripcion: 'Para camiones y maquinaria pesada.', activo: true, destacado: true, orden: 1 },
  { nombre: 'Partidor 12V 2.2KW', categoria: 'Partidores', sku: 'PAR-12V-22KW', descripcion: 'Para vehículos livianos.', activo: true, destacado: false, orden: 2 },
  { nombre: 'Compresor A/C Sanden', categoria: 'Compresores', sku: 'COMP-A-C', descripcion: 'Compresor para sistema de aire acondicionado.', activo: true, destacado: true, orden: 1 },
  { nombre: 'Compresor A/C Denso', categoria: 'Compresores', sku: 'COMP-DENSO', descripcion: 'Compatible con múltiples modelos.', activo: true, destacado: false, orden: 2 },
  { nombre: 'Filtro de Aire Donaldson', categoria: 'Filtros', sku: 'FILT-AIR-01', descripcion: 'Filtro de aire para equipos pesados.', activo: true, destacado: false, orden: 1 },
  { nombre: 'Módulo Inyección ECU', categoria: 'Eléctrico', sku: 'MOD-ECU-01', descripcion: 'Módulo de control de inyección.', activo: true, destacado: false, orden: 1 },
  { nombre: 'Batería 12V 100Ah', categoria: 'Baterías', sku: 'BAT-12V-100', descripcion: 'Batería de alta capacidad para vehículos.', activo: true, destacado: false, orden: 1 },
  { nombre: 'Batería 24V 200Ah', categoria: 'Baterías', sku: 'BAT-24V-200', descripcion: 'Para maquinaria y equipos de minería.', activo: true, destacado: false, orden: 2 },
]

async function seed() {
  console.log('Cargando categorías...')
  for (const cat of categorias) {
    await addDoc(collection(db, 'categorias'), cat)
  }
  console.log('Categorías listas')

  console.log('Cargando productos...')
  for (const prod of productos) {
    await addDoc(collection(db, 'productos'), prod)
  }
  console.log('Productos listos')
  console.log('¡Todo cargado!')
}

seed()