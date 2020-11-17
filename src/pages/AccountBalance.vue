<template>
    <div class="page-container">
        <c-header @goback="handleGoBack"></c-header>
        <div class="page-content">
            <div class="account-balance-info">
                <p class="total-money">428.88</p>
                <p class="info-text"> 账户余额（元）</p>
                <button class="info-btn" @click="handleGoCharge">立即充值</button>
            </div>

            <div class="account-balance-list">
                <div class="title">余额明细</div>

                <div class="list-wrapper">
                    <record-cell v-for="(item, index) in list" :item="item" :key="index"></record-cell>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import RecordCell from "@/components/List/RecordCell";
    import Header from "@/components/Header";

    export default {
        name: 'AccountBalance',
        components: {
            RecordCell,
            'c-header': Header
        },
        filters: {},
        props: {},
        data() {
            return {
                list: [
                    {title: '订单退款', created_at: '2020-11-10 13:00:00', type: '微信支付', money: '2.00', status: 1},
                    {title: '订单消费', created_at: '2020-11-10 13:00:00', type: '余额支付', money: '-2.00', status: 2},
                    {title: '余额充值', created_at: '2020-11-10 13:00:00', type: '微信支付', money: '2.00', status: 3}
                ]
            };
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {
            handleGoCharge () {
                this.$router.replace({path: '/balance-charge', query: {redirect: '/account-balance'}})
            },
            handleGoBack () {
                this.$router.replace('/person')
            }
        }
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
            padding: 0 0.5rem;
            height: 2rem;
        }
    }

    .account-balance-list {
        .title {
            color: #212121;
            font-size: 0.7rem;
            margin-left: 0.6rem;
        }
    }
}
</style>
