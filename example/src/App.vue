<template>
  <div>123</div>
  <li v-for="item in list.list">{{ item.title }}</li>
</template>
<script lang="ts">
import { useCache } from "../../packages";
import axios from "axios";
import { reactive, setup } from "vue";

export default {
  setup() {
    const fn = (): Promise<any> => {
      return new Promise((resolve, reject) => {
        axios.get("http://localhost:8026/api/school/homeList").then((res) => {
          resolve(res);
        });
      });
    };

    const list = reactive({ list: [] });

    let dataBind = async () => {
      let { result } = await useCache({ key: "a1", promiseFn: fn });
      console.log("result", result);
      list.list = result.data.data.pageList;
    };

    dataBind();

    return { list };
  },
};
</script>