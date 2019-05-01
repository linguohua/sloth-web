<template>
  <el-dialog :title="title" v-bind:visible.sync="dialogVisible" style="height:auto">
    <div style="margin-top: 20px">
      <el-button type="primary" @click="$data.condAddVisible = true">增加条件</el-button>
    </div>
    <ConditionAdd
      ref="condAdd"
      v-show="condAddVisible"
      v-on:cancel="$data.condAddVisible = false"
      v-on:ok="onAdd"
    />
    <h3>AND条件集合</h3>
    <el-table :data="andTableData" style="width: 100%;" max-height="250">
      <el-table-column fixed prop="variable" label="变量" width="150"></el-table-column>
      <el-table-column prop="reverse" label="取反" :formatter="boolValueRenderer" width="120"></el-table-column>
      <el-table-column prop="operator" label="操作符" width="120"></el-table-column>
      <el-table-column prop="value" label="值" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, andTableData)"
            type="text"
            size="small"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <h3>OR条件集合</h3>
    <el-table :data="orTableData" style="width: 100%;" max-height="250">
      <el-table-column fixed prop="variable" label="变量" width="150"></el-table-column>
      <el-table-column prop="reverse" label="取反" width="120"></el-table-column>
      <el-table-column prop="operator" label="操作符" width="120"></el-table-column>
      <el-table-column prop="value" label="值" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, orTableData)"
            type="text"
            size="small"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin-top: 20px">
      <el-button type="primary" @click="onSave">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ConditionAdd from "./ConditionAdd.vue";
import api from "./API.vue";
export default {
  components: {
    ConditionAdd: ConditionAdd
  },
  props: {
    title: String
  },
  data() {
    return {
      condAddVisible: false,
      andTableData: [],
      orTableData: [],
      dialogVisible: false,
      modulecfg: {}
    };
  },
  methods: {
    // 把boolean转换为字符串用于显示
    boolValueRenderer(row, column, cellValue) {
      if (!cellValue) {
        return "false";
      }
      return String(cellValue);
    },
    // 确认添加
    onAdd() {
      let c = this.$refs.condAdd.condition;
      let nc = {};
      nc.variable = c.variable;
      if (c.reverse) {
        nc.reverse = c.reverse;
      }
      nc.operator = c.operator;
      nc.value = c.value;

      console.log(nc);
      if (c.set === "and") {
        this.andTableData.push(nc);
      } else if (c.set === "or") {
        this.orTableData.push(nc);
      }
    },
    // 删除条件
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    // 保存
    onSave() {
      console.log(this.modulecfg);
      api.postUpgradeModuleCfg(this.modulecfg, response => {
        this.$message("post completed:" + response.data);
        if (response.data === "ok") {
          this.$emit("reload");
        }
      });
    },
    // 绑定模块配置
    bind(modulecfg) {
      this.modulecfg = modulecfg;
      if (!modulecfg.and) {
        modulecfg.and = [];
      }
      if (!modulecfg.or) {
        modulecfg.or = [];
      }
      this.andTableData = modulecfg.and;
      this.orTableData = modulecfg.or;
    }
  }
};
</script>
