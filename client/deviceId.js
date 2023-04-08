import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default async function deviceId() {
  let uuid = uuidv4();
  console.log({ uuid });
  let fetchUUID = await SecureStore.getItemAsync("secure_deviceid");
  //if user has already signed up prior
  /*if (fetchUUID) {
    uuid = fetchUUID;
  }*/
  await SecureStore.setItemAsync("secure_deviceid", uuid);
}

export async function getDeviceId() {
  let fetchUUID = await SecureStore.getItemAsync("secure_deviceid");
  return fetchUUID;
}
