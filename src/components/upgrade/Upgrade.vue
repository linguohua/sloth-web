<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown @command="onCommandDropdown">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="view">查看</el-dropdown-item>
          <el-dropdown-item command="add">新增</el-dropdown-item>
          <el-dropdown-item command="del">删除</el-dropdown-item>
          <el-dropdown-item command="cond">条件</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>日光哥哥</span>
    </el-header>

    <el-main>
      <el-table
        ref="singleTable"
        :data="tableData"
        height="75vh"
        highlight-current-row
        @current-change="handleCurrentChange"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" label="选择"></el-table-column>
        <el-table-column type="index" label="索引"></el-table-column>
        <el-table-column prop="name" label="模块名称"></el-table-column>
        <el-table-column prop="version" label="版本"></el-table-column>
        <el-table-column prop="csVer" label="CSharp版本"></el-table-column>
        <el-table-column prop="lobbyVer" label="Lobby版本"></el-table-column>
        <el-table-column prop="default" :formatter="boolValueRenderer" label="是否默认"></el-table-column>
        <el-table-column prop="abList" :formatter="arrayLengthRenderer" label="Bundle数"></el-table-column>
        <el-table-column prop="and" :formatter="arrayLengthRenderer" label="AND条件数"></el-table-column>
        <el-table-column prop="or" :formatter="arrayLengthRenderer" label="OR条件数"></el-table-column>
      </el-table>
      <UploadUpgradeModule ref="uploadDialog" v-on:reload="onReload"/>
      <ViewUpgradeModule ref="viewDialog" v-on:reload="onReload"/>
      <ViewUpgradeModule ref="viewDialog" v-on:reload="onReload"/>
      <Conditions ref="condDialog" :title="condDialogTitle" v-on:reload="onReload"/>
    </el-main>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
</style>
<script>
import api from "../API.vue";
import UploadUpgradeModule from "./UploadUpgradeModule.vue";
import ViewUpgradeModule from "./ViewUpgradeModule.vue";
import Conditions from "./Conditions.vue";
export default {
  components: {
    UploadUpgradeModule: UploadUpgradeModule,
    ViewUpgradeModule: ViewUpgradeModule,
    Conditions: Conditions
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      currentRow: null,
      condDialogTitle: ""
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    boolValueRenderer(row, column, cellValue) {
      return String(cellValue);
    },
    arrayLengthRenderer(row, column, cellValue) {
      if (!cellValue) {
        return 0;
      } else {
        return cellValue.length;
      }
    },
    onReload() {
      api.loadUpgradeModuleCfgs(response => (this.tableData = response.data));
    },
    onCommandDropdown(command) {
      console.log("onCommandDropdown", command);
      if (command === "add") {
        this.$refs["uploadDialog"].dialogVisible = true;
        this.$refs["uploadDialog"].clear();
      } else if (command === "view") {
        if (this.currentRow) {
          let mSelected = this.currentRow;
          this.$refs["viewDialog"].dialogVisible = true;
          this.$refs["viewDialog"].bind(mSelected);
        }
      } else if (command === "del") {
        this.doDeleteModules();
      } else if (command === "cond") {
        if (this.currentRow) {
          this.condDialogTitle = "[" + this.currentRow.name + "] 条件编辑";
          this.$refs["condDialog"].dialogVisible = true;
          this.$refs["condDialog"].bind(this.currentRow);
        }
      }
    },
    doDeleteModules() {
      if (this.multipleSelection.length > 0) {
        let modules = [];
        let length = this.multipleSelection.length;
        for (let i = 0; i < length; i++) {
          let m = {};
          let mSelected = this.multipleSelection[i];
          m.name = mSelected.name;
          m.version = mSelected.version;

          modules.push(m);
        }

        api.deleteUpgradeModuleCfgs(modules, response => {
          this.$message("delete completed:" + response.data);
          if (response.data === "ok") {
            this.onReload();
          }
        });
      }
    }
  },
  mounted() {
    this.onReload();
  }
};
</script>