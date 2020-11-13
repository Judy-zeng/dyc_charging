<template>
    <div class="layout-container">
        <router-view></router-view>
        <tabbar></tabbar>
    </div>
</template>

<script>
    import Tabbar from '../components/Tabbar/Index'
    export default {
        name: 'Layout',
        components: {
            Tabbar
        },
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
