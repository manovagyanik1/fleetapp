import { AsyncStorage } from 'react-native';
import Gen from "./gen";

export default class StorageUtils {
    static saveSync({key, value}) {
        try {
            await AsyncStorage.setItem(key, value);
            Gen.log(`${key} ${value} saved`);
        } catch (error) {
            Gen.log(error);
        }
    }

    static fetchSync({key}) {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null){
                return value;
            }
        } catch (error) {
            Gen.log(error);
        }
    }
}