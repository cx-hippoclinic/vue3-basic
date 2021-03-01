<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h1>{{count}}</h1>
  <h1>{{double}}</h1>
  <ul>
    <li v-for="number in numbers" :key="number">{{number}}</li>
  </ul>
  <h1>{{person.name}}</h1>
  <h1>x:{{x}},y:{{y}}</h1>
  <button @click="increase">+</button>
</template>

<script lang="ts">
import {computed,reactive,ref,toRefs,onMounted,onUnmounted} from 'vue'
import useMousePosition from "@/hooks/useMousePosition";
interface DataProps {
  count: number;
  increase: () => void;
  double: number;
  numbers: number[]; //当通过索引直接修改数组项时，也可以响应式
  person: { name?: string}; //可以增加属性
}
export default ({
  name: 'App',
  setup(){
    const data: DataProps = reactive({
      numbers: [0,1,2],
      person: {},
      count: 0,
      increase:()=>{
        data.count ++
      },
      double: computed(() => data.count*2)
    })
    const {x,y} = useMousePosition()
    data.numbers[0] = 5
    data.person.name = 'cx'
    const refData = toRefs(data)
    return {
      ...refData,
      x,
      y
    }
  }
});
</script>

<style>

</style>
