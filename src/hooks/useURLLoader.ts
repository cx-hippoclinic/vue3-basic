import {ref} from 'vue'
import axios from "axios";
function urlLoader(URL: string){
    const loaded = ref(false)
    const loading = ref(true)
    const res = ref(null)
    const err = ref(null)
    axios.get(URL).then((rawData) => {
        res.value = rawData.data
        loaded.value = true
        loading.value = false
    }).catch(e => {
        err.value = e
        loading.value = false
    })
    return {loading,loaded,res,err}
}
export default urlLoader