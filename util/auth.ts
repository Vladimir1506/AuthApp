import axios from 'axios';

const API_KEY = 'AIzaSyCsHW_xnvMj5LC7SeMKOLQlwAvdasvGcgg'
export const auth = async (mode: 'signUp' | 'signInWithPassword', email: string, password: string) => {
    return (await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`, {
        email,
        password,
        returnSecureToken: true,
    }))?.data?.idToken
}
