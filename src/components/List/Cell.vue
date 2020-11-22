<template>
    <div class="page-cell" :class="{
      'cell-active': isLink || !!link,
      'cell-access': isLink || !!link,
      'cell-no-border-intent': !borderIntent,
      'cell-disabled': disabled
    }" @click="handleClick">
        <div class="page-cell-hd">
            <slot name="icon"></slot>
        </div>

        <div class="page-cell-bd" :class="{'cell-primary': primary === 'title' && valueAlign !== 'left'}">
            <p>
                <label class="cell-label" v-if="title">
                    <slot name="title">{{ title }}</slot>
                </label>
                <slot name="after-title"></slot>
            </p>
        </div>

        <div class="page-cell-ft" :class="valueClass">
            <slot name="value"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Cell',
        components: {},
        filters: {},
        props: {
            title: [String, Number],
            value: [String, Number, Array],
            isLink: Boolean,
            isLoading: Boolean,
            inlineDesc: [String, Number],
            primary: {
                type: String,
                default: 'title'
            },
            link: [String, Object],
            valueAlign: [String, Boolean, Number],
            borderIntent: {
                type: Boolean,
                default: true
            },
            disabled: Boolean,
            arrowDirection: String, // down or up
            alignItems: String
        },
        data() {
            return {};
        },
        computed: {
            valueClass () {
                return {
                    'cell-primary': this.primary === 'content' || this.valueAlign === 'left',
                    'cell-align-left': this.valueAlign === 'left',
                    'cell-arrow-transition': !!this.arrowDirection,
                    'cell-arrow-up': this.arrowDirection === 'up',
                    'cell-arrow-down': this.arrowDirection === 'down'
                }
            },
        },
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {
            handleClick () {
                if (this.link && !this.disabled) {
                    this.$router.push(this.link)
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .page-cell {
        padding: 0.5rem 0;
        position: relative;
        display: flex;
        align-items: center;
        &.cell-access {
            .page-cell-ft:after {
                content: " ";
                display: inline-block;
                height: 0.3rem;
                width: 0.3rem;
                border-width: 2px 2px 0 0;
                border-color: #5c5c5c;
                border-style: solid;
                -webkit-transform: matrix(.71,.71,-.71,.71,0,0);
                transform: matrix(.71,.71,-.71,.71,0,0);
                position: absolute;
                top: 50%;
                margin-top: -4px;
                right: 2px;
            }
        }
        .page-cell-hd {
            width: 1.5rem;
            margin-right: 0.8rem;
            img {
                width: 100%;
            }
        }
        .page-cell-bd {
            position: relative;
            top: -0.1rem;
            flex: 1;
            &.cell_primary{
                align-items: flex-start;
            }
            .cell-label {
                display: inline-block;
                word-wrap: break-word;
                word-break: break-all;
                color: $text-primary-color;
                font-size: 0.8rem;
                font-weight: normal;
            }
        }
        .page-cell-ft {
            text-align: right;
            color: $text-primary-color;
            font-size: 0.8rem;
            font-weight: normal;
        }
    }
</style>
