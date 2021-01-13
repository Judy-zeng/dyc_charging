<template>
    <div class="middle-page-container">
        <div v-html="contentHtml"></div>
    </div>
</template>

<script>
    export default {
        name: 'MiddlePage',
        components: {},
        filters: {},
        props: {},
        data() {
            return {
                contentHtml: ''
            };
        },
        computed: {},
        watch: {},
        created() {
            let content = sessionStorage.getItem('BLANK_PAGE_CONTENT')
            if (content) {
               this.contentHtml = content
            }
        },
        destroyed() {
            sessionStorage.setItem('BLANK_PAGE_CONTENT', '')
        },
        mounted() {
        },
        methods: {}
    };
</script>

<style scoped lang="scss">
</style>
