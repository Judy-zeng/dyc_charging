<template>
    <div class="page-container">
        <c-header></c-header>
        <div class="page-content">
            <div class="list-wrapper">
                <record-cell v-for="(item, index) in list" :item="item" :key="index"></record-cell>
            </div>
        </div>
    </div>
</template>

<script>
    import RecordCell from "@/components/List/RecordCell";
    import Header from "@/components/Header";
    import {billRecord} from "@/network/api";

    export default {
        name: 'BillRecord',
        components: {
            RecordCell,
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
                billRecord().then(res => {
                    switch (res.status_code) {
                        case 200: {
                            this.list = res.data.list
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
            },
        }
    };
</script>

<style scoped lang="scss">

</style>
