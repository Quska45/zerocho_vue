<template>
    <div>
        <div v-if="winner">{{winner}}님의 승리!.</div>
        <table-component></table-component>
        <div>{{turn}}님의 턴입니다.</div>
    </div>
    
</template>
<script>
import { computed } from 'vue';
import { useStore, mapState } from 'vuex';
import TableComponent from './TableComponent.vue';

export default {
    setup(){
        const store = useStore();
        const turn = computed( () => store.state.turn );
        const winner = computed( () => store.state.winner );

        return { turn, winner }
    },
    components: {
        TableComponent
    },
    methods: {
        onChangeData(){
            //this.tableData[1][0] = 'X'; 작동하지 않음
            // 배열에서 인덱스를 쓸 때 원래는 이렇게 했어야 하는거 같은데 이제 이렇게 안해도 그냥 됨
            // 아래 두개 다 가능한 코드임
            //Vue.set(this.tableData[1], 0, 'X');
            //this.$set(this.tableData[1], 0, 'X');
        }
    }
}
</script>
<style>
    table {
        border-collapse: collapse;
    }
    td {
        border: 1px solid black;
        width: 60px;
        height: 60px;
        text-align: center;
    }
</style>