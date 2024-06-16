import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class LoginService {
    constructor() {
        this.baseUrl = 'https://api.mybluu.tech/api/'
    }

    async login(usuario, password) {
        try {
            const response = await axios.post(
                this.baseUrl + 'iniciarSesion',
                {
                    nombreUsuario: usuario,
                    password: password
                },
            )

            await AsyncStorage.setItem('idUsuario', response.data.id.toString())
        } catch (error) {
            throw error
        }
    }
}