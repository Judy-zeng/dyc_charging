<template>
    <div class="page-container">
        <c-header></c-header>
        <div class="page-content">
            <div class="swiper-banner-container banner-container">
                <swiper ref="myTimingSwiper"
                        :options="swiperOptions"
                        :auto-update="true"
                        :auto-destroy="true">
                    <swiper-slide class="swiper-slide" v-for="(banner, index) in topBanner" :key="index">
                        <img :src="banner" alt="">
                    </swiper-slide>
                </swiper>
            </div>
            <!--            <div class="banner-container">-->
            <!--                <img src="@/assets/images/index-banner.png" alt="">-->
            <!--            </div>-->

            <div class="charge-money-container">
                <div class="money">
                    <span>钱包余额</span>
                    <span class="total-money">{{totalMoney}}</span>
                </div>
                <div class="invest-btn" @click="handleGoPay">
                    <span>去充值</span>
                </div>
            </div>

            <div class="charge-timing-container">
                <div class="header">
                    <span class="title">选择充电口</span>
                    <span class="status">
                        <span class="status-item free"><i></i>空闲</span>
                        <span class="status-item used"><i></i>使用中</span>
                        <span class="status-item error"><i></i>故障</span>
                    </span>
                </div>

                <div class="charge-timing-box">
                    <div class="box-item"
                         :class="{active: currentInterface === index}"
                         @click="handleSelectInterface(item, index)"
                         v-for="(item, index) in list"
                         :key="item.port">
                        <img v-if="currentInterface === index" src="@/assets/images/icon-charge-interface-selected.png"
                             alt="">
                        <template v-else>
                            <img v-if="item.status === 0" src="@/assets/images/icon-charge-interface-free.png" alt="">
                            <img v-if="item.status === 1" src="@/assets/images/icon-charge-interface-use.png" alt="">
                            <img v-if="item.status === 2" src="@/assets/images/icon-charge-interface-error.png" alt="">
                        </template>
                        <p>{{item.port > 9 ? item.port : '0' + item.port}}</p>
                    </div>
                </div>

                <div class="charge-advertisement">
                    <swiper class="page-banner-swiper"
                            ref="mySwiper"
                            :options="swiperOptions"
                            :auto-update="true"
                            :auto-destroy="true">
                        <swiper-slide class="swiper-slide" v-for="(banner, index) in footerBanner" :key="index">
                            <img :src="banner" alt="">
                        </swiper-slide>
                        <div v-if="footerBanner.length > 1" class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                </div>
            </div>

            <div class="charge-timing-btn">
                <button class="charge-btn" :disabled="currentStatus !== 0" @click="handleShowPay">付款充电</button>
            </div>
        </div>
        <popup ref="payPopup" @on-change="handlePayMode"></popup>
    </div>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'

    import Popup from "@/components/Popup";
    import Header from "@/components/Header";
    import wx from "weixin-js-sdk";

    import {interfaceList, orderPay, paySuccess} from "@/network/api";
    import {getParams} from "@/network/utils";

    export default {
        name: 'ChargeInterface',
        components: {
            swiper,
            swiperSlide,
            Popup,
            'c-header': Header
        },
        filters: {},
        props: {},
        data() {
            return {
                currentInterface: 0,
                currentStatus: 0,
                totalMoney: 0, // 余额
                list: [], // 0空闲 1使用中 2故障
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
                },
                topBanner: [],
                footerBanner: [],
                payModeList: [
                    {id: 1, name: '微信支付'},
                    {id: 2, name: '钱包支付'}
                ]
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
                let params = getParams()
                this.$loading('数据加载中')
                interfaceList({device_number: params.code}).then(res => {
                    switch (res.status_code) {
                        case 200: {
                            let top = res.data.top_banner || []
                            let footer = res.data.footer_banner || []
                            this.topBanner = top.length ? top[0].banner : []
                            this.footerBanner = footer.length ? footer[0].banner : []

                            this.list = res.data.ports || []

                            for (let i = 0; i < this.list.length; i++) {
                                if (this.list[i].status === 0) {
                                    this.currentInterface = i;
                                    break;
                                }
                            }

                            this.totalMoney = res.data.money
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
            handleSelectInterface(item, index) {
                this.currentInterface = index
                this.currentStatus = item.status
            },
            handleShowPay() {
                this.$refs.payPopup.showModal(this.payModeList)
            },
            // 发起支付
            handlePayMode(item) {
                let _params = getParams()
                let _port = this.list[this.currentInterface]
                let params = {
                    device_number: _params.code,
                    consume_type: 2, // 充电付款
                    pay_type: item.id,
                    money: _params.money,
                    port: _port.port,
                    charge_time: _params.time
                }
                this.confirmPayOrder(params)
                // this.$router.push('/charge-detail')
            },
            // 去充值
            handleGoPay() {
                this.$router.replace('/balance-charge?path=charge-interface')
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
            // 选择微信/余额支付
            confirmPayOrder(data) {
                orderPay(data).then(res => {
                    switch (res.status_code) {
                        case 200: {
                            if (data.pay_type === 1) { // 微信支付
                                this.getWxConfigSign(res.data)
                            } else {
                                this.$router.push('/charge-detail?order_no=' +res.data.order_no)
                            }
                            break;
                        }
                        default:
                            alert(res.status_code + ':' + res.message)
                    }
                }).catch(e => {
                    alert(e.message)
                })
            },
            // 支付成功确认
            wechatPaySuccess(orderNo) {
                paySuccess({order_no: orderNo}).then(res => {
                    if (res.status_code === 200) {
                        this.$router.push('/charge-detail?order_no=' + orderNo)
                    }
                }).catch(e => {
                    alert(e.message)
                })
            }
        }
    };
</script>

<style lang="scss">
    .charge-advertisement {
        .swiper-container-horizontal > .swiper-pagination-bullets {
            bottom: 0;
        }

        .swiper-pagination-bullet {
            width: 0.3rem;
            height: 0.3rem;
        }

        .swiper-pagination-bullet-active {
            background-color: #fff;
        }
    }
</style>

<style scoped lang="scss">
    .page-container {
        .banner-container {
            height: 7.5rem;
            background-color: #E3E3E3;
            border-bottom: solid 0.25rem #E3E3E3;
            box-sizing: border-box;
        }

        .charge-money-container {
            border-bottom: solid 0.25rem #E3E3E3;
            box-sizing: border-box;
            font-size: 0.7rem;
            color: $text-primary-color;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 2.5rem;
            padding: 0 0.5rem;
            position: relative;
            z-index: 1;

            &:after {
                content: " ";
                display: inline-block;
                height: 0.3rem;
                width: 0.3rem;
                border-width: 2px 2px 0 0;
                border-color: #5c5c5c;
                border-style: solid;
                -webkit-transform: matrix(.71, .71, -.71, .71, 0, 0);
                transform: matrix(.71, .71, -.71, .71, 0, 0);
                position: absolute;
                top: 50%;
                margin-top: -4px;
                right: 0.5rem;
            }

            .total-money {
                font-weight: bold;
                margin: 0 1rem;
            }

            .invest-btn {
                margin-right: 1rem;
                opacity: 0.8;
            }
        }

        .charge-timing-container {
            padding: 0.6rem 0.5rem;

            .header {
                display: flex;
                justify-content: space-between;

                .title, .status {
                    font-size: 0.7rem;
                    color: $text-primary-color;
                }

                .status {
                    position: relative;
                    top: 0.1rem;

                    .status-item {
                        margin-left: 0.5rem;
                        font-size: 0.6rem;

                        i {
                            display: inline-block;
                            width: 0.5rem;
                            height: 0.5rem;
                            border-radius: 50%;
                            margin-right: 0.2rem;
                        }

                        &.free {
                            i {
                                background-color: $theme-color;
                            }
                        }

                        &.used {
                            i {
                                background-color: #AFAFAF;
                            }
                        }

                        &.error {
                            i {
                                background-color: #FF9E05;
                            }
                        }
                    }
                }
            }

            .charge-timing-box {
                display: grid;
                grid-gap: 0.6rem 0.7rem;
                grid-template-columns: repeat(5, 1fr);
                margin: 0.9rem 0 0.5rem 0;

                .box-item {
                    border: solid 1px #AFAFAF;
                    box-sizing: border-box;
                    border-radius: 0.3rem;
                    text-align: center;
                    color: #3E3E3E;
                    height: 3rem;
                    font-size: 0.7rem;
                    padding-top: 0.3rem;

                    &.active {
                        background-color: $theme-color;
                        color: #fff;
                        border: solid 1px $theme-color;
                        box-sizing: border-box;
                    }

                    img {
                        width: 1.5rem;
                    }
                }
            }

            .charge-advertisement {
                width: 100%;
                height: 8rem;

                .page-banner-swiper {
                    height: 100%;
                }

                .swiper-slide {
                    text-align: center;
                    background: #fff;

                    /* Center slide text vertically */
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: -webkit-flex;
                    display: flex;
                    -webkit-box-pack: center;
                    -ms-flex-pack: center;
                    -webkit-justify-content: center;
                    justify-content: center;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    -webkit-align-items: center;
                    align-items: center;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }

        .charge-timing-btn {
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
