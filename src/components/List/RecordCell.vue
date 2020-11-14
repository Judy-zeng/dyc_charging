<template>
    <div class="record-cell">
        <div class="cell-title">{{item.title}}</div>
        <div class="cell-content">
            <div class="record-cell-hd">
                <p class="cell-time">{{item.created_at}}</p>
                <p class="cell-type">{{item.type}}</p>
            </div>
            <div class="record-cell-ft" :class="recordCls">
                <span>{{item.money}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RecordCell',
        components: {},
        filters: {},
        props: {
            item: {
                type: Object,
                default: () => {
                }
            }
        },
        data() {
            return {};
        },
        computed: {
            recordCls() {
                const status = {1: 'reback', 2: 'consume', 3: 'charge'}
                return this.item && (status[this.item.status] || '')
            }
        },
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {}
    };
</script>

<style scoped lang="scss">
    .record-cell {
        padding: 0.6rem;
        box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.07);

        .cell-title {
            font-size: 0.8rem;
            color: $text-primary-color;
            margin: 0.4rem 0;
        }

        .cell-content {
            display: flex;
            justify-content: space-between;
            /*align-items: center;*/

            .record-cell-hd {
                .cell-time, .cell-type {
                    font-size: 0.6rem;
                    color: #8F8F8F;
                }
            }

            .record-cell-ft {
                font-size: 0.9rem;

                &.reback {
                    color: #6EC0FF;
                }

                &.consume {
                    color: #FFA200;
                }

                &.charge {
                    color: #27BD45;
                }
            }
        }
    }
</style>
