<template>
    <div>
        <transition :name="`popup-animate-bottom`">
            <div v-show="isShow" class="popup-dialog"
                 :class="[`popup-bottom`, isShow ? 'popup-show' : '']">
                <div class="popup-content">
                    <div class="popup-item"
                         v-for="(item, index) in list"
                         :key="index" @click="handleSelectItem(item)">{{item.name}}
                    </div>
                    <div class="popup-item cancel" @click="closeModal">取消</div>
                </div>
            </div>
        </transition>
        <a @click="closeModal"
           class="popup-mask"
           :class="{' popup-show': isShow}" :style="{zIndex: maskIndex}"></a>
    </div>
</template>

<script>
    export default {
        name: 'Popup',
        components: {},
        filters: {},
        props: {},
        data() {
            return {
                maskIndex: -1,
                isShow: false,
                list: []
            };
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {
            showModal(data) {
                this.list = data
                this.maskIndex = 500
                this.isShow = true
            },
            closeModal() {
                this.isShow = false
                setTimeout(() => {
                    this.maskIndex = -1
                }, 200)
            },
            handleSelectItem(item) {
                this.$emit('on-change', item)
                this.closeModal()
            }
        }
    };
</script>

<style scoped lang="scss">
    .popup-dialog {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 7.8rem;
        z-index: 501;
        transition-property: transform;
        transition-duration: 300ms;
        max-height: 100%;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        background-color: #fff;

        .popup-content {
            text-align: center;

            .popup-item {
                height: 2.5rem;
                line-height: 2.5rem;
                font-size: 0.9rem;
                color: #515151;

                &.cancel {
                    border-top: solid 0.25rem #E3E3E3;
                }
            }
        }
    }

    .popup-mask {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        tap-highlight-color: rgba(0, 0, 0, 0);
        transition: opacity 400ms;
    }

    .popup-mask.popup-show {
        opacity: 1;
    }

    .popup-animate-bottom-enter, .popup-animate-bottom-leave-active {
        transform: translate3d(0, 100%, 0);
    }

    .popup-animate-top-enter, .popup-animate-top-leave-active {
        transform: translate3d(0, -100%, 0);
    }


    .popup-animate-left-enter, .popup-animate-left-leave-active {
        transform: translate3d(-100%, 0, 0);
    }

    .popup-animate-right-enter, .popup-animate-right-leave-active {
        transform: translate3d(100%, 0, 0);
    }

    .popup-animate-top-enter, .popup-animate-top-leave-active {
        transform: translate3d(0, -100%, 0);
    }
</style>
