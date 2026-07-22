// ============================================
// CARGAR CONFIGURACIÓN Y PERSONALIZAR LA INVITACIÓN
// ============================================

// ============================================
// LEER PARÁMETROS DE LA URL Y PISAR CONFIG
// ============================================
function leerParametrosURL() {
  let params;

  // Si viene codificado en Base64 desde el generador de links
  const raw = new URLSearchParams(window.location.search).get('data');
  if (raw) {
    try {
      const decoded = decodeURIComponent(escape(atob(raw)));
      params = new URLSearchParams(decoded);
    } catch (e) {
      console.warn('Error decodificando Base64, usando parámetros normales.');
      params = new URLSearchParams(window.location.search);
    }
  } else {
    params = new URLSearchParams(window.location.search);
  }
  if (params.get('nombre')) CONFIG.nombre = params.get('nombre');
  if (params.get('edad')) CONFIG.edad = params.get('edad');
  if (params.get('fecha')) CONFIG.fecha = params.get('fecha');
  if (params.get('hora')) CONFIG.hora = params.get('hora');
  if (params.get('lugar')) CONFIG.lugar = params.get('lugar');
  if (params.get('whatsapp')) CONFIG.whatsapp = params.get('whatsapp');
  if (params.get('maps')) CONFIG.googleMaps = params.get('maps');
  if (params.get('imagen')) CONFIG.imagenTema = params.get('imagen');
  if (params.get('fecha_evento')) CONFIG.fechaEvento = params.get('fecha_evento');
  if (params.get('mensaje')) CONFIG.textos.mensajeFinal = params.get('mensaje');
  if (params.get('id')) CONFIG.id = params.get('id');
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
  leerParametrosURL(); // 👈 Primero lee la URL
  inicializarInvitacion();
});

function inicializarInvitacion() {
  // Cargar todos los datos desde config.js
  cargarDatos();

  // Aplicar colores del tema
  aplicarTema();

  // Cargar imagen temática
  cargarImagenTema();

  // Iniciar el contador regresivo
  iniciarContador();

  // Inicializar música
  inicializarMusica();

  // Inicializar juego de globos
  inicializarJuego();

  // Autenticación anónima para Firebase (necesario para escribir en Firestore si las reglas lo piden)
  iniciarSesionAnonima();
}

function iniciarSesionAnonima() {
  if (typeof auth !== 'undefined') {
    auth.signInAnonymously()
      .then(() => {
        console.log('👤 Sesión anónima iniciada');
      })
      .catch((error) => {
        console.error('Error en sesión anónima:', error);
      });
  }
}

// ============================================
// CARGAR DATOS DE CONFIGURACIÓN
// ============================================
function cargarDatos() {
  // Textos principales
  document.getElementById('titulo').textContent = CONFIG.textos.titulo;
  document.getElementById('subtitulo').textContent = '';


  // Información del evento
  document.getElementById('fecha').textContent = CONFIG.fecha;
  document.getElementById('hora').textContent = CONFIG.hora;
  document.getElementById('lugar').textContent = CONFIG.lugar;

  // Mensaje final
  document.getElementById('mensajeFinal').textContent = CONFIG.textos.mensajeFinal;

  // Textos de botones
  document.getElementById('textoBotonMaps').textContent = CONFIG.textos.textoBotonMaps;
  document.getElementById('textoBotonWhatsApp').textContent = CONFIG.textos.textoBotonWhatsApp;

  // Links de botones
  const nombreCumple = CONFIG.nombre || "Benja";
  const mensajeConfirmacion = `Hola! Confirmo asistencia al cumple de ${nombreCumple}.`;
  document.getElementById('btnMaps').href = CONFIG.googleMaps;
  document.getElementById('btnWhatsapp').href =
    `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensajeConfirmacion)}`;
}

// ============================================
// APLICAR TEMA DE COLORES
// ============================================
function aplicarTema() {
  const colores = obtenerColores();

  // Aplicar colores al contador
  document.getElementById('daysBox').style.background =
    `linear-gradient(135deg, ${colores.contadorDias}, ${ajustarBrillo(colores.contadorDias, -20)})`;

  document.getElementById('hoursBox').style.background =
    `linear-gradient(135deg, ${colores.contadorHoras}, ${ajustarBrillo(colores.contadorHoras, -20)})`;

  document.getElementById('minutesBox').style.background =
    `linear-gradient(135deg, ${colores.contadorMinutos}, ${ajustarBrillo(colores.contadorMinutos, -20)})`;

  document.getElementById('secondsBox').style.background =
    `linear-gradient(135deg, ${colores.contadorSegundos}, ${ajustarBrillo(colores.contadorSegundos, -20)})`;

  // Función auxiliar para determinar si un fondo es claro (como el amarillo) y necesita texto oscuro
  const esClaro = (color) => color && color.toLowerCase() === '#ffd700';

  // 1. Botón "¿Cómo llegar?" -> Mismo color que Días
  const btnMaps = document.getElementById('btnMaps');
  btnMaps.style.background = `linear-gradient(135deg, ${colores.contadorDias}, ${ajustarBrillo(colores.contadorDias, -20)})`;
  btnMaps.style.color = esClaro(colores.contadorDias) ? '#1B3A6B' : 'white';

  // 2. Botón "Confirmar asistencia" -> Mismo color que Horas
  const btnWhatsapp = document.getElementById('btnWhatsapp');
  btnWhatsapp.style.background = `linear-gradient(135deg, ${colores.contadorHoras}, ${ajustarBrillo(colores.contadorHoras, -20)})`;
  btnWhatsapp.style.color = esClaro(colores.contadorHoras) ? '#1B3A6B' : 'white';

  // 3. Botón "Jugá: Atrapa los emojis" -> Mismo color que Minutos
  const btnGame = document.getElementById('btnGame');
  if (btnGame) {
    btnGame.style.background = `linear-gradient(135deg, ${colores.contadorMinutos}, ${ajustarBrillo(colores.contadorMinutos, -20)})`;
    btnGame.style.color = esClaro(colores.contadorMinutos) ? '#1B3A6B' : 'white';
  }

  // 4. Botón "Ver ranking" -> Mismo color que Segundos
  const btnRanking = document.getElementById('btnRanking');
  if (btnRanking) {
    btnRanking.style.background = `linear-gradient(135deg, ${colores.contadorSegundos}, ${ajustarBrillo(colores.contadorSegundos, -20)})`;
    btnRanking.style.color = esClaro(colores.contadorSegundos) ? '#1B3A6B' : 'white';
  }
}

// Función auxiliar para oscurecer colores
function ajustarBrillo(hex, percent) {
  // Convertir hex a RGB
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + percent));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + percent));
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + percent));

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

// ============================================
// CARGAR IMAGEN TEMÁTICA
// ============================================
function cargarImagenTema() {
  const themeImageContainer = document.getElementById('themeImage');

  // 1. Cargar Imagen si existe
  if (CONFIG.imagenTema && CONFIG.imagenTema.trim() !== '') {
    const img = document.createElement('img');
    img.src = CONFIG.imagenTema;
    img.alt = `Invitación de ${CONFIG.nombre}`;

    img.onerror = function () {
      console.warn('No se pudo cargar la imagen:', CONFIG.imagenTema);
      // No ocultamos el contenedor por si hay texto
    };

    themeImageContainer.appendChild(img);
  }

  // 2. Cargar Texto sobre la imagen si existe
  if (CONFIG.textoImagen && CONFIG.textoImagen.trim() !== '') {
    const textOverlay = document.createElement('div');
    textOverlay.className = 'theme-image-text';
    textOverlay.textContent = CONFIG.textoImagen;
    themeImageContainer.appendChild(textOverlay);
  }

  // Ocultar solo si no hay ni imagen ni texto
  if ((!CONFIG.imagenTema || CONFIG.imagenTema.trim() === '') &&
    (!CONFIG.textoImagen || CONFIG.textoImagen.trim() === '')) {
    themeImageContainer.style.display = 'none';
  }
}

// ============================================
// CONTADOR REGRESIVO
// ============================================
function iniciarContador() {
  const eventDate = new Date(CONFIG.fechaEvento).getTime();

  // Elementos del DOM
  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");
  const countdownTitle = document.querySelector(".countdown-title");

  // Función para actualizar el contador
  function actualizarContador() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    // Si el evento ya pasó
    if (distance < 0) {
      daysElement.textContent = "00";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";

      countdownTitle.textContent = "¡Hoy es el cumple! 🎉";
      return;
    }

    // Calcular días, horas, minutos y segundos
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Formatear con ceros a la izquierda
    daysElement.textContent = String(days).padStart(2, '0');
    hoursElement.textContent = String(hours).padStart(2, '0');
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
  }

  // Actualizar inmediatamente
  actualizarContador();

  // Actualizar cada segundo
  setInterval(actualizarContador, 1000);
}

// ============================================
// LÓGICA DE MÚSICA
// ============================================
function inicializarMusica() {
  const audio = document.getElementById('backgroundMusic');
  const musicSource = document.getElementById('musicSource');
  const musicControl = document.getElementById('musicControl');
  const musicIcon = musicControl.querySelector('.music-icon');

  if (!CONFIG.musica) {
    musicControl.style.display = 'none';
    return;
  }

  // Configurar fuente de música
  musicSource.src = CONFIG.musica;
  audio.load();

  let musicaIniciada = false;

  // Función para intentar reproducir
  const intentarReproducir = () => {
    if (!musicaIniciada && CONFIG.reproducirAlTocar) {
      audio.play().then(() => {
        musicaIniciada = true;
        musicControl.classList.add('playing');
        musicIcon.textContent = '🔊';
        // Remover el listener una vez que empezó a sonar
        document.removeEventListener('click', intentarReproducir);
        document.removeEventListener('touchstart', intentarReproducir);
      }).catch(error => {
        console.warn('La reproducción automática fue bloqueada:', error);
      });
    }
  };

  // Escuchar el primer clic/toque en cualquier parte
  document.addEventListener('click', intentarReproducir);
  document.addEventListener('touchstart', intentarReproducir);

  // Control manual (botón flotante)
  musicControl.addEventListener('click', (e) => {
    e.stopPropagation(); // Evitar disparar el listener global si aún no se activó

    if (audio.paused) {
      audio.play();
      musicControl.classList.add('playing');
      musicControl.classList.remove('muted');
      musicIcon.textContent = '🔊';
      musicaIniciada = true; // Si lo activa manual, ya está
    } else {
      audio.pause();
      musicControl.classList.remove('playing');
      musicControl.classList.add('muted');
      musicIcon.textContent = '🔇';
    }
  });
}

// ============================================
// JUEGO DE EXPLOTAR GLOBOS
// ============================================

let gameScore = 0;
let gameInterval;
let timerInterval;
let timeLeft = 60;
const gameItems = ['🤠', '🚀', '🛸'];

function inicializarJuego() {
  const btnGame = document.getElementById('btnGame');
  const closeGame = document.getElementById('closeGame');
  const btnRanking = document.getElementById('btnRanking');
  const closeRanking = document.getElementById('closeRanking');
  const saveScoreBtn = document.getElementById('saveScoreBtn');

  if (btnGame) {
    btnGame.addEventListener('click', (e) => {
      e.preventDefault();
      abrirJuego();
    });
  }

  if (closeGame) {
    closeGame.addEventListener('click', () => {
      cerrarJuego();
    });
  }

  if (btnRanking) {
    btnRanking.addEventListener('click', () => {
      abrirRanking();
    });
  }

  if (closeRanking) {
    closeRanking.addEventListener('click', () => {
      cerrarRanking();
    });
  }

  if (saveScoreBtn) {
    saveScoreBtn.addEventListener('click', () => {
      guardarPuntaje();
    });
  }
}

function abrirJuego() {
  const gameOverlay = document.getElementById('gameOverlay');
  const scoreValue = document.getElementById('scoreValue');
  const timerValue = document.getElementById('timerValue');
  const saveScoreForm = document.getElementById('saveScoreForm');
  const gameContainer = document.getElementById('gameContainer');

  gameScore = 0;
  timeLeft = 60;
  scoreValue.textContent = gameScore;
  timerValue.textContent = timeLeft;
  saveScoreForm.style.display = 'none';
  gameContainer.innerHTML = '';
  gameOverlay.style.display = 'flex';

  // Iniciar generación de globos
  gameInterval = setInterval(crearGlobo, 800);

  // Iniciar temporizador
  timerInterval = setInterval(() => {
    timeLeft--;
    timerValue.textContent = timeLeft;
    if (timeLeft <= 0) {
      finalizarJuego();
    }
  }, 1000);
}

function cerrarJuego() {
  const gameOverlay = document.getElementById('gameOverlay');
  const gameContainer = document.getElementById('gameContainer');

  clearInterval(gameInterval);
  clearInterval(timerInterval);
  gameOverlay.style.display = 'none';
  gameContainer.innerHTML = '';
}

function finalizarJuego() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);

  const gameContainer = document.getElementById('gameContainer');
  const saveScoreForm = document.getElementById('saveScoreForm');
  const finalScore = document.getElementById('finalScore');

  gameContainer.innerHTML = '';
  finalScore.textContent = gameScore;
  saveScoreForm.style.display = 'block';
}

function crearGlobo() {
  const container = document.getElementById('gameContainer');
  if (!container) return;

  const balloon = document.createElement('div');
  balloon.className = 'game-balloon';

  // Posición horizontal aleatoria
  const xPos = Math.random() * (window.innerWidth - 70);
  balloon.style.left = `${xPos}px`;
  balloon.style.bottom = '-100px';

  // Seleccionar item aleatorio (huellita, casco o globo)
  const item = gameItems[Math.floor(Math.random() * gameItems.length)];
  balloon.textContent = item;

  // Velocidad aleatoria
  const duration = 4 + Math.random() * 3;
  balloon.style.transition = `bottom ${duration}s linear`;

  container.appendChild(balloon);

  // Animación de subida
  setTimeout(() => {
    balloon.style.bottom = '110vh';
  }, 50);

  // Evento de click/touch
  const popHandler = () => {
    explotarGlobo(balloon);
  };

  balloon.addEventListener('mousedown', popHandler);
  balloon.addEventListener('touchstart', (e) => {
    e.preventDefault();
    popHandler();
  });

  // Eliminar si sale de la pantalla
  setTimeout(() => {
    if (balloon.parentNode === container) {
      container.removeChild(balloon);
    }
  }, duration * 1000);
}

function explotarGlobo(balloon) {
  if (balloon.classList.contains('balloon-pop')) return;

  balloon.classList.add('balloon-pop');
  gameScore += 10;
  document.getElementById('scoreValue').textContent = gameScore;

  setTimeout(() => {
    if (balloon.parentNode) {
      balloon.parentNode.removeChild(balloon);
    }
  }, 200);
}

// ============================================
// LÓGICA DE FIREBASE Y RANKING
// ============================================

async function guardarPuntaje() {
  const playerNameInput = document.getElementById('playerName');
  const nombre = playerNameInput.value.trim();
  const saveScoreBtn = document.getElementById('saveScoreBtn');

  if (!nombre) {
    mostrarAlerta('Por favor, ingresá tu nombre 😊', '✏️');
    return;
  }

  saveScoreBtn.disabled = true;
  saveScoreBtn.textContent = 'Guardando...';

  const coleccionRanking = 'ranking_' + (CONFIG.id || CONFIG.nombre || 'general');

  try {
    await db.collection(coleccionRanking).add({
      nombre: nombre,
      puntaje: gameScore,
      fecha: firebase.firestore.FieldValue.serverTimestamp()
    });

    mostrarAlerta('¡Puntaje guardado! ¡Estás en el ranking! 🏆', '⭐');
    cerrarJuego();
    abrirRanking();
  } catch (error) {
    console.error('Error al guardar puntaje:', error);
    // Mostrar un error más descriptivo para ayudar a debugear
    let errorMsg = 'Hubo un error al guardar tu puntaje.';
    if (error.code === 'permission-denied') {
      errorMsg += '\nError: Permiso denegado. Asegúrate de que las Reglas de Firestore permitan escribir.';
    } else {
      errorMsg += '\nDetalle: ' + (error.message || error);
    }
    mostrarAlerta(errorMsg, '⚠️');
  } finally {
    saveScoreBtn.disabled = false;
    saveScoreBtn.textContent = 'Guardar en Ranking';
    playerNameInput.value = '';
  }
}

function abrirRanking() {
  document.getElementById('rankingOverlay').style.display = 'flex';
  cargarRanking();
}

function cerrarRanking() {
  document.getElementById('rankingOverlay').style.display = 'none';
}

async function cargarRanking() {
  const rankingList = document.getElementById('rankingList');
  rankingList.innerHTML = '<div class="loading">Cargando rankings...</div>';

  try {
    const coleccionRanking = 'ranking_' + (CONFIG.id || CONFIG.nombre || 'general');
    const snapshot = await db.collection(coleccionRanking)
      .orderBy('puntaje', 'desc')
      .limit(10)
      .get();

    rankingList.innerHTML = '';

    if (snapshot.empty) {
      rankingList.innerHTML = '<div class="no-scores">¡Nadie ha jugado todavía! Sé el primero.</div>';
      return;
    }

    snapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      const item = document.createElement('div');
      item.className = 'ranking-item';

      let medalla = index + 1;
      if (index === 0) medalla = '🥇';
      if (index === 1) medalla = '🥈';
      if (index === 2) medalla = '🥉';

      item.innerHTML = `
        <div class="ranking-position">${medalla}</div>
        <div class="ranking-name">${data.nombre}</div>
        <div class="ranking-score">${data.puntaje} pts</div>
      `;
      rankingList.appendChild(item);
    });
  } catch (error) {
    console.error('Error al cargar ranking:', error);
    rankingList.innerHTML = '<div class="error">Error al cargar el ranking. Por favor reintenta más tarde.</div>';
  }
}

// ============================================
// MODAL DE ALERTA PERSONALIZADO
// ============================================
function mostrarAlerta(mensaje, icono = '🎉') {
  const overlay = document.getElementById('customAlertOverlay');
  const msgEl = document.getElementById('customAlertMessage');
  const iconEl = document.getElementById('customAlertIcon');
  const okBtn = document.getElementById('customAlertOkBtn');

  msgEl.textContent = mensaje;
  iconEl.textContent = icono;
  overlay.style.display = 'flex';

  const cerrar = () => {
    overlay.style.display = 'none';
    okBtn.removeEventListener('click', cerrar);
  };
  okBtn.addEventListener('click', cerrar);
}

// ============================================
// LOG DE INICIALIZACIÓN
// ============================================
console.log('🎉 Invitación de cumpleaños cargada exitosamente!');
console.log('📝 Cumpleañero:', CONFIG.nombre);
console.log('🎨 Tema:', CONFIG.tema);
console.log('📅 Fecha del evento:', CONFIG.fechaEvento);
