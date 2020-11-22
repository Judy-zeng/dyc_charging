<template>
    <div class="page-header">
        <span class="back-btn"  @click="back"></span>
        <span class="header-text">{{$route.meta.title}}</span>
        <span class="header-opt">
            <slot></slot>
        </span>
    </div>
</template>

<script>

    export default {
        name: 'Header',
        components: {},
        filters: {},
        props: {},
        data() {
            return {
                redirect: undefined // 跳转路径
            };
        },
        computed: {},
        watch: {
            $route: {
                handler(route) {
                    this.redirect = route.query && route.query.redirect
                },
                immediate: true
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            back() {
                this.$router.go(-1)
            }
        }
    };
</script>

<style scoped lang="scss">
    .page-header {
        height: 2.2rem;
        background-color: #fff;
        position: fixed;
        width: 100%;
        text-align: center;
        line-height: 2.2rem;
        box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.07);
        z-index: 10;

        &:before {
            content: " ";
            display: inline-block;
            height: 0.5rem;
            width: 0.5rem;
            border-width: 0 0 2px 2px;
            border-color: #797979;
            border-style: solid;
            -webkit-transform: matrix(.71, .71, -.71, .71, 0, 0);
            transform: matrix(.71, .71, -.71, .71, 0, 0);
            position: absolute;
            top: 50%;
            margin-top: -0.2rem;
            left: 1rem;
        }

        .back-btn {
            display: inline-block;
            width: 2rem;
            height: 2rem;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
        }

        .header-text {
            font-size: 0.8rem;
            font-weight: 400;
            color: $text-primary-color;
        }

        .header-opt {
            position: absolute;
            right: 0.3rem;

            button {
                outline: none;
                background-color: transparent;
                border: none;
                color: #FF9600;
                font-size: 0.7rem;
            }
        }
    }
</style>
