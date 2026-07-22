# 🎉 PLANTILLA DE INVITACIÓN DE CUMPLEAÑOS INFANTIL

## 📋 Descripción
Plantilla profesional y reutilizable para crear invitaciones de cumpleaños infantiles con contador regresivo. 
Totalmente responsive y personalizable.

---

## 🚀 CÓMO USAR LA PLANTILLA (PASO A PASO)

### **Opción 1: Personalización Rápida (5 minutos)**

1. **Abre el archivo `config.js`** con cualquier editor de texto (Bloc de notas, Notepad++, VSCode, etc.)

2. **Modifica solo estos datos:**

```javascript
const CONFIG = {
  nombre: "Tomi",              // ← Cambia el nombre del cumpleañero
  edad: 5,                     // ← Cambia la edad
  fecha: "4 de Abril",         // ← Cambia la fecha (texto libre)
  hora: "16 Hs",               // ← Cambia la hora
  lugar: "Salón Cielo Azul",   // ← Cambia el lugar
  
  // IMPORTANTE: Formato AAAA-MM-DD para el contador
  fechaEvento: "2026-04-04T16:00:00",  // ← Año-Mes-Día
  
  // WhatsApp: 549 + código área + número (sin espacios ni guiones)
  whatsapp: "5491112345678",   // ← Tu número de WhatsApp
  
  // Pega aquí el link completo de Google Maps
  googleMaps: "https://www.google.com/maps",
  
  // Tema de colores
  tema: "pawpatrol",  // Opciones: "pawpatrol", "frozen", "spiderman", "princesas"
  
  // Nombre de tu imagen (debe estar en la misma carpeta)
  imagenTema: "paw-patrol-header.jpg",
};
```

3. **Guarda el archivo** (Ctrl + S)

4. **Abre `index.html`** en cualquier navegador (doble click)

5. **¡Listo!** Tu invitación está personalizada.

---

## 🎨 TEMAS DISPONIBLES

Cambia la línea `tema:` en `config.js`:

- **`"pawpatrol"`** - Azul marino (Paw Patrol)
- **`"frozen"`** - Celeste y violeta (Frozen)
- **`"spiderman"`** - Rojo y azul (Spiderman)
- **`"princesas"`** - Rosa y morado (Princesas)
- **`"personalizado"`** - Define tus propios colores

### Para usar colores personalizados:

```javascript
tema: "personalizado",
coloresPersonalizados: {
  contadorDias: "#FF0000",      // Rojo
  contadorHoras: "#00FF00",     // Verde
  contadorMinutos: "#0000FF",   // Azul
  contadorSegundos: "#FFFF00",  // Amarillo
  botonMaps: "#FF6B6B",
  botonWhatsApp: "#25D366"
}
```

---

## 🖼️ CÓMO CAMBIAR LA IMAGEN TEMÁTICA

### **Método 1: Usar otra imagen que ya tengas**

1. Busca una imagen de internet (Paw Patrol, Frozen, etc.)
2. Descárgala y guárdala en la misma carpeta que `index.html`
3. Renómbrala a algo simple, ejemplo: `frozen.jpg`
4. En `config.js` cambia:
   ```javascript
   imagenTema: "frozen.jpg",
   ```

### **Método 2: Sin imagen**

Si no quieres usar imagen, simplemente:
```javascript
imagenTema: "",
```

---

## 📱 ENVIAR LA INVITACIÓN A TUS CLIENTES

### **Opción A: Enviar archivos por WhatsApp/Email**
1. Comprime toda la carpeta en un ZIP
2. Envíala al cliente
3. El cliente abre `index.html` en su celular o computadora

### **Opción B: Subirla a internet (RECOMENDADO)**
1. Crea una cuenta gratis en:
   - **GitHub Pages** (gratis, el mejor)
   - **Netlify** (gratis)
   - **Vercel** (gratis)

2. Sube los archivos
3. Obtén un link único: `https://tu-nombre.github.io/invitacion-tomi`
4. Comparte el link por WhatsApp

---

## 🔧 PERSONALIZACIÓN AVANZADA

### Cambiar los textos:

En `config.js`, sección `textos`:

```javascript
textos: {
  titulo: "¡Estás invitado!",
  subtitulo: "cumple",
  mensajeFinal: "¡Te espero para disfrutar una tarde súper divertida!!!",
  textoBotonMaps: "¿Cómo llegar?",
  textoBotonWhatsApp: "Confirmar asistencia"
}
```

---

## ❓ PREGUNTAS FRECUENTES

### ¿Cómo obtengo el link de Google Maps?
1. Abre Google Maps en tu celular o PC
2. Busca el lugar del evento
3. Toca "Compartir"
4. Copia el link y pégalo en `config.js`

### ¿Cómo pongo mi número de WhatsApp?
Formato: `549` + `código de área` + `número`

Ejemplos:
- Buenos Aires: `5491112345678`
- Córdoba: `5493512345678`
- Rosario: `5493412345678`

### ¿Funciona en celulares?
¡Sí! La invitación es 100% responsive y se ve perfecta en cualquier celular.

### ¿Puedo usar esto para vender invitaciones?
¡Sí! Esta plantilla es tuya para tu emprendimiento. Solo personalízala para cada cliente.

---

## 📁 ARCHIVOS DEL PROYECTO

```
Proyecto-invitacion/
├── index.html              ← Estructura de la invitación
├── styles.css              ← Estilos y diseño
├── script.js               ← Lógica del contador
├── config.js               ← ¡ARCHIVO A EDITAR!
├── paw-patrol-header.jpg   ← Imagen de ejemplo
└── README.md               ← Este archivo (instrucciones)
```

---

## 💰 TIPS PARA TU EMPRENDIMIENTO

1. **Cobra por invitación:** $2000-$5000 por invitación personalizada
2. **Ofrece paquetes:** 3 invitaciones por $10000
3. **Haz variantes:** Crea versiones de diferentes temas
4. **Velocidad:** Con esta plantilla personalizas una invitación en 5 minutos
5. **Diferenciación:** Ofrece hosting (subir a internet) por un extra

---

## 🆘 SOPORTE

¿Algo no funciona? Revisa:

1. ✅ ¿Guardaste `config.js` después de editarlo?
2. ✅ ¿El nombre de la imagen es correcto?
3. ✅ ¿La fecha está en formato AAAA-MM-DD?
4. ✅ ¿El número de WhatsApp tiene el código de país?

---

## 🎊 ¡ÉXITOS CON TU EMPRENDIMIENTO!

Esta plantilla fue diseñada para ser:
- ✅ Fácil de usar
- ✅ Rápida de personalizar
- ✅ Profesional
- ✅ Responsive (se ve bien en todos los dispositivos)

**¡Ahora solo necesitas conseguir clientes y ganar dinero!** 💰🚀
