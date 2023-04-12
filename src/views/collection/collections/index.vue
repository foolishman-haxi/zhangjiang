<template>
    <div>
        <div class="total">
            <i class="el-icon-tickets" style="margin-right: 5px"></i>藏品列表
            <div class="btn-add">
                <el-button size="small" type="primary" plain @click="handleAdd()">添加</el-button>
            </div>
        </div>
        <el-card style="height: 500px;width: 1200px;" class="elCard">
            <el-table :data="seriesList" border height="410px" style="width: 100%">
                <el-table-column fixed prop="id" label="ID" align="center" width="140">
                </el-table-column>
                <el-table-column prop="name" label="藏品名称" align="center" width="140">
                </el-table-column>
                <el-table-column prop="startTime" label="售卖时间" align="center" width="160">
                </el-table-column>
                <el-table-column prop="price" label="藏品价格（￥）" align="center" width="160">
                </el-table-column>
                <el-table-column prop="endTime" label="截止时间" align="center" width="180">
                </el-table-column>
                <el-table-column prop="collectionsNumber" label="数量（份）" align="center" width="180">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center" width="180">
                    <template slot-scope="scope">
                        <el-button @click="handleDetail(scope.row)" type="text" size="mini">查看详情</el-button>
                        <el-button @click="handleDelete(scope.row)" type="text" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
//后端接口
import { listCollections, delCollections } from "../../../api/collection/collections"

export default {
    data() {
        return {
            // 加载效果
            loading: true,
            seriesList: []

        };
    },
    created() {
        this.getCollectionList()
    },
    methods: {

        // 添加藏品
        handleAdd() {
            this.$router.push({ path: "/addcollections" });
        },
        //藏品详情
        handleDetail(row) {
            this.$router.push({ name: "collectionsDeatil", params: { row } });
        },
        //获取藏品列表
        getCollectionList() {
            const Uid = this.$route.query.id;
            window.localStorage.setItem("Uid", Uid)
            var id = localStorage.getItem("Uid")
            listCollections(id).then((res) => {
                this.seriesList = res.rows
            })
        },
        //删除
        handleDelete(row) {
            this.$confirm('是否确认删除藏品编号为"' + row.id + '"的数据项？', '提示').then(function () {
                return delCollections(row.id);
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.getCollectionList();
            }).catch((res) => {
                console.log(res);
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.total {
    border: 1px solid #ebebeb;
    margin: 20px 15px 20px 20px;
    padding: 20px;
    border-radius: 4px;
}

.btn-add {
    float: right;
    margin: auto;
}

.list {
    margin: 20px 10px 20px 20px;
}
</style>
<style>