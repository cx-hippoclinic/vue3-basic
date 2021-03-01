<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>{{count}}</h1>
    <h1>{{double}}</h1>
    <h1 v-if="loading">loading...</h1>
    <img v-if="loaded" :src="res.message">
    <ul>
      <li v-for="number in numbers" :key="number">{{number}}</li>
    </ul>
    <h1>{{person.name}}</h1>
    <button @click="increase">+</button>
  </div>
</template>

<script lang="ts">
import {computed,reactive,ref,toRefs,onMounted,onUnmounted} from 'vue'
import urlLoader from "@/hooks/useURLLoader";

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
    const {res,loading,loaded} = urlLoader('https://dog.ceo/api/breeds/image/random')
    data.numbers[0] = 5
    data.person.name = 'cx'
    const refData = toRefs(data)
    return {
      ...refData,
      res,
      loaded,
      loading
    }
  }
});
</script>

<style>
  div{
    margin: 0 auto;
    width: 500px;
    text-align: center;
  }
  ul{
    list-style:none
  }
</style>
