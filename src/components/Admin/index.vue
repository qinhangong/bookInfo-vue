<template>
  <div class="table-container">
    <Table size="mini" :data="tableData" border style="width: 70%">
      <TableColumn fixed type="index" label="序号" align="center"></TableColumn>
      <TableColumn prop="createDate" label="创建时间" align="center" :formatter="handleDateFormat"></TableColumn>
      <TableColumn prop="title" label="名称" align="center"></TableColumn>
      <TableColumn fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <Button @click.native.prevent="handleDelClick(scope.row)" type="text" size="small">删除</Button>
        </template>
      </TableColumn>
    </Table>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { Table, TableColumn, Button } from "element-ui";
export default {
  components: {
    Table,
    TableColumn,
    Button
  },

  data() {
    return {
      tableData: []
    };
  },

  watch: {},

  coumputed: {},

  methods: {
    queryTableData() {
      axios.get("/api/information/list").then(res => {
        const {
          data: { code, data: tableData }
        } = res;
        if (code === 1) {
          this.tableData = tableData;
          if (tableData && !tableData.length) {
            this.$router.push("/");
          }
        }
      });
    },
    handleDateFormat(row) {
      const { createdDate } = row;
      return moment(createdDate).format("YYYY-MM-DD hh:mm:ss");
    },
    handleDelClick(row) {
      this.$confirm("删库跑路需谨慎", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const { _id, avatar } = row;
        const reg = /^(https:\/\/)[\s\S]+(\/img\/)([\s\S]+)$/;
        const avatar_name = reg.exec(avatar)[3];
        const url = `/api/information/list/${_id}/${avatar_name}`;
        axios.delete(url).then(res => {
          const {
            data: { code }
          } = res;
          if (code === 1) {
            this.queryTableData();
          }
        });
      });
    }
  },

  created() {
    this.queryTableData();
  }
};
</script>

<style lang="less">
.table-container {
  .el-table--border {
    margin: 50px auto;
  }
}
</style>


