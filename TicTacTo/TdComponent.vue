<template>
    <td @click="onClickTd">
        {{cellData}}
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
                    console.log(1)
                }
            });

            return acc;
        }, true);

        return isFull;
    };
};

export default {
    props: {
        cellData: String,
        rowIndex: Number,
        cellIndex: Number
    },
    methods: {
        onClickTd(){
            let self = this;
            const rootData = this.$root.$data;
            this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn;

            const tableData =  this.$root.$data.tableData;
            const rowLength = tableData.length;
            const cellLength = tableData[0].length;
            let row = null;
            let column = null;
            let diagonals = []; // 대각선

            let columnData = this.$root.$data.tableData.reduce((acc, cur) => {
                acc.push( cur[self.cellIndex] );
                return acc;
            }, []);
            let diagonalData = Line.makeDiagonalData( this.cellIndex, this.rowIndex, tableData );

            row = new Line( this.$root.$data.tableData[this.rowIndex] );
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
                rootData.winner = rootData.turn;
                rootData.turn = 'O';
                rootData.tableData = [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', '']
                ];
                return;
            };

            if( isFull ){
                rootData.winner = '';
                rootData.turn = 'O';
                rootData.tableData = [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', '']
                ];
                return;
            };

            this.$root.$data.turn = this.$root.$data.turn === 'O' ? 'X' : 'O';
        },
    },
};


</script>