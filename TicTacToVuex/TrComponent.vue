<template>
    <tr>
        <td-component v-for="(cellData, index) in state.rowData" :cell-index="index" :row-index="rowIndex" :key="index"></td-component>
    </tr>
</template>

<script>
import TdComponent from './TdComponent.vue';
import { computed, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';

export default {
    components: {
        TdComponent
    },
    props: {
        rowIndex: Number
    },
    setup( props ) {
        const store = useStore();
        const state = reactive({
            rowData: store.state.tableData[props.rowIndex]
        });

        return { state };

    },
}
</script>