<template>
  <el-dialog title="查看或编辑更新配置" v-bind:visible.sync="dialogVisible">
    <UpgradeModule
      ref="upgradeModule"
      v-on:uploadok="onUploadOK"
      v-on:cancel="$data.dialogVisible = false"
      v-on:mounted="onModuleMounted"
    />
  </el-dialog>
</template>

<script>
import UpgradeModule from "./UpgradeModule.vue";
export default {
  components: {
    UpgradeModule: UpgradeModule
  },
  data() {
    return {
      dialogVisible: false,
      modulecfg: null
    };
  },
  methods: {
    onUploadOK() {
      this.dialogVisible = false;
      this.$emit("reload");
    },
    bind(mc) {
      this.modulecfg = mc;
      if (this.$refs.upgradeModule) {
        this.$refs.upgradeModule.modulecfg = this.modulecfg;
      }
    },
    onModuleMounted() {
      console.log("onModuleMounted");
      this.$refs.upgradeModule.modulecfg = this.modulecfg;
    }
  }
};
</script>
