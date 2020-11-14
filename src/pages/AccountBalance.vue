<template>
    <div class="page-container">
        <div class="page-content">
            <div class="account-balance-info">
                <p class="total-money">428.88</p>
                <p class="info-text"> 账户余额（元）</p>
                <button class="info-btn">立即充值</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AccountBalance',
        components: {},
        filters: {},
        props: {},
        data() {
            return {};
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
.page-container {
    .account-balance-info {
        margin: 1.8rem 0 2.1rem 0;
        text-align: center;
        .total-money {
            font-size: 1.5rem;
            color: #151515;
            font-weight: 400;
        }
        .info-text {
            font-size: 0.8rem;
            margin: 0.3rem 0 0.7rem 0.5rem;
        }
        .info-btn {
            font-size: 0.9rem;
            color: #FDFDFD;
            outline: none;
            border: none;
            background-color: $theme-color;
            border-radius: 0.3rem;
            width: 4.9rem;
            height: 2rem;
        }
    }
}
</style>
