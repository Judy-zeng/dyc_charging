<template>
    <div class="page-container">
        <div class="page-content">
            <div class="banner-container">
                <img src="@/assets/images/index-banner.png" alt="">
            </div>
            <div class="charge-timing-container">
                <div class="header">
                    <span class="title">选择充电时长（分钟）</span>
                    <span class="money">{{currentList.money}}元</span>
                </div>

                <div class="charge-timing-box">
                    <div class="box-item"
                         @click="handleSelectTiming(item)"
                         :class="{active: currentList.time === item.time}"
                         v-for="item in list"
                         :key="item.time">
                        {{item.time}}
                    </div>
                </div>
            </div>

            <div class="charge-advertisement">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605345004146&di=5e93cbf5b683a928dbeca174489cf070&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D2506197831%2C1636712722%26fm%3D214%26gp%3D0.jpg" alt="">
            </div>

            <div class="charge-timing-btn">
                <button class="charge-btn" @click="handleNextStep">下一步</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ChargeTiming',
        components: {},
        filters: {},
        props: {},
        data() {
            return {
                currentList: {},
                list: [
                    { time: 60, money: 1 },
                    { time: 120, money: 2 },
                    { time: 180, money: 3 },
                    { time: 240, money: 4 },
                    { time: 300, money: 5 },
                    { time: 360, money: 6 },
                    { time: 420, money: 7 },
                    { time: 480, money: 8 },
                    { time: 540, money: 9 }
                ]
            };
        },
        computed: {},
        watch: {},
        created() {
            this.currentList = this.list[0]
        },
        mounted() {
        },
        methods: {
            handleSelectTiming (item) {
                this.currentList = item
            },
            handleNextStep () {
                this.$router.push('/charge-interface')
            }
        }
    };
</script>

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
    .charge-timing-container {
        padding: 0.6rem 0.5rem;
        .header {
            display: flex;
            justify-content: space-between;
            .title, .money{
                font-size: 0.7rem;
                color: $text-primary-color;
            }
            .money{
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
                border: solid 1px rgba(83, 83, 83, 0.69);
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
        width: 100%;
        height: 7.5rem;
        img {
            width: 100%;
            height: 100%;
        }
    }

    .charge-timing-btn {
        padding: 1.5rem 0.7rem 0.6rem 0.7rem;
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
