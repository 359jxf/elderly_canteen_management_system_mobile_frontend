<!-- RatingDialog.vue -->
<template>
    <van-dialog v-model:show="show" title="请对本次服务进行评价" show-cancel-button show-confirm-button confirm-button-text="确认"
        cancel-button-text="取消" @confirm="onConfirm" @cancel="onCancel"
        confirmButtonColor="#7AAB13"
        >
        <div style="text-align: center;" class="tasteComment">
            
            <van-rate v-model="rate" :size="30" color="#ffd21e" void-icon="star" void-color="#eeeeee" />
        </div>
        <van-field v-model="comment" rows="4" type="textarea" placeholder="可在此处输入评价" />
    </van-dialog>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const show = ref(false);  // 控制弹窗显示的状态
const rate = ref(3);
const comment = ref('');

// 定义事件
const emit = defineEmits(['confirm', 'cancel']);

// 确认按钮处理
const onConfirm = () => {
    emit('confirm', { rate: rate.value, comment: comment.value });
    show.value = false;
};

// 取消按钮处理
const onCancel = () => {
    emit('cancel');
    show.value = false;
};

// 供父组件调用的方法
function writeComment() {
    show.value = true;
}

function viewComment() {
    console.log('查看评论');
}

// 使用 defineExpose 暴露方法
defineExpose({
    writeComment,
    viewComment
});
</script>

<style scoped>
/* 自定义样式 */
.van-dialog__header {
    text-align: center;
    font-weight: bold;
    
}


</style>