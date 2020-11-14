<template>
    <div class="page-container">
        <div class="page-content">
            <div class="list-wrapper">
                <record-cell v-for="(item, index) in list" :item="item" :key="index"></record-cell>
            </div>
        </div>
    </div>
</template>

<script>
    import RecordCell from "@/components/List/RecordCell";
    export default {
        name: 'BillRecord',
        components: {
            RecordCell
        },
        filters: {},
        props: {},
        data() {
            return {
                list: [
                    {title: '余额充值', created_at: '2020-11-10 13:00:00', type: '微信支付', money: '2.00', status: 3},
                    {title: '充电消费', created_at: '2020-11-10 13:00:00', type: '余额支付', money: '-2.00', status: 2},
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
        methods: {}
    };
</script>

<style scoped lang="scss">

</style>
