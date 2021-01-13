<template>
    <div class="page-container">
        <c-header path="/person"></c-header>
        <div class="page-content">
            <charge-cell v-for="(item, index) in list" :item="item" :key="index"></charge-cell>
        </div>
    </div>
</template>

<script>
    import ChargeCell from "@/components/List/ChargeCell";
    import Header from "@/components/Header";
    import {chargeRecord} from "@/network/api";

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
                list: []
            };
        },
        computed: {},
        watch: {},
        created() {
            this._loadData()
        },
        mounted() {
        },
        methods: {
            _loadData() {
                this.$loading('数据加载中')
                chargeRecord().then(res => {
                    switch (res.status_code) {
                        case 200: {
                            // this.list = [
                            //     {name: 'test', order_no: '20210113161054285551711', status: '充电中', charge_time: '', money: 3}
                            // ]
                            this.list = res.data
                            break;
                        }
                        default:
                            alert(res.status_code + ':' + res.message)
                    }
                }).catch(e => {
                    alert(e.message)
                }).finally(() => {
                    this.$loading.close()
                })
            }
        }
    };
</script>

<style scoped lang="scss">

</style>
