// ============================================
// 🎉 CONFIGURACIÓN DE LA INVITACIÓN 🎉
// ============================================
// Aquí puedes personalizar todos los datos de la invitación
// Solo cambia los valores entre comillas

const CONFIG = {
  // === INFORMACIÓN DEL CUMPLEAÑERO ===
  nombre: "Benja",
  edad: "6", // Si querés podés cambiar la edad aquí
  id: "benja_toy_story_v1",

  // === INFORMACIÓN DEL EVENTO ===
  fecha: "Domingo 2 de Agosto",
  hora: "16:00 Hs a 19:00 Hs",
  lugar: "MEGAFUN",

  // === FECHA PARA EL CONTADOR (formato: AAAA-MM-DD) ===
  // Importante: usa el formato año-mes-día con guiones
  fechaEvento: "2026-08-02T17:00:00",

  // === CONTACTO ===
  // Número de WhatsApp (incluye código de país: 549 + código de área + número)
  whatsapp: "5491134564208",

  // Link de Google Maps (pega aquí el link completo)
  googleMaps: "https://maps.app.goo.gl/379apQnmwS7rp1GV9",

  // === PERSONALIZACIÓN VISUAL ===
  // Tema de colores (opciones: "pawpatrol", "frozen", "spiderman", "princesas", "personalizado")
  tema: "personalizado",

  // Si elegiste "personalizado", configura estos colores (en formato hexadecimal)
  coloresPersonalizados: {
    contadorDias: "#CC1A1A",      // Rojo Woody
    contadorHoras: "#39B54A",     // Verde Marcianito (asociado a WhatsApp)
    contadorMinutos: "#FFD700",   // Amarillo Woody (asociado al Juego)
    contadorSegundos: "#92278F",  // Púrpura Buzz
    botonMaps: "#1A3A8F",         // Azul Buzz
    botonWhatsApp: "#25D366"      // Verde WhatsApp (mantiene funcionalidad visual)
  },

  // === IMAGEN TEMÁTICA ===
  // Nombre del archivo de imagen que está en la carpeta (ej: "paw-patrol.jpg")
  // Si no tienes imagen, deja vacío: ""
  imagenTema: "1002264180.png",
  textoImagen: "", // Texto que aparecerá sobre la imagen

  // === MÚSICA ===
  // Nombre del archivo de música (ej: "musica.mp3")
  musica: "Toy Story - Yo Soy Tu Amigo Fiel (By_ Ricardo Murguía) (Video _ Letra)(MP3_320K).mp3",
  reproducirAlTocar: true, // La música comenzará al tocar cualquier parte de la pantalla

  // === TEXTOS PERSONALIZABLES ===
  textos: {
    titulo: "Estas Invitado!",
    subtitulo: "", // aparecerá como "cumple {edad}!!!" 
    mensajeFinal: "¡Te espero para disfrutar una tarde súper divertida!!!",
    textoBotonMaps: "¿Cómo llegar?",
    textoBotonWhatsApp: "Confirmar asistencia"
  }
};

// ============================================
// TEMAS PREDEFINIDOS
// ============================================
const TEMAS = {
  pawpatrol: {
    contadorDias: "#1B3A6B",
    contadorHoras: "#1B3A6B",
    contadorMinutos: "#1B3A6B",
    contadorSegundos: "#1B3A6B",
    botonMaps: "#3B7DD6",
    botonWhatsApp: "#E53935"
  },
  frozen: {
    contadorDias: "#4FC3F7",
    contadorHoras: "#BA68C8",
    contadorMinutos: "#81C784",
    contadorSegundos: "#FFD54F",
    botonMaps: "#42A5F5",
    botonWhatsApp: "#AB47BC"
  },
  spiderman: {
    contadorDias: "#D32F2F",
    contadorHoras: "#1976D2",
    contadorMinutos: "#FBC02D",
    contadorSegundos: "#303F9F",
    botonMaps: "#1976D2",
    botonWhatsApp: "#D32F2F"
  },
  princesas: {
    contadorDias: "#EC407A",
    contadorHoras: "#AB47BC",
    contadorMinutos: "#FFA726",
    contadorSegundos: "#66BB6A",
    botonMaps: "#EC407A",
    botonWhatsApp: "#AB47BC"
  }
};

// No modifiques nada debajo de esta línea
// ============================================

function obtenerColores() {
  if (CONFIG.tema === "personalizado") {
    return CONFIG.coloresPersonalizados;
  }
  return TEMAS[CONFIG.tema] || TEMAS.pawpatrol;
}