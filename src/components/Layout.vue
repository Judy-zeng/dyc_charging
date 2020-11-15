<template>
    <div class="layout-container">
        <router-view></router-view>
        <tabbar></tabbar>
    </div>
</template>

<script>
    import Tabbar from './Tabbar'
    export default {
        name: 'Layout',
        components: {
            'tabbar': Tabbar
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
        created() {},
        mounted() {},
        methods: {}
    };
</script>

<style scoped lang="scss">

</style>
