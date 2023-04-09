import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export async function setDeviceId() {
  let uuid = uuidv4();
  console.log({ uuid });
  /*let fetchUUID = await SecureStore.getItemAsync("secure_deviceid");
  //if user has already signed up prior
  if (fetchUUID) {
    uuid = fetchUUID;
  }*/
  await SecureStore.setItemAsync("secure_deviceid", uuid);
}

export async function getDeviceId() {
  let fetchUUID = await SecureStore.getItemAsync("secure_deviceid");
  return fetchUUID;
}

export async function setLocalUsername(username) {
  //if user has already signed up prior
  /*
  let fetchUsername = await SecureStore.getItemAsync("gamedockUsername");
  if (fetchUsername) {
    uuid = fetchUsername;
  }*/
  await SecureStore.setItemAsync("gamedockUsername", username);
}

export async function getLocalUsername() {
  let fetchUsername = await SecureStore.getItemAsync("gamedockUsername");
  return fetchUsername;
}
