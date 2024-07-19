// Get a list of cities from your database

import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebase";

export async function getCities() {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
  }
  