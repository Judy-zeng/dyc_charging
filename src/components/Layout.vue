<template>
    <div class="weui-tab" ref="tab">
        <div class="weui-tab__panel">
            <router-view></router-view>
<!--            <div class="weui-tab__content">反馈页</div>-->
<!--            <div class="weui-tab__content">表单页</div>-->
<!--            <div class="weui-tab__content">上传页</div>-->
<!--            <div class="weui-tab__content">其它页</div>-->
        </div>
        <div class="weui-navbar">
            <div :class="['weui-navbar__item', {'weui-bar__item_on': tab.path === $route.path}]"
                 v-for="(tab, index) in tabList" :key="index" @click="handleChangeTab(tab.path)">
                <img :src="require(`@/assets/images/${tab.icon}.png`)" alt="" class="weui-tabbar__icon">
                <p class="weui-tabbar__label">{{tab.name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Layout',
        components: {},
        filters: {},
        props: {},
        data() {
            return {
                activeTab: 0,
                tabList: [
                    {icon: 'icon-tab-index', name: '首页', path: '/index'},
                    {icon: 'icon-tab-person', name: '我的', path: '/person'},
                ]
            };
        },
        computed: {},
        watch: {},
        created() {
            console.log(this.$route.path)
        },
        mounted() {
        },
        methods: {
            handleChangeTab(path) {
                if (this.$route.path === path) return
                this.$router.push(path)
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
