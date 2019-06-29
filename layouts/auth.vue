<template lang="pug">
    a-layout
        a-layout-content
            a-row(type="flex", justify="center", align="middle", class="row")
                nuxt
</template>

<style lang="sass" scoped>
    .ant-layout, .ant-layout-content
        height: 100%
        background: $light-background
    .row
        height: 100vh
    .form
        background: white
        text-align: center
        padding: $form-padding
        border: 1px solid $light-border
        -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.10)
        -moz-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.10)
        box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.10)
</style>
