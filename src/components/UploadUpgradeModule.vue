<template>
  <el-dialog title="上传更新配置" v-bind:visible.sync="dialogVisible">
    <el-upload
      ref="upload-demo"
      class="upload-demo"
      drag
      accept=".json"
      :on-change="onChanged"
      :auto-upload="false"
      :multiple="false"
      :limit="1"
      :file-list="fileList"
      action="#"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击选择</em>
      </div>
      <div class="el-upload__tip" slot="tip">选择打包后的cfg.json</div>
    </el-upload>
    <UpgradeModule
      ref="upgradeModule"
      style="margin-top:50px;"
      v-on:uploadok="onUploadOK"
      v-on:cancel="$data.dialogVisible = false"
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
      fileList: []
    };
  },
  methods: {
    clear() {
      this.fileList = [];
      if (this.$refs.upgradeModule) {
        this.$refs.upgradeModule.modulecfg = {};
      }
    },
    onChanged(file) {
      console.log("onChanged");
      this.fileList = [file];
      this.loadJSONFile();
    },
    loadJSONFile() {
      let reader = new FileReader();
      reader.onload = event => {
        let moduleCfg = JSON.parse(event.target.result);
        this.$refs.upgradeModule.modulecfg = moduleCfg;
      };
      reader.readAsText(this.fileList[0].raw);
    },
    onUploadOK() {
      this.dialogVisible = false;
      this.$emit("reload");
    }
  }
};
</script>
