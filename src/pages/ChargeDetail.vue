<template>
    <div class="page-container">
        <c-header path="/index">
            <button @click="handleDeviceRepair">设备报修</button>
        </c-header>
        <div class="page-content">
            <div class="charge-detail-title">
                <img src="@/assets/images/icon-charge-detail.png" alt="">
                <span>{{chargeInfo.site_name || ''}}</span>
            </div>
            <div class="charge-detail-status" :class="{'over': chargeStatus}">
                <template v-if="chargeStatus === 0">
                    <img src="@/assets/images/icon-charge-detail-progress.png" alt="">
                    <p>{{chargeInfo.status}}</p>
                </template>
                <template v-else>
                    <img src="@/assets/images/icon-charge-detail-over.png" alt="">
                    <p>{{chargeInfo.status}}</p>
                </template>
            </div>

            <div class="charge-detail-list-container">
                <list-cell v-for="item in list" :label="item.title" :value="item[item.field]" :key="item.title"/>
            </div>

            <div class="charge-detail-btn" v-if="chargeInfo.status === '充电中'">
                <button class="charge-btn" @click="handleOverCharge">结束充电</button>
            </div>
        </div>
    </div>
</template>

<script>
    import ListViewCell from "@/components/List/ListViewCell";
    import Header from "@/components/Header";

    import {chargeDetail, chargeOver} from "@/network/api";

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
                    {title: '订单编号', field: 'order_no', order_no: ''},
                    {title: '用户编号', field: 'member_no', member_no: ''},
                    {title: '设备编号', field: 'device_number', device_number: ''},
                    {title: '充电口', field: 'port', port: ''},
                    {title: '套餐时长', field: 'charge_time', charge_time: ''},
                    {title: '金额', field: 'money', money: ''},
                    {title: '支付方式', field: 'pay_type', pay_type: ''},
                    {title: '开始时间', field: 'charge_begin_at', charge_begin_at: ''}
                ],
                chargeInfo: {}
            };
        },
        computed: {},
        watch: {},
        created() {
            if (this.$route.query.order_no) {
                this._loadData()
            } else {
                alert('订单号缺失')
            }
        },
        mounted() {
        },
        methods: {
            _loadData() {
                this.$loading('数据加载中')
                chargeDetail({order_no: this.$route.query.order_no}).then(res => {
                    switch (res.status_code) {
                        case 200: {
                            let data = res.data
                            if (data.status === '已结束') {
                                this.list.push({title: '结束时间', field: 'charge_end_at', charge_end_at: ''})
                            }
                            this.list.map(v => {
                                v[v.field] = data[v.field]
                            })
                            this.chargeInfo = data
                            break;
                        }
                        default:
                            alert(res.status_code + ':' + res.message)
                    }
                }).catch(e => {
                    alert(e.message)
                }).finally(() => {
                    this.$loading.close();
                })
            },
            handleOverCharge() {
                chargeOver({order_no: this.$route.query.order_no}).then(res => {
                    if (res.status_code === 200) {
                        this._loadData()
                    }
                }).catch(e => {
                    alert(e.message)
                })
                // this.chargeStatus = 1;
                // this.list.push({title: '结束时间', field: 'charge_end_at', charge_end_at: ''})
            },
            handleDeviceRepair() {
                this.$router.push({
                    path: '/device-repair', query: {
                        name: this.chargeInfo.site_name || '',
                        number: this.chargeInfo.device_number || '',
                        port: this.chargeInfo.port || ''
                    }
                })
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
