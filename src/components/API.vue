<script>
import axios from "axios";
export default {
  loadUpgradeModuleCfgs(cb) {
    axios
      .get("/lobby/uuid/webpi/update/loadAllModules")
      .then(cb)
      .catch(err => console.log(err));
  },
  postUpgradeModuleCfg(data, cb) {
    axios
      .post("/lobby/uuid/webapi/update/uploadModule", data)
      .then(cb)
      .catch(err => console.log(err));
  },
  deleteUpgradeModuleCfgs(data, cb) {
    axios
      .post("/lobby/uuid/webapi/update/deleteModules", data)
      .then(cb)
      .catch(err => console.log(err));
  }
};
</script>
