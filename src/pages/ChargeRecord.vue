<template>
    <div class="page-container">
        <c-header></c-header>
        <div class="page-content">
            <charge-cell v-for="(item, index) in list" :item="item" :key="index"></charge-cell>
        </div>
    </div>
</template>

<script>
    import ChargeCell from "@/components/List/ChargeCell";
    import Header from "@/components/Header";

    export default {
        name: 'ChargeRecord',
        components: {
            ChargeCell,
            'c-header': Header
        },
        filters: {},
        props: {},
        data() {
            return {
                list: [
                    {title: '家园华元小区充电站', order_no: '3877465743657465746', time: '120', money: '2.00', status: 1, total: '2.00'},
                    {title: '家园华元小区充电站', order_no: '3877465743657465746', time: '120', money: '2.00', status: 0, total: '2.00'},
                    {title: '家园华元小区充电站', order_no: '3877465743657465746', time: '120', money: '2.00', status: 0, total: '2.00'},
                    {title: '家园华元小区充电站', order_no: '3877465743657465746', time: '120', money: '2.00', status: 0, total: '2.00'},
                    {title: '家园华元小区充电站', order_no: '3877465743657465746', time: '120', money: '2.00', status: 0, total: '2.00'},
                    {title: '家园华元小区充电站', order_no: '3877465743657465746', time: '120', money: '2.00', status: 0, total: '2.00'},
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
