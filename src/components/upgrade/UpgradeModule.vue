<template>
  <el-form ref="form" :model="modulecfg" label-width="112px" size="mini">
    <el-form-item label="模块名称">
      <el-input v-model="modulecfg.name" readonly></el-input>
    </el-form-item>
    <el-form-item label="是否默认">
      <el-switch v-model="modulecfg.default"></el-switch>
    </el-form-item>
    <el-form-item label="版本号">
      <el-input v-model="modulecfg.version" readonly></el-input>
    </el-form-item>
    <el-form-item label="csharp版本号">
      <el-input v-model="modulecfg.csVer" readonly></el-input>
    </el-form-item>
    <el-form-item label="lobby版本号">
      <el-input v-model="modulecfg.lobbyVer" readonly></el-input>
    </el-form-item>
    <el-form-item label="bundle数量">
      <el-input v-model="bundleArrayLength" readonly></el-input>
    </el-form-item>
    <el-form-item size="large">
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import api from "../API.vue";
export default {
  data() {
    return { modulecfg: {} };
  },
  methods: {
    onSubmit() {
      console.log(this.modulecfg);
      api.postUpgradeModuleCfg(this.modulecfg, response => {
        this.$message("post completed:" + response.data);
        if (response.data === "ok") {
          this.$emit("uploadok");
        }
      });
    },
    onCancel() {
      this.$emit("cancel");
    }
  },
  computed: {
    bundleArrayLength() {
      if (this.modulecfg.abList) {
        return this.modulecfg.abList.length;
      } else {
        return 0;
      }
    }
  },
  mounted() {
    this.$emit("mounted");
  }
};
</script>
