import { defineStore } from "pinia";
import { info } from "sass";
import { ref } from "vue";

const userUserInfoStore = defineStore("userInfo", () => {
    const info = ref({})

    const setInfo = (newInfo) =>{
        info.value = newInfo
    }

    const removeInfo = () =>{
        info.value = {}
    }

    return{info,setInfo,removeInfo}
},{persist: true}
)

export default userUserInfoStore;