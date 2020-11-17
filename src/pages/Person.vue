<template>
    <div class="page-content">
        <div class="user-info-container">
            <div class="user-info-avatar">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605342241545&di=69d7c848829d0ae87d1aaf1a8b036081&imgtype=0&src=http%3A%2F%2Fpic2.zhimg.com%2F50%2Fv2-af83bfea4dbf90fc7d3571ddb00753ec_hd.jpg" alt="">
            </div>
            <div class="user-info-nickname">
                <p class="nickname">远方的风</p>
                <p class="number">用户编号：20201909098</p>
            </div>
        </div>
        <div class="user-list-container">
            <div class="user-section-charging">
                <div class="user-section-charging-item" @click="handleGoPage('/account-balance')">
                    <p class="money">￥50.00</p>
                    <p class="tip-text">账户余额</p>
                </div>
                <div class="user-section-charging-item" @click="handleGoPage('/balance-charge?redirect=/person')">
                    <img class="charging-icon" src="@/assets/images/icon-person-charging.png" alt="">
                    <p class="tip-text">余额充值</p>
                </div>
            </div>

            <div class="user-section-list">
                <cell v-for="(item, index) in list" :key="index"
                      :title="item.title"
                      :isLink="item.link ? true : false"
                      :link="item.link">
                    <img slot="icon" :src="item.icon"/>
                    <span v-if="item.after" slot="value">{{item.after}}</span>
                </cell>
            </div>
        </div>
    </div>
</template>

<script>
    import Cell from "@/components/List/Cell";
    export default {
        name: 'Person',
        components: {
            Cell
        },
        filters: {},
        props: {},
        data() {
            return {
                list: [
                    {icon: require('../assets/images/icon-person-history.png'), title: '历史账单', link: '/bill-record'},
                    {icon: require('../assets/images/icon-person-record.png'), title: '充电记录', link: '/charge-record'},
                    {icon: require('../assets/images/icon-person-phone.png'), title: '客服电话', after: '051267898765'},
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
            handleGoPage(url) {
                this.$router.replace(url + '?redirect=/person')
            }
        }
    };
</script>

<style scoped lang="scss">
    .user-info-container {
        width: 100%;
        height: 9rem;
        background-color: $theme-color;
        display: flex;
        align-items: center;

        .user-info-avatar {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            border: solid 2px #fff;
            margin: 0 0.6rem 0 0.3rem;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }

        .user-info-nickname {
            flex: 1;
            color: #fff;
            font-weight: 400;

            .nickname {
                font-size: 1.2rem;
            }

            .number {
                font-size: 0.6rem;
                opacity: 0.8;
            }
        }
    }

    .user-list-container {
        background-color: #fff;
        border-top-left-radius: 0.7rem;
        border-top-right-radius: 0.7rem;
        position: relative;
        top: -2rem;
        min-height: 6rem;
        /*height: 100%;*/
        z-index: 1;
        padding: 0 1rem;
        .user-section-charging {
            display: flex;
            align-items: center;
            border-bottom: solid 1px rgba(224, 224, 224, 0.87);
            padding: 0.5rem 0 0.2rem 0;
            .user-section-charging-item {
                flex: 1;
                text-align: center;
                .tip-text {
                    color: #A8A8A8;
                    font-size: 0.6rem;
                    font-weight: 400;
                    margin-top: 0.3rem;
                }
                .charging-icon {
                    width: 1.25rem;
                    height: 1rem;
                }
                .money{
                    color: $text-primary-color;
                    font-size: 0.8rem;
                    font-weight: 400;
                    height: 1.3rem;
                }
            }
        }

        .user-section-list {
            margin: 1.3rem 0;
        }
    }
</style>
