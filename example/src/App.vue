<template>
  <div>123</div>
</template>
<script lang="ts" setup>
import { useCache } from "../../packages";
import axios from "axios";
import { reactive } from "vue";

let fn = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.get("http://localhost:8026/api/school/homeList").then((res) => {
      resolve(res);
    });
  });
};
let key = "a1";
let { result } = await useCache({ key, promise: fn });
const list = reactive({ list: result.data.data.pageList });
console.log(list.list);
</script>