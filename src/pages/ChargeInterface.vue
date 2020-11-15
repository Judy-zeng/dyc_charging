<template>
    <div class="page-container">
        <c-header></c-header>
        <div class="page-content">
            <div class="banner-container">
                <img src="@/assets/images/index-banner.png" alt="">
            </div>

            <div class="charge-money-container">
                <div class="money">
                    <span>钱包余额</span>
                    <span class="total-money">180.00</span>
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
                         :key="item.pos">
                        <img v-if="currentInterface === index" src="@/assets/images/icon-charge-interface-selected.png"
                             alt="">
                        <template v-else>
                            <img v-if="item.status === 1" src="@/assets/images/icon-charge-interface-free.png" alt="">
                            <img v-if="item.status === 2" src="@/assets/images/icon-charge-interface-use.png" alt="">
                            <img v-if="item.status === 3" src="@/assets/images/icon-charge-interface-error.png" alt="">
                        </template>
                        <p>{{item.pos > 9 ? item.pos : '0' + item.pos}}</p>
                    </div>
                </div>

                <div class="charge-advertisement">
                    <swiper class="page-banner-swiper"
                            ref="mySwiper"
                            :options="swiperOptions"
                            :auto-update="true"
                            :auto-destroy="true">
                        <swiper-slide class="swiper-slide" v-for="(banner, index) in banners" :key="index">
                            <img :src="banner" alt="">
                        </swiper-slide>
                        <div v-if="banners.length > 1" class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                </div>
            </div>

            <div class="charge-timing-btn">
                <button class="charge-btn" :disabled="currentStatus !== 1" @click="handleShowPay">付款充电</button>
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
                currentStatus: 1,
                list: [ // 1空闲 2使用中 3故障
                    {pos: 1, status: 2},
                    {pos: 2, status: 3},
                    {pos: 3, status: 1},
                    {pos: 4, status: 2},
                    {pos: 5, status: 1},
                    {pos: 6, status: 1},
                    {pos: 7, status: 3},
                    {pos: 8, status: 2},
                    {pos: 9, status: 1},
                    {pos: 10, status: 1}
                ],
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
                banners: [
                    require('../assets/images/index-banner.png'),
                    require('../assets/images/index-banner.png'),
                    require('../assets/images/index-banner.png')
                ], // banner
            };
        },
        computed: {},
        watch: {},
        created() {
            for (let i = 0; i <= this.list.length; i++) {
                if (this.list[i].status === 1) {
                    this.currentInterface = i;
                    break;
                }
            }
        },
        mounted() {
        },
        methods: {
            handleSelectInterface(item, index) {
                this.currentInterface = index
                this.currentStatus = item.status
            },
            handleShowPay() {
                this.$refs.payPopup.showModal()
            },
            handlePayMode(item) {
                this.$router.push('/charge-detail')
            },
            handleGoPay() {
                this.$router.push('/balance-charge')
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

            img {
                width: 100%;
                height: 100%;
            }
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
