import { Link } from 'react-router-dom'
import styles from './Servicios.module.css'

const servicios = [
  {
    icon: '⚡',
    title: 'Electricidad Automotriz',
    desc: 'Diagnóstico, mantención y reparación de sistemas eléctricos para vehículos livianos, camiones y maquinaria pesada.',
    detalles: [
      'Diagnóstico computarizado Scanner FCAN',
      'Diagnóstico y reparación de fallas eléctricas y electrónicas',
      'Detección de cortocircuitos y consumos parasitarios',
      'Reparación de alternadores y motores de partida',
      'Reparación y fabricación de cableados y arneses',
      'Instalación de iluminación LED y accesorios eléctricos',
    ],
  },
  {
    icon: '❄️',
    title: 'Aire Acondicionado Automotriz',
    desc: 'Mantención, diagnóstico y reparación de sistemas de climatización para vehículos livianos, camiones y maquinaria minera.',
    detalles: [
      'Diagnóstico y medición de presiones',
      'Detección de fugas',
      'Carga de refrigerante R134a',
      'Diagnóstico y reparación de compresores',
      'Cambio de embragues, condensadores y evaporadores',
      'Limpieza y sanitización de componentes',
    ],
  },
  {
    icon: '🏗️',
    title: 'Maquinaria Pesada y Minería',
    desc: 'Servicios especializados para empresas, flotas, transporte, minería y maquinaria pesada, minimizando tiempos de detención.',
    detalles: [
      'Camiones, buses y camionetas de trabajo',
      'Excavadoras, cargadores y retroexcavadoras',
      'Equipos mineros e industriales',
      'Flotas de empresas',
      'Diagnóstico eléctrico y electrónico',
      'Evaluaciones, informes técnicos y presupuestos',
    ],
  },
  {
    icon: '📋',
    title: 'Mantenciones Preventivas y Correctivas',
    desc: 'Mantenciones adaptadas a las necesidades de cada vehículo, equipo o flota para prevenir fallas y reducir tiempos de paro.',
    detalles: [
      'Revisión de sistemas eléctricos y electrónicos',
      'Sistemas de carga y arranque',
      'Baterías y conexiones',
      'Sistemas de aire acondicionado',
      'Mantenciones programadas para empresas y flotas',
      'Diagnósticos, informes técnicos y presupuestos',
    ],
  },
  {
    icon: '🔧',
    title: 'Venta de Repuestos',
    desc: 'Repuestos y componentes con respaldo técnico para sistemas eléctricos y de aire acondicionado automotriz.',
    detalles: [
      'Alternadores, motores de partida y reguladores',
      'Compresores, condensadores y evaporadores',
      'Filtros deshidratadores y válvulas de expansión',
      'Refrigerante R134a y aceites de compresor',
      'Baterías, focos LED y barras LED',
      'Cámaras 360 IA y sensores de retroceso',
    ],
  },
  {
    icon: '🖥️',
    title: 'Diagnóstico Computarizado',
    desc: 'Tecnología Scanner FCAN para identificar con precisión el origen de fallas en vehículos y equipos compatibles.',
    detalles: [
      'Lectura y análisis de códigos de falla',
      'Evaluación de sistemas electrónicos',
      'Diagnóstico de sistemas de carga y arranque',
      'Análisis de parámetros en tiempo real',
      'Evaluación técnica de componentes',
      'Informes y presupuestos de reparación',
    ],
  },
]

export default function Servicios() {
  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Nuestros servicios</p>
          <h1 className={styles.heroTitle}>Soluciones que dan respuesta</h1>
          <p className={styles.heroDesc}>
            Atendemos vehículos livianos, camionetas, camiones, buses, maquinaria pesada y equipos de minería
            con los más altos estándares técnicos.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {servicios.map((s, i) => (
            <div key={i} className={styles.card}>
              <span className={styles.icon}>{s.icon}</span>
              <h2 className={styles.cardTitle}>{s.title}</h2>
              <p className={styles.cardDesc}>{s.desc}</p>
              <ul className={styles.detalles}>
                {s.detalles.map((d, j) => <li key={j}>✓ {d}</li>)}
              </ul>
              <Link to="/contacto" className={styles.btn}>Cotizar este servicio →</Link>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <h2>¿Necesitas atención en terreno?</h2>
          <p>También nos desplazamos hasta donde estás. Consulta disponibilidad.</p>
          <Link to="/contacto" className={styles.ctaBtn}>Contactar ahora →</Link>
        </div>
      </section>
    </div>
  )
}
