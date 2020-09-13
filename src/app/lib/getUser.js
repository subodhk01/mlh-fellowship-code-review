import { loadFirebase } from './firebase'

const getUser = async () => {
    let firebase = await loadFirebase();
    let user = await new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((u) => {
            resolve(u)
        });
    })
    return user
}

export default getUser