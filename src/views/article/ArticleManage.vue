<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>文章管理</span>
                <div class="extra">
                    <el-button type="primary" @click="visibleDrawer = true">添加文章</el-button>
                </div>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            <el-form-item label="文章分类：">
                <el-select placeholder="请选择" v-model="categoryId">
                    <el-option v-for="c in categorys" :key="c.id" :label="c.categoryName" :value="c.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="发布状态：">
                <el-select placeholder="请选择" v-model="state">
                    <el-option label="已发布" value="已发布"></el-option>
                    <el-option label="草稿" value="草稿"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="articleList">搜索</el-button>
                <el-button @click="resetFilters">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 文章列表 -->
        <el-table :data="articles" style="width: 100%">
            <el-table-column label="文章标题" width="400" prop="title"></el-table-column>
            <el-table-column label="分类" prop="categoryId"></el-table-column>
            <el-table-column label="发表时间" prop="createTime"> </el-table-column>
            <el-table-column label="状态" prop="state"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary"></el-button>
                    <el-button :icon="Delete" circle plain type="danger"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!-- 分页条 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5, 10, 15]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />
        <!-- 抽屉 -->
        <el-drawer v-model="visibleDrawer" title="添加文章" direction="rtl" size="50%">
            <!-- 添加文章表单 -->
            <el-form :model="articleModel" label-width="100px">
                <el-form-item label="文章标题">
                    <el-input v-model="articleModel.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item label="文章分类">
                    <el-select placeholder="请选择" v-model="articleModel.categoryId">
                        <el-option v-for="c in categorys" :key="c.id" :label="c.categoryName" :value="c.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章封面">

                    <el-upload class="avatar-uploader" :auto-upload="true" :show-file-list="false"
                    action = "/api/upload"
                    name = "file"
                    :headers = "{'Authorization': tokenStore.token}"
                    :on-success = "uploadSuccess"
                    >
                        <img v-if="articleModel.coverImg" :src="articleModel.coverImg" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>

                </el-form-item>
                <el-form-item label="文章内容">
                    <div class="editor">
                        <quill-editor theme="snow" v-model:content="articleModel.content" contentType="html">
                        </quill-editor>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addArticle('已发布')">发布</el-button>
                    <el-button type="info" @click="addArticle('草稿')">草稿</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Edit, Delete } from '@element-plus/icons-vue';

// 文章分类数据模型
const categorys = ref([]);

// 用户搜索时选中的分类id
const categoryId = ref('');

// 用户搜索时选中的发布状态
const state = ref('');

// 文章列表数据模型
const articles = ref([]);

// 分页条数据模型
const pageNum = ref(1); // 当前页
const total = ref(20); // 总条数
const pageSize = ref(3); // 每页条数

// 分页条逻辑
const onSizeChange = (size) => {
    pageSize.value = size;
    articleList();
};
const onCurrentChange = (num) => {
    pageNum.value = num;
    articleList();
};

// 加载分类数据
import { articleCategoryList } from '@/api/article';
const getArticleCategoryList = async () => {
    let result = await articleCategoryList();
    categorys.value = result.data;
};

// 加载文章列表
import { articleListService } from '@/api/article';
const articleList = async () => {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        categoryId: categoryId.value ? categoryId.value : null,
        state: state.value ? state.value : null,
    };
    let result = await articleListService(params);
    total.value = result.data.total;
    articles.value = result.data.items;

    // 映射分类名
    for (let i = 0; i < articles.value.length; i++) {
        let article = articles.value[i];
        for (let k = 0; k < categorys.value.length; k++) {
            let category = categorys.value[k];
            if (article.categoryId === category.id) {
                article.categoryId = category.categoryName;
                break;
            }
        }
    }
};

// 重置筛选条件
const resetFilters = () => {
    categoryId.value = '';
    state.value = '';
    articleList(); // 重置后重新加载文章列表
};

onMounted(() => {
    getArticleCategoryList();
    articleList();
});
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Plus } from '@element-plus/icons-vue'
//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加表单数据模型
const articleModel = ref({
    title: '',
    categoryId: '',
    coverImg: '',
    content: '',
    state: ''
})

import { useTokenStore } from '@/stores/token';
const tokenStore = useTokenStore();

const uploadSuccess = (result) =>{
    articleModel.value.coverImg = result.data;
    console.log(result.data);
}

import { articleAddService } from '@/api/article';
import { ElMessage } from 'element-plus';
const addArticle = async(clickState) => {
    articleModel.value.state = clickState
    await articleAddService(articleModel.value);
    ElMessage.success('发布成功');
    visibleDrawer.value = false;
    articleList();
}


</script>

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

/* 抽屉样式 */
.avatar-uploader {
    :deep() {
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            text-align: center;
        }
    }
}

.editor {
    width: 100%;

    :deep(.ql-editor) {
        min-height: 200px;
    }
}
</style>
