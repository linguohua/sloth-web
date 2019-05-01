<template>
  <el-form ref="form" :model="condition" label-width="112px" size="mini">
    <el-form-item label="集合">
      <el-select v-model="condition.set" placeholder="请选择">
        <el-option label="AND" value="and"></el-option>
        <el-option label="OR" value="or"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="变量名">
      <el-select v-model="condition.variable" placeholder="请选择" @change="onVariableChange">
        <el-option v-for="(item, k) in variableCfg" :key="k" :label="item.name" :value="k"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="取反">
      <el-switch v-model="condition.reverse"></el-switch>
    </el-form-item>
    <el-form-item label="操作符">
      <el-select v-model="condition.operator" placeholder="请选择" @change="onOperatorChange">
        <el-option v-for="item in validOperators" :key="item.k" :label="item.n" :value="item.k"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="值">
      <el-input v-model="condition.value"></el-input>
    </el-form-item>
    <el-form-item size="large">
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="onCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
// 这段JSON字符串和golang服务器的一致
const vcfgJSON = `
	{
		"operators":{
			"version":[{"n":"等于","k":"eq"},{"n":"大于","k":"gt"},{"n":"小于","k":"lt"}],
			"string":[{"n":"等于","k":"eq"},{"n":"包含","k":"ct"}],
			"int":[{"n":"等于","k":"eq"},{"n":"大于","k":"gt"},{"n":"小于","k":"lt"}]
		},
		"variables":{
			"qMode": {
                "name":"模块名字",
				"type":"string"
			},
			"modV": {
                "name":"模块版本",
				"type":"version"
			},
			"csVer": {
                "name":"csharp版本",
				"type":"version"
			},
			"lobbyVer": {
                "name":"lobby版本",
				"type":"version"
			},
			"operatingSystem": {
                "name":"操作系统",
				"type":"string"
			},
			"operatingSystemFamily": {
                "name":"操作系统集",
				"type":"string"
			},
			"deviceUniqueIdentifier": {
                "name":"设备唯一ID",
				"type":"string"
			},
			"deviceName": {
                "name":"设备名字",
				"type":"string"
			},
			"deviceModel": {
                "name":"设备类",
				"type":"string"
			},
			"network": {
                "name":"网络类型",
				"type":"string"
			}
		}
	}`;
export default {
  data() {
    let vcfg = JSON.parse(vcfgJSON);
    let variables = vcfg.variables;
    return {
      validOperators: [],
      condition: {},
      vcfg: vcfg,
      variableCfg: variables
    };
  },
  methods: {
    onVariableChange(value) {
      let varCfg = this.variableCfg[value];
      this.validOperators = this.vcfg.operators[varCfg.type];
      delete this.condition.operator;
    },
    onOperatorChange(value) {
      //console.log(value, this.condition.operator);
    },
    onSubmit() {
      let c = this.condition;
      if (!c.set || c.set === "") {
        console.log("condition.set is invalid");
        return;
      }

      if (!c.variable || c.variable === "") {
        console.log("condition.variable is invalid");
        return;
      }

      if (!c.operator || c.operator === "") {
        console.log("condition.operator is invalid");
        return;
      }

      if (!c.value || c.value === "") {
        console.log("condition.operator is invalid");
        return;
      }

      this.$emit("ok");
    },
    onCancel() {
      this.$emit("cancel");
    }
  }
};
</script>
