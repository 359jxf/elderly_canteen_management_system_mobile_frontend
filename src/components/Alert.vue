<template>
    <div v-if="visible" class="modal-overlay">
      <div class="modal-content">
        <button class="close-button" @click="closeModal">×</button>
        <p>{{ message }}</p> <!-- 显示传入的信息 -->
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    visible: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      default: '这是一个提示信息', // 默认提示信息
    },
  });
  
  const emit = defineEmits(['close']);
  
  const closeModal = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5); /* 背景变暗 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    position: relative;

    height: 20%;
    width: 80%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  </style>
  