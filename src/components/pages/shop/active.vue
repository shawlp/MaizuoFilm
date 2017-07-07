<template>
    <div class="act-active">
        <div v-html="active.content">
            
        </div>
    </div>
</template>

<script>
    import '../../../assets/active.css'
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {

            }
        },
        computed:mapGetters({
            active: 'getActive'
        }),
        created() {
            let id = this.$route.params.id;
            this.$store.dispatch('changeTitle', "卖座商城");
            this.$store.dispatch('getActive', id );            
        }
    }
</script>
