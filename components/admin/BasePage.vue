<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { Meta } from '@/utils/custom-decorators';

    @Component({
        layout: 'admin',
        roles: ['superAdmin']
    })
    export default class BasePage extends Vue {
        @Meta
        head() {
            return {
                title: 'Admin'
            };
        }
    }
</script>
