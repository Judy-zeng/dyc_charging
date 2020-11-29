<template>
    <div class="record-cell">
        <div class="cell-title">
            <img src="@/assets/images/icon-charge-detail.png" alt="">
            <span class="title">{{item.name}}</span>
            <span class="status" :class="{progress: item.status === '充电中'}">{{item.status}}</span>
        </div>
        <div class="cell-content">
            <div class="record-cell-hd">
                <p class="cell-time">订单编号 {{item.order_no}}</p>
                <p class="cell-type">套餐时长 {{item.charge_time}}  套餐金额 {{item.money}}</p>
            </div>
            <div class="record-cell-ft">
                <span>{{item.money}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ChargeCell',
        components: {},
        filters: {},
        props: {
            item: {
                type: Object,
                default: () => {
                }
            }
        },
        data() {
            return {};
        },
        computed: {
        },
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {}
    };
</script>

<style scoped lang="scss">
    .record-cell {
        padding: 0.6rem 0.6rem 1rem 0.6rem;
        box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.07);

        .cell-title {
            font-size: 0.8rem;
            color: $text-primary-color;
            margin: 0.4rem 0;

            span {
                &.title {
                    position: relative;
                    top: -0.4rem;
                }

                &.status {
                    font-size: 0.6rem;
                    color: #181818;
                    float: right;
                    position: relative;
                    top: 0.5rem;

                    &.progress {
                        color: $theme-color;
                    }
                }
            }

            img {
                width: 1.5rem;
                height: 1.5rem;
                margin-right: 0.3rem;
            }
        }

        .cell-content {
            display: flex;
            justify-content: space-between;
            padding-left: 1.7rem;
            /*align-items: center;*/

            .record-cell-hd {
                .cell-time, .cell-type {
                    font-size: 0.6rem;
                    color: #8F8F8F;
                    white-space: nowrap;
                }
            }

            .record-cell-ft {
                font-size: 0.9rem;
            }
        }
    }
</style>
