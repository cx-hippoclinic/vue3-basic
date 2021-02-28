<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h1>{{count}}</h1>
  <h1>{{double}}</h1>
  <ul>
    <li v-for="number in numbers" :key="number">{{number}}</li>
  </ul>
  <h1>{{person.name}}</h1>
  <h1>{{greetings}}</h1>
  <button @click="increase">+</button>
  <button @click="changeGreet">change title</button>
</template>

<script lang="ts">
import {computed,reactive,ref,toRefs,onMounted,onUpdated,watch} from 'vue'
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
    // const count = ref(0)
    // const double = computed(()=>{
    //   return count.value*2
    // })
    // const increase = ()=>{
    //   count.value++
    // }

    //测试钩子函数
    onMounted(()=>{
      console.log('mount');
    })
    onUpdated(()=>{
      console.log('update');
    })

    const greetings = ref('')
    const changeGreet = () => {
      greetings.value += 'hello!'
    }

    const data: DataProps = reactive({
      numbers: [0,1,2],
      person: {},
      count: 0,
      increase:()=>{
        data.count ++
      },
      double: computed(() => data.count*2)
    })
    // data.count 不是响应式 但是可以调用传get函数（a getter/effect function）
    watch([greetings,() => data.count],(newValue,oldValue)=>{
      document.title = 'update' + greetings.value + data.count
      console.log('new',newValue);
      console.log('old',oldValue);

    })

    data.numbers[0] = 5
    data.person.name = 'cx'
    const refData = toRefs(data)
    return {
      ...refData,
      greetings,
      changeGreet
    }
  }
});
</script>

<style>

</style>
