<template>
    <div class="page-container">
        <c-header></c-header>
        <div class="page-content">
            <div class="banner-container">
                <img src="@/assets/images/index-banner.png" alt="">
            </div>

            <div class="balance-charge-container">
                <div class="title">充值金额</div>
                <div class="my-balance">
                    我的余额：50.00元
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
                            <span>{{item.tip}}</span>
                        </div>
                    </div>
                </div>

                <div class="charge-balance-btn">
                    <button class="charge-btn" @click="handleConfirmCharge">充值</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/Header";

    export default {
        name: 'BalanceRecharge',
        components: {
            'c-header': Header
        },
        filters: {},
        props: {},
        data() {
            return {
                currentIndex: 0,
                list: [
                    { money: 50, tip: ''},
                    { money: 100, tip: '充100送1元'},
                    { money: 200, tip: '充100送1元'},
                    { money: 500, tip: '充100送1元'}
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
            handleSelectBalance(index) {
                this.currentIndex = index
            },
            handleConfirmCharge() {
                this.$router.push('/index')
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
