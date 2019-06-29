<template lang="pug">
    a-col(:span="6", class="switcher")
        nuxt-link(v-for="locale in availableLocales", :key="locale.code", :to="switchLocalePath(locale.code)") {{ locale.name }}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class LanguageSwitcher extends Vue {
    get availableLocales() {
        return this.$i18n.locales.filter((i: any) => i.code !== this.$i18n.locale);
    }
}
</script>
