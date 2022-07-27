// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDruETlf0SUqbOOh_KPuOOiy0nvcTGz3XA",
	authDomain: "mezo-shop.firebaseapp.com",
	projectId: "mezo-shop",
	storageBucket: "mezo-shop.appspot.com",
	messagingSenderId: "454238883538",
	appId: "1:454238883538:web:b1616d07e3c07b5033a70b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);

export default app;
