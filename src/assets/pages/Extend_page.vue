<template>
  <div>
    <input type="file" accept="image/*" @change="handleSelect" />
    <button @click="handleUpload" :disabled="!file || uploading">
      {{ uploading ? '上传中...' : '上传到云存储' }}
    </button>

    <!-- 预览 -->
    <img v-if="previewUrl" :src="previewUrl" style="width:200px" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import cloudbase from '@/utils/cloudbase'

const file = ref(null)
const previewUrl = ref('')
const uploading = ref(false)

// 选择图片
const handleSelect = (e) => {
  const f = e.target.files[0]
  if (!f) return
  file.value = f
  previewUrl.value = URL.createObjectURL(f)
}

// 上传到 CloudBase 云存储
const handleUpload = async () => {
  if (!file.value) return
  uploading.value = true

  try {
    // 1. 构造云端路径（避免重名）
    const ext = file.value.name.split('.').pop()
    const cloudPath = `images/${Date.now()}_${Math.random()
      .toString(36)
      .slice(2)}.${ext}`

    // 2. 上传
    const res = await cloudbase.uploadFile({
      cloudPath,
      filePath: file.value // File 对象
    })

    console.log('✅ fileID:', res.fileID)

    // 3. 获取可直接访问的临时链接（前端渲染用）
    const urlRes = await cloudbase.getTempFileURL({
      fileList: [res.fileID]
    })
    const realUrl = urlRes.fileList[0].tempFileURL
    console.log('✅ 图片地址:', realUrl)

    // 4. 可把 res.fileID 或 realUrl 存到你的数据库
    await db.collection('wwqy_weapon').add({wpName:'测试',wpPrice:100, weapimg: res.fileID })

  } catch (err) {
    console.error('❌ 上传失败', err)
  } finally {
    uploading.value = false
  }
}
</script>