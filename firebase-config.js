// ============================================
// 🔥 CONFIGURACIÓN DE FIREBASE
// ============================================
// Credenciales de tu proyecto Firebase

const firebaseConfig = {
  apiKey: "AIzaSyA0OXKn4tKLrcnxY4rLx-VlK5IeyEXz20s",
  authDomain: "invitaciones-web-cad02.firebaseapp.com",
  projectId: "invitaciones-web-cad02",
  storageBucket: "invitaciones-web-cad02.firebasestorage.app",
  messagingSenderId: "92477431024",
  appId: "1:92477431024:web:772f8b64fe72e0338b7635"
};

// No modifiques nada debajo de esta línea
// ============================================

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referencias a los servicios
const db = firebase.firestore();
const auth = firebase.auth();

console.log('🔥 Firebase inicializado correctamente');
