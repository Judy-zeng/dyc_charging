<template>
    <div class="modal-container" v-if="isShow">
        <div class="modal-content">
            <div class="modal-header">
                <span>请填写手机号码</span>
                <span class="close" v-on:click="closeModal">x</span>
            </div>
            <div class="modal-form">
                <input v-model="mobile" class="input" type="text" placeholder="">
            </div>
            <div class="modal-footer">
                <button class="charge-btn" v-on:click="handleConfirm">确定</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'WhitePayModal',
        components: {},
        filters: {},
        props: {},
        data() {
            return {
                isShow: false,
                mobile: '',
                params: {}
            };
        },
        computed: {},
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {
            showModal(params) {
                this.params = {...params}
                this.isShow = true
            },
            closeModal() {
                this.isShow = false
                this.mobile = ''
            },
            handleConfirm() {
                if (!this.mobile) {
                    alert('请输入手机号码')
                    return
                }
                const reg = /^((13[0-9])|(14[0-9])|(15[0-9])|(16[0-9])|(17[0-9])|(18[0-9])|(19[0-9]))\d{8}$/;
                if (!reg.test(this.mobile)) {
                    alert('请填写正确的手机号')
                    return
                }

                this.params = {...this.params, ...{phone: this.mobile}}
                this.$emit('confirmPhone', this.params)
            }
        }
    };
</script>

<style scoped lang="scss">
.modal-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    transition: opacity 400ms;
    z-index: 1000;
    .modal-content {
        position: absolute;
        width: 16rem;
        height: 10rem;
        background-color: #fff;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 0.2rem;
        box-shadow: 0 10px 12px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }
    .modal-header{
        padding: 0.5rem;
        font-size: 0.7rem;
        color: #333;
        border-bottom: solid 1px #E6E6E6;
        background-color: #F8F8F8;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .close {
            font-size: 1rem;
            color: #999;
            position: relative;
            top: -0.1rem;
        }
    }

    .modal-form {
        margin: 1rem;
    }

    .input {
        /*border: solid 1px red;*/
        flex: 1;
        text-align: left;
        border: 1px solid #e6e6e6;
        outline: none;
        font-size: 0.7rem;
        width: 13rem;
        height: 2rem;
        line-height: 2rem;
        /*height: 100%;*/
        color: #333333;
        padding-left: 0.5rem;
        -webkit-appearance: none;

        input[type='text'] {
            border: none;
            outline: none;
            font-size: 0.6rem;
            width: 100%;
            /*height: 1.5rem;*/
            height: 100%;
            color: #333333;
            padding-left: 0.5rem;
            text-align: right;

            &::-webkit-input-placeholder {
                color: #C7C5C0;
            }
        }
    }

    .modal-footer {
        text-align: center;
    }

    .charge-btn {
        width: 4rem;
        height: 2rem;
        border: none;
        outline: none;
        background-color: $theme-color;
        font-size: 0.9rem;
        border-radius: 0.2rem;
        color: #fff;

        &:disabled {
            opacity: 0.6;
        }
    }
}
</style>
