import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"

export default class CandidateService {
    constructor() {
        this.baseUrl = 'https://api.mybluu.tech/api/'
    }

    async getCandidates() {
        try {
            const response = await axios.get(
                this.baseUrl + 'obtenerCandidatos'
            )
            return response.data
        } catch (error) {
            throw error
        }
    }

    async getCandidateDetails(id) {
        try {
            const response = await axios.get(
                this.baseUrl + 'candidatos/' + id
            )
            return response.data
        } catch (error) {
            throw error
        }
    }

    async voteForCandidate(partido) {
        try {
            const response = await axios.post(
                this.baseUrl + 'registrarVoto',
                {
                    usuarioID: await AsyncStorage.getItem('idUsuario'),
                    opcion: partido
                }
            )
            return response.data
        } catch (error) {
            throw error
        }
    }

    async getVotingResults() {
        try {
            const response = await axios.get(
                this.baseUrl + 'obtenerVotos'
            )
            return response.data
        } catch (error) {
            throw error
        }
    }
}