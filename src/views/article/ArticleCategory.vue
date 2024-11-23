<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
const categorys = ref([])

import {articleCategoryList} from '@/api/article'

const getArticleCategoryList = async () => {
  try {
    const result = await articleCategoryList();
    if (result.code === 0) {
      categories.value = result.data;
    } else {
      console.log(result.msg);
    }
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
};

onMounted(() => {
  getArticleCategoryList();
});
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>文章分类</span>
                <div class="extra">
                    <el-button type="primary">添加分类</el-button>
                </div>
            </div>
        </template>
        <el-table :data="categorys" style="width: 100%">
            <el-table-column label="序号" width="100" type="index"> </el-table-column>
            <el-table-column label="分类名称" prop="categoryName"></el-table-column>
            <el-table-column label="分类别名" prop="categoryAlias"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" ></el-button>
                    <el-button :icon="Delete" circle plain type="danger"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
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