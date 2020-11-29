<template>
    <div class="list-cell">
        <div class="list-cell-hd">{{label}}</div>
        <div class="list-cell-ft">{{value}}</div>
    </div>
</template>

<script>
    export default {
        name: 'ListViewCell',
        components: {},
        filters: {},
        props: {
            label: String,
            value: [String, Number]
        },
        data() {
            return {};
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

<style scoped lang="scss">
.list-cell {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.8rem;
    .list-cell-hd {
        font-size: 0.7rem;
        color: $text-primary-color;
        font-weight: 400;
    }
    .list-cell-ft {
        flex: 1;
        text-align: right;
        font-size: 0.7rem;
        color: $text-primary-color;
        font-weight: 400;
    }
}
</style>
