<template>
  <div>
    <div class="tc pd10">
      <i class="iconfont">&#xe613;</i>
      <div>new demo1 liu guang hui</div>
      <div>{{ title }}</div>
    </div>
    <div class="menus">
      <!-- 脚手架的v-for需要一个不重复的key属性 -->
      <el-link type="primary" style="margin: 10px" v-for="d in menus" @click="toPage(d.url)" :key="d.url">{{ d.text }}</el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      title: '￥myweb￥',
      menus: [{ url: '', text: '' }],
    }
  },
  methods: {
    // vue路由api跳转页面
    toPage(url) {
      this.$router.push(url)
    },
  },
}
</script>
<style scoped>
.menus a {
  margin: 1rem;
}
</style>
