<template>
    <table>
        <tr-component v-for="(rowData, index) in tableData" :row-index="index" :key="index"></tr-component>
    </table>
</template>

<script>
import TrComponent from './TrComponent.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const tableData = store.state.tableData;

        return { tableData };
    },
    components: {
        TrComponent
    },
}
</script>

<style>
    
</style>