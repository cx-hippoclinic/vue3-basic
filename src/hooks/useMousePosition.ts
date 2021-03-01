import {onMounted, onUnmounted, ref} from "vue";

function useMousePosition(){
    const x = ref(0)
    const y = ref(0)
    const listenXAndY = (e: MouseEvent) => {
        x.value = e.pageX
        y.value = e.pageY
    }
    onMounted(() => {
        document.addEventListener('click',listenXAndY)
    })
    onUnmounted(() => {
        document.removeEventListener('click',listenXAndY)
    })
    return {x,y}
}
export default useMousePosition