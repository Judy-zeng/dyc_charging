<template>
    <div class="page-container">
        <c-header :path="rebackPath"></c-header>
        <div class="page-content">
            <div class="swiper-banner-container banner-container" v-if="topBanner.length">
                <swiper ref="mySwiper"
                        :options="swiperOptions"
                        :auto-update="true"
                        :auto-destroy="true">
                    <swiper-slide class="swiper-slide" v-for="(banner, index) in topBanner" :key="index">
                        <img :src="banner" alt="">
                    </swiper-slide>
                    <div v-if="topBanner.length > 1" class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>

            <div class="balance-charge-container">
                <div class="title">充值金额</div>
                <div class="my-balance">
                    我的余额：{{balance}}元
                </div>
                <div class="charge-list">
                    <div class="charge-list-title">请选择充值金额</div>

                    <div class="balance-charge-box">
                        <div class="box-item-wrap"
                             @click="handleSelectBalance(index)"
                             v-for="(item, index) in list"
                             :key="index">
                            <div :class="{active: currentIndex === index}"
                                 class="box-item">{{item.money}}</div>
                            <span>{{item.remark}}</span>
                        </div>
                    </div>
                </div>

                <div class="charge-balance-btn">
                    <button class="charge-btn" :disabled="loading" @click="handleConfirmCharge">充值</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/Header";
    import {balanceCharge, orderPay, paySuccess} from "@/network/api";
    import {swiper, swiperSlide} from "vue-awesome-swiper";
    import wx from "weixin-js-sdk";

    export default {
        name: 'BalanceRecharge',
        components: {
            'c-header': Header,
            swiper,
            swiperSlide
        },
        filters: {},
        props: {},
        data() {
            return {
                loading: false,
                rebackPath: '',
                currentIndex: 0,
                balance: 0,
                list: [],
                topBanner: [],
                swiperOptions: {
                    observer: true,
                    observeParents: true,
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false
                    }
                }
            };
        },
        computed: {},
        watch: {},
        created() {
            if (this.$route.query.path) {
                this.rebackPath = this.$route.query.path
            }
            this._loadData()
        },
        mounted() {
        },
        methods: {
            _loadData() {
                this.$loading('数据加载中')
                balanceCharge().then(res => {
                    switch (res.status_code) {
                        case 200: {
                            this.balance = res.data.money
                            this.list = res.data.list
                            let top = res.data.top_banner || []
                            this.topBanner = top.length ? top[0].banner : []
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
            handleSelectBalance(index) {
                this.currentIndex = index
            },
            handleConfirmCharge() {
                let item = this.list[this.currentIndex]
                let params = {
                    consume_type: 1, // 会员充值
                    pay_type: 1,
                    money: item.money,
                    giving_money: item.giving_money
                }
                this.confirmPayOrder(params)
                // this.$router.push('/index')
            },
            // 选择微信/余额支付
            confirmPayOrder(data) {
                orderPay(data).then(res => {
                    switch (res.status_code) {
                        case 200: {
                            this.getWxConfigSign(res.data)
                            break;
                        }
                        default:
                            alert(res.status_code + ':' + res.message)
                    }
                }).catch(e => {
                    alert(e.message)
                })
            },
            // 微信支付签名
            getWxConfigSign(data) {
                wx.config({
                    debug: false,
                    appId: data.appId,
                    timestamp: data.timestamp,
                    nonceStr: data.nonceStr,
                    signature: data.paySign,
                    jsApiList: ['chooseWXPay']
                })

                wx.ready(() => {
                    wx.chooseWXPay({
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr,
                        package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                        signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        paySign: data.paySign, // 支付签名
                        success: function (res) {
                            console.log(res)
                            // 支付成功后的回调函数
                            this.wechatPaySuccess(data.order_no)
                        },
                        fail: function (err) {
                            console.log(err.errMsg)
                        }
                    })

                    wx.error(res => {
                        console.log(res.errMsg)
                    })
                })
            },
            // 支付成功确认
            wechatPaySuccess(orderNo) {
                paySuccess({order_no: orderNo}).then(res => {
                    if (res.status_code === 200) {
                        this.$router.replace(this.rebackPath || '/person')
                    }
                }).catch(e => {
                    alert(e.message)
                })
            }
        }
    };
</script>

<style scoped lang="scss">
    $btn-charge-color: #FFBA00;
    .page-container {
        .banner-container {
            height: 7.5rem;
            background-color: #E3E3E3;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .balance-charge-container {
            padding: 0 0.5rem;
            .title {
                font-size: 0.8rem;
                color: #212121;
                text-align: center;
                margin: 1.3rem 0 0.6rem 0;
            }
            .my-balance {
                font-size: 0.7rem;
                margin-bottom: 1.4rem;
            }

            .charge-list {
                .charge-list-title {
                    font-size: 0.7rem;
                    color: #212121;
                }

                .balance-charge-box {
                    display: grid;
                    grid-gap: 1rem;
                    grid-template-columns: repeat(4, 1fr);
                    margin: 0.9rem 0 0.5rem 0;
                    .box-item-wrap {
                        span {
                            font-size: 0.5rem;
                            color: #FFA200;
                            white-space: nowrap;
                        }
                    }
                    .box-item {
                        border: solid 1px $btn-charge-color;
                        box-sizing: border-box;
                        border-radius: 0.3rem;
                        text-align: center;
                        color: $btn-charge-color;
                        height: 1.5rem;
                        line-height: 1.5rem;
                        font-size: 0.7rem;
                        transition: background-color 0.3s;
                        &.active {
                            background-color: $btn-charge-color;
                            color: #fff;
                            border: solid 1px $btn-charge-color;
                            box-sizing: border-box;
                        }
                    }
                }
            }

            .charge-balance-btn {
                margin: 2.5rem 0;
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
    }
</style>
