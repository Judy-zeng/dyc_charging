<template>
    <div class="tabbar-wrapper">
        <router-link v-for="(item, index) in tabList"
           :key="index" :to="item.path"
           :class="['tabbar-item', {active: $route.path.includes(item.path)}]">
            <div class="tabbar-icon">
                <img :src=" item.icon" alt="">
            </div>
            <p class="tabbar-label">{{item.name}}</p>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'INDEX',
        components: {},
        filters: {},
        props: {},
        data() {
            return {
                tabList: [
                    {icon: require('@/assets/images/icon-tab-index.png'), name: '首页', path: '/index'},
                    {icon: require('@/assets/images/icon-tab-person.png'), name: '我的', path: '/person'},
                ]
            };
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {}
    };
</script>

<style scoped lang="scss">
.tabbar-wrapper {
    display: flex;
    position: absolute;
    z-index: 500;
    bottom: 0;
    width: 100%;
    height: 3rem;
    background-color: #fff;
    box-shadow: 0 0.2rem 0.6rem 0 rgba(44, 44, 44, 0.4);
    &:before{
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        transform-origin: 0 0;
        transform: scaleY(0.5);
    }

    .tabbar-item {
        display: block;
        flex: 1;
        padding: 0.3rem 0 0;
        font-size: 0;
        color: $tab-text-default-color;
        text-align: center;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        &.active {
            .tabbar-label {
                color: $theme-color;
            }
        }
        .tabbar-icon {
            position: relative;
            display: inline-block;
            width: $tab-icon-size;
            height: $tab-icon-size;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .tabbar-label {
            text-align: center;
            color: $tab-text-default-color;
            font-size: $tab-label-text-size;
            line-height: 1.8;
    }
    }
}
</style>
