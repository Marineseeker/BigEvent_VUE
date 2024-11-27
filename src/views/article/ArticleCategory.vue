<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { ref, onMounted, onUnmounted} from 'vue'
const categorys = ref([])

import {articleCategoryList, articleCategoryAddService
    , updateCategoryService, deleteCategoryService} from '@/api/article'

const getArticleCategoryList = async() => {
  try {
    const result = await articleCategoryList();
    if (result.code === 0) {
      categorys.value = result.data;
    } else {
      console.log(result.msg);
    }
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
};

const updateCategory = async() =>{
    let result = await updateCategoryService(categoryModel.value);
    ElMessage.success(result.msg ? result.msg : '修改成功');
    // 重新获取分类列表
    getArticleCategoryList();
    dialogVisible.value = false;
}

onMounted(() => {
  getArticleCategoryList();
});

//控制添加分类弹窗
const dialogVisible = ref(false)

//添加分类数据模型
const categoryModel = ref({
    categoryName: '',
    categoryAlias: ''
})
//添加分类表单校验
const rules = {
    categoryName: [
        { required: true, message: '请输入分类名称', trigger: 'blur' },
    ],
    categoryAlias: [
        { required: true, message: '请输入分类别名', trigger: 'blur' },
    ]
}

import { ElMessage } from 'element-plus';
const addCategory = async() =>{
  let result = await articleCategoryAddService(categoryModel.value);
  ElMessage.success(result.msg ? result.msg : '添加成功');
  getArticleCategoryList();
  dialogVisible.value = false;
}

const title = ref('')

const showEditDialog = (row)=>{
    dialogVisible.value = true;
    title.value = "编辑分类";
    categoryModel.value.categoryName = row.categoryName;
    categoryModel.value.categoryAlias = row.categoryAlias;
    categoryModel.value.id = row.id;
}

const clearData = ()=>{
    categoryModel.value.categoryName = '';
    categoryModel.value.categoryAlias = '';
    categoryModel.value.id = '';
}


import { ElMessageBox } from 'element-plus';
const deleteCategory = (row) => {
  ElMessageBox.confirm(
    '文章分类被删除后, 该分类下的文章也会被删除, 是否继续?',
    'Warning',
    {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning',
    }
  )
    .then(async () => {
        let result = await deleteCategoryService(row.id);
        ElMessage({
            type: 'success',
            message: 'Delete completed',
        })
        getArticleCategoryList();
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

onMounted(() => {
  document.addEventListener('keydown', handleEnterKey);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEnterKey);
});

const handleEnterKey = (event) => {
  if (event.key === 'Enter' && dialogVisible.value) {
    // 根据标题判断执行的操作
    if (title.value === '添加分类') {
      addCategory();
    } else if (title.value === '编辑分类') {
      updateCategory();
    }
  }
};


</script>
<template>
    <el-card class="page-container">
        <template #header>                                                                                               
            <div class="header">
                <span>文章分类</span>
                <div class="extra">
                    <el-button type="primary" @click="dialogVisible=true, title='添加分类', clearData()">添加分类</el-button>
                </div>
            </div>
        </template>
        <el-table :data="categorys" style="width: 100%">
            <el-table-column label="序号" width="100" type="index"> </el-table-column>
            <el-table-column label="分类名称" prop="categoryName"></el-table-column>
            <el-table-column label="分类别名" prop="categoryAlias"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="showEditDialog(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button>
                </template>  
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>

        <!-- 添加分类弹窗 -->
        <el-dialog v-model="dialogVisible" :title="title" width="30%">
            <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px">
                <el-form-item label="分类名称" prop="categoryName">
                    <el-input v-model="categoryModel.categoryName" minlength="1" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="分类别名" prop="categoryAlias">
                    <el-input v-model="categoryModel.categoryAlias" minlength="1" maxlength="15"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="title=='添加分类' ? addCategory() : updateCategory()"> 确认 </el-button>
                </span>
            </template>
        </el-dialog>
    </el-card>
</template>            

<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>