import axios from "axios";

const journalApi = axios.create({
    baseURL: 'https://vue-demos-aa51b-default-rtdb.firebaseio.com'
})

export default journalApi