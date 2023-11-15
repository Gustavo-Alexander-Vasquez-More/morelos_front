// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {v4} from 'uuid'

const firebaseConfig = {
    apiKey: "AIzaSyC962xjQ9LItv0Jcbghmq1qVMYXoCO2YxM",
    authDomain: "morelos-permisos.firebaseapp.com",
    projectId: "morelos-permisos",
    storageBucket: "morelos-permisos.appspot.com",
    messagingSenderId: "937603456312",
    appId: "1:937603456312:web:62974e121fb08b3923b5cd"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadQr(file) {
  // Generar un nombre único para la foto usando uuid
  const qrId = v4();

  // Crear la referencia con la carpeta "fotos" y el nombre único
  const storageRef = ref(storage, `qr/${qrId}`);

  try {
    // Subir el archivo a Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);

    // Obtener la URL de descarga del archivo
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log(downloadURL);

    return downloadURL; // Devolver la URL de descarga
  } catch (error) {
    console.error("Error al cargar el archivo:", error);
    throw error;
  }
}