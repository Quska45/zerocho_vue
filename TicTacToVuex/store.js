import { createStore } from 'vuex';

// 이런식으로 변수로 미리 만들어 놓고 함수선언에 사용할 수도 있다.
// 오브젝트 다이나믹 프로퍼티. 동적속성
// import 시에 중괄호로 묵어서 가져와야한다
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

// 이렇게 4개가 핵심이다.
// export default 는 import 해서 쓸때 이름을 지정해서 막 쓸 수 있따.
export default createStore({
    state: {
        tableData: [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ],
        turn: 'O',
        winner: ''
    }, // vue data와 비슷
    getters: {
        turnMessage( state ){
            return state.turn;
        }
    }, // vue computed와 비슷
    mutations: {
        [SET_WINNER]( state, winner ){
            state.winner = winner;
        },
        [CLICK_CELL]( state, { row, cell } ){
            state.tableData[row][cell] = state.turn;
        },
        [CHANGE_TURN]( state ){
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },
        [RESET_GAME]( state ){
            state.turn = 'O';
            state.tableData = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];
        },
        [NO_WINNER]( state ){
            state.winner = '';
        }
    }, // state를 수정할 때 사용함. 동기적으로
    actions: {

    } // 비동기를 사용할 때, 또는 여러 뮤테이션을 연달아 실행할 때
});