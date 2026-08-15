// ---- Navegación del deck ----
const SECTIONS = ['Inicio','Empresa','Perfil XXI','DOFA','PESTEL','Cadena valor','Radar','Problema','Valor','QTA','Síntesis','Conexión','Fuentes'];
const slides = document.querySelectorAll('.slide');
const total = slides.length;
let current = 0;

const topbar = document.getElementById('topbar');
SECTIONS.forEach((label, i) => {
  const b = document.createElement('button');
  b.className = 'jumpbtn' + (i === 0 ? ' active' : '');
  b.textContent = (i + 1) + '. ' + label;
  b.addEventListener('click', () => goTo(i));
  topbar.appendChild(b);
});
const jumpbtns = document.querySelectorAll('.jumpbtn');
const progress = document.getElementById('progress');
const counter = document.getElementById('counter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function render() {
  slides.forEach((s, i) => s.classList.toggle('active', i === current));
  jumpbtns.forEach((b, i) => b.classList.toggle('active', i === current));
  counter.textContent = (current + 1) + ' / ' + total;
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === total - 1;
  progress.style.width = (((current + 1) / total) * 100) + '%';
}
function goTo(i) { current = Math.max(0, Math.min(total - 1, i)); render(); }
window.goTo = goTo;
prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));
document.addEventListener('keydown', (e) => {
  const tag = (e.target && e.target.tagName) || '';
  if (tag === 'INPUT' || tag === 'TEXTAREA') return;
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goTo(current + 1); }
  if (e.key === 'ArrowLeft') goTo(current - 1);
  if (e.key === 'Home') goTo(0);
  if (e.key === 'End') goTo(total - 1);
  if (e.key >= '1' && e.key <= '9') goTo(parseInt(e.key, 10) - 1);
});

// ---- Toggle de tarjetas (DOFA cruces / PESTEL) ----
function toggleOpen(el) { el.classList.toggle('open'); }
window.toggleOpen = toggleOpen;

// ---- Datos PESTEL + render ----
const PESTEL = [
  { letter: 'P', name: 'Político', q: '¿Qué normativas o políticas públicas afectan al sector?',
    items: [
      { a: 'La Ley Estatutaria 1751 de 2015 respalda el derecho de los pacientes a mantener una comunicación clara con el profesional tratante y a recibir información apropiada y suficiente para tomar decisiones informadas — un hospital podría incorporar la plataforma dentro de su estrategia de atención centrada en el paciente.',
        src: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=60733', srcName: 'Ley Estatutaria 1751 de 2015' },
      { a: 'La implementación depende de las prioridades y del presupuesto de innovación de cada hospital; puede requerir la aprobación de directivos, áreas de tecnología, comités médicos y responsables de calidad.' },
      { a: 'Los cambios en las prioridades gubernamentales o en los presupuestos del sector salud pueden modificar el apoyo disponible para implementar nuevas tecnologías.' },
    ] },
  { letter: 'E', name: 'Económico', q: '¿Cómo afecta el entorno económico al mercado?',
    items: [
      { a: 'La producción de cada video requiere diseñadores multimedia, modeladores 3D, animadores, desarrolladores y profesionales médicos que validan la información — esto genera costos iniciales importantes.' },
      { a: 'El mercado global de Digital Health mantiene una tendencia de crecimiento anual impulsada por la adopción de inteligencia artificial, la telemedicina y la digitalización de los servicios de salud.',
        src: 'https://www.statista.com/outlook/hmo/digital-health/worldwide#revenue', srcName: 'Statista — Digital Health Outlook' },
      { a: 'En Colombia, las instituciones hospitalarias han incrementado la inversión en transformación digital para optimizar procesos administrativos y fortalecer la calidad de la atención.',
        src: 'https://www.paho.org/es/colombia-salud-digital', srcName: 'PAHO — Colombia, salud digital' },
      { a: 'La inflación y las condiciones económicas de los hospitales pueden determinar su capacidad para invertir en nuevas plataformas frente a otras prioridades como equipos médicos o personal.' },
    ] },
  { letter: 'S', name: 'Social', q: '¿Qué cambios de comportamiento son relevantes?',
    items: [
      { a: 'Los pacientes presentan distintos niveles de conocimiento médico y de familiaridad con plataformas digitales — un adulto mayor puede necesitar más apoyo para acceder que un paciente joven.' },
      { a: 'La demografía influye en el diseño de los contenidos: una persona en zona rural puede tener dificultades de conexión estable, mientras un paciente urbano puede consultar el contenido desde su teléfono móvil.' },
      { a: 'La cultura y las creencias también influyen en la manera en que las personas perciben una cirugía — algunas prefieren conocer todos los detalles, otras sienten mayor ansiedad al verlos.' },
      { a: 'La biblioteca de videos representa además una oportunidad social y educativa para estudiantes de medicina, enfermería y programas de residencia.' },
    ] },
  { letter: 'T', name: 'Tecnológico', q: '¿Qué tan rápido cambia la tecnología del sector?',
    items: [
      { a: 'El avance de las herramientas de diseño 3D permite crear modelos anatómicos más detallados y simulaciones más realistas, con videos interactivos, narraciones y subtítulos.',
        src: 'https://www.nvidia.com/en-us/industries/healthcare-life-sciences/', srcName: 'NVIDIA — Healthcare and Life Sciences' },
      { a: 'La IA generativa acelera la creación de modelos tridimensionales, animaciones y contenidos audiovisuales, reduciendo tiempos de producción y costos operativos.',
        src: 'https://www.microsoft.com/en-us/ai/health', srcName: 'Microsoft — AI for Health' },
      { a: 'Las explicaciones tradicionales, los PDF, los folletos impresos y las llamadas de seguimiento son tecnologías sustitutas que cumplen parcialmente la misma función, pero sin personalización ni integración al portal.' },
      { a: 'El ritmo acelerado de innovación es a la vez oportunidad y amenaza: exige una arquitectura tecnológica escalable y modular para no volverse obsoleta.' },
    ] },
  { letter: 'E', name: 'Ecológico', q: '¿Qué exigencias ambientales enfrenta el negocio?',
    items: [
      { a: 'La incorporación de videos dentro del portal puede reducir el uso de materiales impresos: folletos y guías físicas que hoy entregan los hospitales para explicar procedimientos.',
        src: 'https://www.minambiente.gov.co', srcName: 'Ministerio de Ambiente de Colombia' },
      { a: 'La digitalización también genera consumo energético: los servidores, las redes y el almacenamiento de archivos audiovisuales de alta calidad requieren energía.' },
      { a: 'Se recomienda optimizar los videos para disminuir su tamaño sin afectar la calidad, evitar archivos duplicados y priorizar proveedores tecnológicos con prácticas de eficiencia energética.' },
    ] },
  { letter: 'L', name: 'Legal', q: '¿Qué marco regulatorio aplica?',
    items: [
      { a: 'La Ley 1581 de 2012 establece el marco general de protección de datos personales en Colombia — la plataforma debe garantizar que la información se use únicamente para las finalidades autorizadas.',
        src: 'https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981', srcName: 'Ley 1581 de 2012' },
      { a: 'La Resolución 1995 de 1999 reconoce que la información clínica tiene carácter reservado; aunque los videos no forman parte de la historia clínica, la integración con el portal exige medidas de confidencialidad y seguridad.' },
      { a: 'La Ley 1751 de 2015 reconoce el derecho del paciente a recibir información clara y suficiente, pero la plataforma no puede reemplazar la explicación individual del médico ni el proceso de consentimiento informado.' },
      { a: 'La Ley 23 de 1981, sobre ética médica, respalda la importancia de que los contenidos sean revisados y aprobados por especialistas para evitar errores o interpretaciones incorrectas.' },
      { a: 'Los modelos 3D, las animaciones, los guiones y las narraciones son productos creativos que deben contar con licencias y derechos de uso adecuados.' },
    ] },
];

const pestelGrid = document.getElementById('pestelGrid');
PESTEL.forEach((f) => {
  const card = document.createElement('div');
  card.className = 'pestel-card';
  card.onclick = () => card.classList.toggle('open');
  const itemsHtml = f.items.map(it => `
      <div class="pestel-item">
        <div class="pestel-a">${it.a}</div>
        ${it.src ? `<div class="pestel-src"><a href="${it.src}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${it.srcName} ↗</a></div>` : ''}
      </div>`).join('');
  card.innerHTML = `
    <div class="pestel-head">
      <div class="pestel-letter">${f.letter}</div>
      <div class="pestel-name">${f.name}</div>
      <div class="chevron">▸</div>
    </div>
    <div class="pestel-detail-wrap"><div class="pestel-detail-inner">
      <div class="pestel-q">${f.q}</div>
      ${itemsHtml}
    </div></div>`;
  pestelGrid.appendChild(card);
});

render();
