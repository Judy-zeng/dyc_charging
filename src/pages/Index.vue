<template>
    <div class="page-container">
        <div class="swiper-container" v-if="banners.length">
            <swiper class="page-banner-swiper"
                    ref="mySwiper"
                    :options="swiperOptions"
                    :auto-update="true"
                    :auto-destroy="true">
                <swiper-slide class="swiper-slide" v-for="banner in banners" :key="banner">
                    <img :src="banner" alt="">
                </swiper-slide>
                <div v-if="banners.length > 1" class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
    </div>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'
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
                banners: [
                    require('../assets/images/index-banner.png'),
                    require('../assets/images/index-banner.png'),
                    require('../assets/images/index-banner.png')
                ], // banner
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
        },
        mounted() {
        },
        methods: {}
    };
</script>

<style lang="scss">
    .swiper-container-horizontal > .swiper-pagination-bullets {
        bottom: 0;
    }

    .swiper-pagination-bullet {
        background-color: #ffffff;
        opacity: 1;
    }

    .swiper-pagination-bullet-active {
        background-color: $theme-color;
    }
</style>

<style scoped lang="scss">
    .swiper-container {
        width: 100%;
        height: 7.5rem;
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
            }
        }
    }
</style>
