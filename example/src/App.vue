<template>
  Dev
  <el-table :data="list.list" :height="table.height">
    <el-table-column prop="title" label="title" />
  </el-table>

  <li v-for="item in list.list">{{ item.name }}</li>
</template>
<script lang="ts">
import { useCache, elementTableWapperAutoHeight, utils, func } from "../../packages";
import axios from "axios";
import { reactive, ref } from "vue";

export default {
  setup() {
    const fn = (params): Promise<any> => {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:8026/api/xuezhiqun.school/list", params)
          .then((res) => {
            resolve(res);
          });
      });
    };

    const list = reactive({ list: [] });
    const table = reactive({ height: 20 })

    let dataBind = async () => {
      // let { result } = await useCache({
      //   key: "homelist",
      //   promiseFn: fn,
      //   updateTime: 1
      // });
      // console.log("result > ", result);
      // list.list = result.data.data.pageList;
      let obj = [
        { parentID: "-1", key: "1032", value: "腾云宝(1032)", valueType: 1 },
        { parentID: "1032", key: "1033", value: "腾云小站(1032)", valueType: 1 },
        { parentID: "1033", key: "1034", value: "圈嘀科技(1033)", valueType: 1 },
        { parentID: "1034", key: "1035", value: "友帮管家(1034)", valueType: 1 }
      ];

      let result = utils.array2tree(obj, { parentKey: 'parentID', parentDefaultValue: -1 });
      console.log('result', result);

      // console.log(JSON.stringify(result))

      let paramsData = [{ "parentID": "-1", "key": "1032", "value": "腾云宝(1032)", "valueType": 1, "children": [{ "parentID": "1032", "key": "1033", "value": "腾云小站(1032)", "valueType": 1, "children": [{ "parentID": "1033", "key": "1034", "value": "圈嘀科技(1033)", "valueType": 1, "children": [{ "parentID": "1034", "key": "1035", "value": "友帮管家(1034)", "valueType": 1 }] }] }] }];
      let result2 = utils.tree2array(paramsData);
      console.log('result2', result2)
    };

    dataBind();

    elementTableWapperAutoHeight(table);

    return { list, table };
  },
};
</script>