<template lang="pug">
    a-col(:span="9", class="form")
        div(class="header")
            h1 {{ $t('login.title') }}
        a-alert(type="error", showIcon, v-if="error", :message="error")
        a-form(:form="form", @submit.prevent="handleSubmit")
            a-form-item
                a-input(type="text", v-decorator="formRules.email", size="large", :placeholder="$t('login.email')")
                    a-icon(slot="prefix", type="user")
            a-form-item
                a-input(type="password", v-decorator="formRules.password", size="large", :placeholder="$t('login.password')")
                    a-icon(slot="prefix", type="lock")
            a-form-item
                a-button(type="primary", size="large", html-type="submit", block) {{ $t('login.login') }}
            div(class="links")
                p {{ $t('login.noAccount') }}? <nuxt-link to="/register">{{ $t('login.register') }}</nuxt-link>!
                p {{ $t('login.forgottenPassword') }}? <nuxt-link to="/reset-password">{{ $t('login.click') }}</nuxt-link>!
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Meta } from '@/utils/custom-decorators';
import { getErrors } from "@/utils/helpers";

@Component({
    layout: 'auth'
})
export default class Login extends Vue {
    form: any;
    error: string = '';
    formRules = {
        email: [
            'email',
            {
                rules: [
                    { required: true, message: 'Please input your e-mail.' },
                    { type: 'email', message: 'Please enter valid e-mail address.' }
                ]
            }
        ],
        password: [
            'password',
            {
                rules: [
                    { required: true, message: 'Please input your password!' }
                ]
            }
        ]
    };

    beforeCreate() {
        this.form = this.$form.createForm(this);
    }

    @Meta
    head() {
        return {
            title: this.$i18n.t('login.title')
        };
    }

    async handleSubmit(): Promise<any> {
        this.error = '';
        this.form.validateFields(async (err, values) => {
            if (!err) {
                try {
                    await this.$auth.loginWith('localGraphQL', {
                        email: values.email,
                        password: values.password
                    });
                    await this.$message.success(this.$i18n.t('notifications.login'));
                } catch (error) {
                    this.error = getErrors(error);
                    this.form.resetFields();
                }
            }
        });
    }
}
</script>

<style lang="sass" scoped>
    .header
        border-bottom: 1px solid $light-border
        padding-bottom: $form-padding
        margin-bottom: $form-padding
        h1
            color: $light-border
            padding: 0
            margin: 0
    .ant-alert
        margin-top: $form-padding
        margin-bottom: $form-padding
    .links
        margin-top: $form-padding
</style>
