<template>
    <div class="page-content">
        <div class="swiper-banner-container" v-if="topBanner.length">
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

        <div class="swiper-scroll-container" v-if="footerBanner.length">
            <swiper class="swiper-scroll" :options="swiperScrollOption">
                <swiper-slide v-for="(item, index) in footerBanner" :key="index">
                    <img :src="item" alt="">
                </swiper-slide>
            </swiper>
        </div>

        <div class="scan-qrcode-container">
            <div class="scan-qrcode-img">
                <img src="@/assets/images/icon-index-scan.png" alt="">
            </div>
            <div class="scan-qrcode-btn">
                <button class="btn btn-plain" @click="handleScanCode">扫码充电</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'

    import wx from 'weixin-js-sdk'

    import {indexList} from "@/network/api";
    import {setParams} from "@/network/utils";

    export default {
        name: 'Index',
        components: {
            swiper,
            swiperSlide
        },
        filters: {},
        props: {},
        data() {
            return {
                topBanner: [],
                footerBanner: [],
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
                swiperScrollOption: {
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    loop: true,
                    coverflowEffect: {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false
                    }
                }
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
                indexList().then(res => {
                    switch (res.status_code) {
                        case 200: {
                            let top = res.data.top_banner || []
                            let footer = res.data.footer_banner || []
                            this.topBanner = top.length ? top[0].banner : []
                            this.footerBanner = footer.length ? footer[0].banner : []
                            break;
                        }
                        default:
                            alert(res.status_code + ':' + res.message)
                    }
                }).catch(e => {
                    console.log(e)
                    alert(e.message)
                }).finally(() => {
                    this.$loading.close();
                })
            },
            // 调用微信扫码
            handleScanCode() {
                //::todo 存储扫码回调参数并跳转
                setParams({code: '20201020'})
                this.$router.push('/charge-timing')
                // wx.config({
                //     debug: true,
                //     appId: '',
                //     timestamp: '',
                //     nonceStr: '',
                //     signature: '',
                //     jsApiList: ['scanQRCode']
                // })
                // // let _this = this
                // wx.ready(() => {
                //     wx.checkJsApi({
                //         jsApiList: ['scanQRCode'],
                //         success: function (res) {
                //             if (res.checkResult.scanQRCode === true) {
                //                 wx.scanQRCode({
                //                     desc: 'desc',
                //                     needResult: 1,
                //                     scanType: ['qrCode'],
                //                     success(res) {
                //                         let result = res.resultStr
                //                         console.log(result)
                //                         this.$router.push('/charge-timing')
                //                     }
                //                 })
                //             } else {
                //                 console.log('客服端不支持扫一扫')
                //             }
                //         },
                //         fail: function (res) {
                //             console.log(res)
                //         }
                //     })
                //
                //     wx.error(res => {
                //         console.log(res.errMsg)
                //     })
                // })
            }
        }
    };
</script>

<style scoped lang="scss">
    .swiper-banner-container {
        height: 7.5rem;
    }

    .swiper-scroll-container {
        width: 100%;
        height: 6.5rem;
        margin: 2rem 0;

        .swiper-container {
            height: 100%;
        }

        .swiper-slide {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 0.5rem;
            width: calc(100% - 6rem);
            height: 100%;
            background-position: center;
            background-size: cover;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .scan-qrcode-container {
        text-align: center;
        margin: 3rem 0;

        .scan-qrcode-img {
            width: 4.5rem;
            height: 4.5rem;
            margin: auto;

            img {
                width: 100%;
            }
        }

        .scan-qrcode-btn {
            width: 4.5rem;
            margin: 0.7rem auto;

            .btn {
                width: 100%;
                outline: none;
                border: solid 1px $button-primary-color;
                border-radius: 0.2rem;
                background-color: $button-primary-color;
                font-size: 0.8rem;
                padding: .5rem 0;

                &.btn-plain {
                    background-color: #fff;
                    color: $button-primary-color;
                }
            }
        }
    }
</style>
