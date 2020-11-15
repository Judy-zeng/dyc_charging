<template>
    <div class="page-container">
        <c-header></c-header>
        <div class="page-content">
            <div class="device-info">
                <div class="device-info-icon">
                    <img src="@/assets/images/icon-index-scan.png" alt="">
                </div>
                <div class="device-info-item">
                    <p class="device-address">某某小区充电站</p>
                    <p class="device-number">设备号：783647673</p>
                    <p class="device-interface">充电口：01</p>
                </div>
            </div>

            <div class="device-repair-form">
                <div class="form-item">
                    <div class="label">报修人</div>
                    <div class="input">
                        <input type="text" placeholder="请输入报修人">
                    </div>
                </div>
                <div class="form-item">
                    <div class="label">联系方式</div>
                    <div class="input">
                        <input type="text" placeholder="请输入联系方式">
                    </div>
                </div>
                <div class="form-item online">
                    <div class="label">故障原因</div>
                    <div class="input">
                        <textarea style="resize: none" placeholder="请输入故障原因"></textarea>
                    </div>
                </div>

                <div class="device-repair-btn">
                    <button class="charge-btn" @click="handleConfirm">提交</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "@/components/Header";

    export default {
        name: 'DeviceRepair',
        components: {
            'c-header': Header
        },
        filters: {},
        props: {},
        data() {
            return {};
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {
            handleConfirm() {
                this.$router.push('/index')
            }
        }
    };
</script>

<style scoped lang="scss">
.page-container {
    .device-info {
        display: flex;
        padding: 0.6rem;
        border-bottom: solid 0.2rem #E3E3E3;
        box-sizing: border-box;
        .device-info-icon {
            width: 4.5rem;
            height: 4.5rem;
            margin-right: 0.6rem;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .device-info-item {
            flex: 1;
            .device-address {
                font-size: 0.9rem;
                color: #1F1F1E;
                margin: 0.4rem 0;
            }
            .device-number, .device-interface {
                font-size: 0.8rem;
                font-weight: 400;
                color: rgba(31, 31, 30, 0.87);
            }
        }
    }

    .device-repair-form {
        .form-item {
            &:not(.online) {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 2.5rem;
                padding: 0 1rem 0 0.5rem;
                box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.07);
                .label {
                    font-size: 0.7rem;
                    color: #1F1F1E;
                    font-weight: normal;
                    white-space: nowrap;
                    width: 40%;
                }
                .input {
                    flex: 1;
                    text-align: right;
                    input[type='text'] {
                        border: none;
                        outline: none;
                        font-size: 0.6rem;
                        width: 100%;
                        height: 1.5rem;
                        color: #333333;
                        padding-left: 0.5rem;
                        text-align: right;

                        &::-webkit-input-placeholder {
                            color: #C7C5C0;
                        }
                    }
                }
            }
            &.online {
                /*margin: 0.7rem 0.5rem;*/
                .label {
                    font-size: 0.7rem;
                    color: #1F1F1E;
                    font-weight: normal;
                    white-space: nowrap;
                    margin: 0.7rem 0.5rem;
                }
                .input {
                    margin: 0 0.6rem 0 0.5rem;
                    textarea {
                        /*border: none;*/
                        border: solid 1px rgba(191, 191, 191, 0.7);
                        border-radius: 0.2rem;
                        outline: none;
                        font-size: 0.6rem;
                        width: 95%;
                        color: #333333;
                        height: 5.6rem;
                        padding: 0.5rem;

                        &::-webkit-input-placeholder {
                            color: #C7C5C0;
                        }
                    }
                }
            }
        }

        .device-repair-btn {
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
