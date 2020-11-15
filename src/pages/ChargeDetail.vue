<template>
    <div class="page-container">
        <c-header>
            <button @click="handleDeviceRepair">设备报修</button>
        </c-header>
        <div class="page-content">
            <div class="charge-detail-title">
                <img src="@/assets/images/icon-charge-detail.png" alt="">
                <span>家园华元小区充电站</span>
            </div>
            <div class="charge-detail-status" :class="{'over': chargeStatus}">
                <template v-if="chargeStatus === 0">
                    <img src="@/assets/images/icon-charge-detail-progress.png" alt="">
                    <p>充电中</p>
                </template>
                <template v-else>
                    <img src="@/assets/images/icon-charge-detail-over.png" alt="">
                    <p>已结束</p>
                </template>
            </div>

            <div class="charge-detail-list-container">
                <list-cell v-for="item in list" :label="item.title" :value="item[item.field]" :key="item.title"/>
            </div>

            <div class="charge-detail-btn" v-if="chargeStatus === 0">
                <button class="charge-btn" @click="handleOverCharge">结束充电</button>
            </div>
        </div>
    </div>
</template>

<script>
    import ListViewCell from "@/components/List/ListViewCell";
    import Header from "@/components/Header";

    export default {
        name: 'ChargeDetail',
        components: {
            'list-cell': ListViewCell,
            'c-header': Header
        },
        filters: {},
        props: {},
        data() {
            return {
                chargeStatus: 0, // 0充电中 1已结束
                list: [
                    {title: '订单编号', field: 'order_no', order_no: '3877465743657465746'},
                    {title: '用户编号', field: 'user_no', user_no: '7435647564756'},
                    {title: '设备编号', field: 'device_no', device_no: '34676435874365'},
                    {title: '充电口', field: 'interface_nu', interface_nu: '02'},
                    {title: '套餐时长', field: 'time', time: '120'},
                    {title: '金额', field: 'money', money: '2.00'},
                    {title: '支付方式', field: 'type', type: '微信支付'},
                    {title: '开始时间', field: 'created_at', created_at: '2020-11-09  13:00:00'}
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
            handleOverCharge() {
                this.chargeStatus = 1;
                this.list.push({title: '结束时间', field: 'finished_at', finished_at: '2020-11-09  13:00:00'})
            },
            handleDeviceRepair() {
                this.$router.push('/device-repair')
            }
        }
    };
</script>

<style scoped lang="scss">
    .page-container {
        .charge-detail-title {
            text-align: center;
            margin: 1.6rem 0 2.1rem 0;

            img {
                width: 1.5rem;
                height: 1.5rem;
            }

            span {
                margin-left: 0.4rem;
                color: $text-primary-color;
                font-size: 0.7rem;
                position: relative;
                top: -0.4rem;
            }
        }

        .charge-detail-status {
            text-align: center;

            img {
                width: 5.1rem;
            }

            p {
                color: $theme-color;
                font-size: 0.8rem;
                margin-top: 1.5rem;;
            }

            &.over {
                p {
                    color: $text-primary-color;
                }
            }
        }

        .charge-detail-list-container {
            margin: 1.7rem 0.5rem;
        }

        .charge-detail-btn {
            padding: 0 0.7rem 0.6rem 0.7rem;

            .charge-btn {
                width: 100%;
                height: 2rem;
                border: none;
                outline: none;
                background-color: $theme-color;
                font-size: 0.9rem;
                border-radius: 0.3rem;
                color: #fff;

                &:disabled {
                    opacity: 0.6;
                }
            }
        }
    }
</style>
