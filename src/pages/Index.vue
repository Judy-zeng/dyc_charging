<template>
    <div class="page-content">
        <div class="swiper-banner-container" v-if="topBanner.length">
            <swiper ref="mySwiper"
                    :options="swiperOptions"
                    :auto-update="true"
                    :auto-destroy="true">
                <swiper-slide class="swiper-slide" v-for="(banner, index) in topBanner" :key="index">
                    <a :href="banner.url ? banner.url : 'javascript:;'">
                        <img @click="handleShowContent(banner)" :src="banner.img" alt="">
                    </a>
                </swiper-slide>
                <div v-if="topBanner.length > 1" class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>

        <div class="page-thumb">
            <a v-for="(item, index) in footerBanner"
               :key="index"
               :href="item.url ? item.url : 'javascript:;'">
                <img @click="handleShowContent(item)" :src="item.img" alt="">
            </a>
        </div>

<!--        <div class="swiper-scroll-container" v-if="footerBanner.length">-->
<!--            <swiper class="swiper-scroll" :options="swiperScrollOption">-->
<!--                <swiper-slide v-for="(item, index) in footerBanner" :key="index">-->
<!--                    <a :href="item.url ? item.url : 'javascript:;'">-->
<!--                        <img :src="item.img" alt="">-->
<!--                    </a>-->
<!--                </swiper-slide>-->
<!--            </swiper>-->
<!--        </div>-->

<!--        <div class="scan-qrcode-container">-->
<!--            <div class="scan-qrcode-img">-->
<!--                <img src="@/assets/images/icon-index-scan.png" alt="">-->
<!--            </div>-->
<!--            <div class="scan-qrcode-btn">-->
<!--                <button class="btn btn-plain" @click="_loadWechatSign">扫码充电</button>-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'

    import wx from 'weixin-js-sdk'

    import {indexList, wechatSign} from "@/network/api";
    import {setParams, getParams, getType} from "@/network/utils";

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
                loading: false,
                signs: null,
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
            // this._loadWechatSign()
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
                            let topbanner = top.map(v => {
                                return {
                                    img: v.banner[0] || '',
                                    url: v.url || '',
                                    content: v.content || ''
                                }
                            })
                            let footerbanner = footer.map(v => {
                                return {
                                    img: v.banner[0] || '',
                                    url: v.url || '',
                                    content: v.content || ''
                                }
                            })

                            this.topBanner = topbanner.length ? topbanner : []
                            this.footerBanner = footerbanner.length ? footerbanner : []
                            break;
                        }
                        case 401: {
                            location.href = res.message
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
            _loadWechatSign() {
                // let host = window.location.origin
                let url = ''
                let type = getType()
                if (+type === 1) {
                    let _p = getParams()
                    url = `device_number=${_p.code}`
                } else {
                    url = 'device_number='
                }
                this.loading = true
                wechatSign(url).then(res => {
                    if (res.status_code === 200) {
                        // this.signs = res.data
                        this.handleScanCode(res.data)
                    }
                }).catch(e => {
                    this.loading = false
                }).finally(() => {
                    this.loading = false
                })
            },
            // 调用微信扫码
            handleScanCode(data) {
                // if (!this.signs) {
                //     alert('签名错误')
                //     return
                // }
                // let data = this.signs
                wx.config({
                    debug: false,
                    appId: data.appId,
                    timestamp: data.timestamp,
                    nonceStr: data.nonceStr,
                    signature: data.signature,
                    jsApiList: ['scanQRCode']
                })
                let _this = this
                wx.ready(() => {
                    wx.checkJsApi({
                        jsApiList: ['scanQRCode'],
                        success: function (res) {
                            if (res.checkResult.scanQRCode === true) {
                                wx.scanQRCode({
                                    desc: 'desc',
                                    needResult: 1,
                                    scanType: ['qrCode', 'barCode'],
                                    success(res) {
                                        let path = _this.param2Obj(res.resultStr)
                                        if (path.device_number) {
                                            setParams({code: path.device_number || ''})
                                            _this.$router.push('/charge-timing')
                                        }
                                    }
                                })
                            } else {
                                alert('客服端不支持扫一扫')
                                console.log('客服端不支持扫一扫')
                            }
                        },
                        fail: function (res) {
                            console.log(res)
                        }
                    })

                    wx.error(res => {
                        // console.log(res.errMsg)
                    })
                })
            },
            param2Obj(url) {
                const search = url.split('?')[1];
                if (!search) {
                    return {};
                }
                return JSON.parse(
                    '{"' +
                    decodeURIComponent(search)
                        .replace(/"/g, '\\"')
                        .replace(/&/g, '","')
                        .replace(/=/g, '":"')
                        .replace(/\+/g, ' ') +
                    '"}'
                );
            },
            handleShowContent(item) {
                if (item.content) {
                    sessionStorage.setItem('BLANK_PAGE_CONTENT', item.content)
                    this.$router.push({
                        path: '/blank-page'
                    })
                }
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

    .page-thumb {
        a {
            display: block;
            margin: 0.5rem 0;
        }
        img {
            width: 100%;
        }
    }
</style>
