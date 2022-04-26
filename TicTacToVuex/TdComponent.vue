<template>
    <td @click="onClickTd">
        {{state.cellData}}
    </td>
</template>

<script>
class Line {
    constructor( data ){
        this.data = data;
    };

    static makeDiagonalData( columnIndex, rowIndex, tableData ){
        let result = [];
        let length = tableData.length;
        let centerPosition = Math.floor( length / 2 );
        let diagonalOne = Array(length).fill().reduce(( acc, cur, i ) => {
            acc.push( tableData[i][i] );
            return acc;
        }, []);
        let diagonalTwo = Array(length).fill().reduce(( acc, cur, i ) => {
            acc.push( tableData[length-i-1][i] );
            return acc;
        }, []);

        if( columnIndex == rowIndex ){
            result.push( diagonalOne );
        }
        else if( columnIndex + rowIndex == length-1 ){
            result.push( diagonalTwo );
        };

        if( centerPosition == columnIndex && centerPosition == rowIndex ){
            result.push( diagonalTwo );
        };

        return result;
    };

    getIsBingo(){
        if( !this.data ){
            return false;
        };

        const oFlag = 'O';
        const xFlag = 'x';
        let isBingo = true;
        let bingoFlag = this.data[0];

        isBingo = this.data.reduce((acc, cur)=>{
            if( cur != bingoFlag ){
                acc = false;
            }
            return acc;
        }, isBingo);

        return isBingo;
    };
};

class Bingo {
    constructor( tableData ){
        this.tableData = tableData;
    };

    getIsFull(){
        //debugger
        let isFull = this.tableData.reduce(( acc, cur ) => {
            cur.forEach(( item ) => {
                if( item == '' ){
                    acc = false;
                }
            });

            return acc;
        }, true);

        return isFull;
    };
};
import { computed, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
import { CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER } from './store.js';

export default {
    props: {
        //cellData: String,
        rowIndex: Number,
        cellIndex: Number
    },
    setup( props ) {
        const store = useStore();

        const state = reactive({
            tableData: computed(() => store.state.tableData),
            cellData: computed(() => store.state.tableData[props.rowIndex][props.cellIndex]),
            turn: computed(() => store.state.turn)
        })

        const onClickTd = () => {
            let self = this;
            //const rootData = this.$root.$data;
            //this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn;
            store.commit( CLICK_CELL, { row: props.rowIndex, cell: props.cellIndex } );

            const tableData =  state.tableData;
            const rowLength = tableData.length;
            const cellLength = tableData[0].length;
            let row = null;
            let column = null;
            let diagonals = []; // 대각선

            let columnData = tableData.reduce((acc, cur) => {
                acc.push( cur[props.cellIndex] );
                return acc;
            }, []);
            let diagonalData = Line.makeDiagonalData( state.cellIndex, state.rowIndex, tableData );

            row = new Line( state.tableData[props.rowIndex] );
            column = new Line( columnData );
            diagonals = diagonalData.length > 0 ? diagonalData.reduce((acc, cur) => {acc.push(new Line( cur )); return acc;}, []) : [];
            
            let bingo = new Bingo( tableData );
            let lines = [];
            lines.push( row );
            lines.push( column );
            lines.push( ...diagonals );

            let bingoCount = lines.reduce(( acc, cur )=>{
                cur.getIsBingo() ? acc = acc + 1 : null;
                return acc;
            }, 0);
            
            let isFull = bingo.getIsFull();
            if( bingoCount >= 1 ){
                store.commit( SET_WINNER, state.turn );
                store.commit( RESET_GAME );
                return;
            };

            if( isFull ){
                store.commit( NO_WINNER );
                store.commit( RESET_GAME );
                return;
            };

            store.commit( CHANGE_TURN );
        }

        return { state, onClickTd };
    },
};


</script>