<template>
    <div class="page-container">
        <c-header :path="path"></c-header>
        <div class="page-content">
            <div class="swiper-banner-container top-banner-swiper">
                <swiper ref="myTimingSwiper"
                        :options="swiperOptions"
                        :auto-update="true"
                        :auto-destroy="true">
                    <swiper-slide class="swiper-slide" v-for="(banner, index) in topBanner" :key="index">
                        <a :href="banner.url ? banner.url : 'javascript:;'">
                            <img :src="banner.img" alt="">
                        </a>
                    </swiper-slide>
                    <div v-if="topBanner.length > 1" class="timing-swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <div class="charge-timing-container">
                <div class="header">
                    <span class="title">选择充电时长（分钟）</span>
                    <span class="money">{{currentList.money}}元</span>
                </div>

                <div class="charge-timing-box">
                    <div class="box-item"
                         @click="handleSelectTiming(item)"
                         :class="{active: currentList.minutes === item.minutes}"
                         v-for="item in list"
                         :key="item.time">
                        {{item.minutes}}
                    </div>
                </div>
            </div>

            <div class="swiper-banner-container charge-advertisement">
                <swiper ref="myTimingSwiper"
                        :options="swiperOptions"
                        :auto-update="true"
                        :auto-destroy="true">
                    <swiper-slide class="swiper-slide" v-for="(banner, index) in footerBanner" :key="index">
                        <a :href="banner.url ? banner.url : 'javascript:;'">
                            <img :src="banner.img" alt="">
                        </a>
                    </swiper-slide>
                    <div v-if="footerBanner.length > 1" class="timing-swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>

            <div class="charge-timing-btn">
                <button class="charge-btn" @click="handleNextStep">下一步</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'
    import Header from "@/components/Header";
    import {timingList} from "@/network/api";
    import {getParams, setParams, setType} from "@/network/utils";

    export default {
        name: 'ChargeTiming',
        components: {
            'c-header': Header,
            swiper,
            swiperSlide
        },
        filters: {},
        props: {},
        data() {
            return {
                currentList: {},
                topBanner: [],
                footerBanner: [],
                list: [],
                path: '/index',
                swiperOptions: {
                    observer: true,
                    observeParents: true,
                    pagination: {
                        el: '.timing-swiper-pagination'
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
            this._loadData()
        },
        mounted() {
        },
        methods: {
            _loadData() {
                let code = this.$route.query.device_number || ''
                if (code) {
                    setParams({code: code, type: 1})
                    // this.path = `/index?device_number=${code}`
                } else {
                    let params = getParams()
                    code = params.code
                    setParams({type: 0})
                }
                // if (!params.code) {
                //     code = this.$route.query.device_number || ''
                //     if (code) {
                //         setParams({code: code})
                //         setType(1)
                //     }
                // } else {
                //     code = params.code
                // }
                this.$loading('数据加载中')
                timingList({device_number: code}).then(res => {
                    switch (res.status_code) {
                        case 200: {
                            let top = res.data.top_banner || []
                            let footer = res.data.footer_banner || []
                            let topbanner = top.map(v => {
                                return {
                                    img: v.banner[0] || '',
                                    url: v.url || ''
                                }
                            })
                            let footerbanner = footer.map(v => {
                                return {
                                    img: v.banner[0] || '',
                                    url: v.url || ''
                                }
                            })

                            this.topBanner = topbanner.length ? topbanner : []
                            this.footerBanner = footerbanner.length ? footerbanner : []

                            this.list = res.data.time_package || []
                            this.currentList = this.list.length ? this.list[0] : {}
                            setParams({time: this.currentList.minutes, money: this.currentList.money})
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
                    alert(e.message)
                }).finally(() => {
                    this.$loading.close();
                })
            },
            handleSelectTiming(item) {
                this.currentList = item
                setParams({time: item.minutes, money: item.money})
            },
            handleNextStep() {
                this.$router.push('/charge-interface')
            }
        }
    };
</script>

<style scoped lang="scss">
    .page-container {
        .top-banner-swiper {
            height: 7.5rem;
            background-color: #E3E3E3;
            border-bottom: solid 0.25rem #E3E3E3;
            box-sizing: border-box;
        }

        .charge-timing-container {
            padding: 0.6rem 0.5rem;

            .header {
                display: flex;
                justify-content: space-between;

                .title, .money {
                    font-size: 0.7rem;
                    color: $text-primary-color;
                }

                .money {
                    color: $theme-color;
                    margin-right: 0.5rem;
                }
            }

            .charge-timing-box {
                display: grid;
                grid-gap: 0.9rem 3.1rem;
                grid-template-columns: repeat(3, 1fr);
                margin: 0.9rem 0 0.5rem 0;

                .box-item {
                    border: solid 1px rgba(83, 83, 83, 0.6);
                    box-sizing: border-box;
                    border-radius: 0.3rem;
                    text-align: center;
                    color: #3F3F3F;
                    height: 2rem;
                    line-height: 2rem;
                    font-size: 0.9rem;
                    transition: background-color 0.3s;

                    &.active {
                        background-color: $theme-color;
                        color: #fff;
                        border: solid 1px $theme-color;
                        box-sizing: border-box;
                    }
                }
            }
        }

        .charge-advertisement {
            height: 7.5rem;
        }

        .charge-timing-btn {
            padding: 1.5rem 0.7rem 1rem 0.7rem;

            .charge-btn {
                width: 100%;
                height: 2rem;
                border: none;
                outline: none;
                background-color: $theme-color;
                font-size: 0.9rem;
                border-radius: 0.3rem;
                color: #fff;
            }
        }
    }
</style>
