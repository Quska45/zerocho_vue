<template>
    <div>
        <div id="screen" v-bind:class="state" @click="onClickScreen">{{message}}</div>
        <div v-show="result.length">
            <div>평균 시간 : {{average}}ms</div>
            <button @click="onReset">리셋</button>
        </div>
    </div>
</template>
<script>
let startTime = 0;
let endTime = 0;
let timeout = null;
export default {
    // 비동기 코드에 대해서 연습하기 위해서 해본다.
    data(){
        return {
            result: [],
            state: 'waiting', // screen의 상태
            message: '클릭해서 시작하세요.'
        }
    },
    computed: {
        // computed를 쓰는건 캐싱이 되기 때문이다.
        average() {
            return this.result.reduce((a,c)=>a+c, 0) / this.result.length || 0
        }
    },
    methods: {
        onReset() {
            this.result = [];
        },
        onClickScreen() {
            if( this.state === 'waiting' ){
                this.state = 'ready';
                this.message = '초록색이 되면 클릭하세요.';
                timeout = setTimeout(() => {
                    this.state = 'now';
                    this.message = '지금 클릭!'
                    startTime = new Date();
                }, Math.floor(Math.random() * 1000) + 2000); // 2-3초
            } else if( this.state == 'ready' ){
                clearTimeout(timeout);
                this.state = 'waiting';
                this.message = '초록색이 된후에 클릭하세요.'
            }else if( this.state === 'now' ){
                endTime = new Date();
                this.state = 'waiting'
                this.message = '클릭해서 시작하세요.';
                this.result.push(endTime - startTime);
                
            }
        }
    }
}
</script>
<style scoped>
    /* scoped를 붙이면 여기서만 적용받음. 개발자 도구를 열어 보면 뒤에 랜덤한 값이 붙어서 생성됨 */
    #screen {
        width: 300px;
        height: 200px;
        text-align: center;
        user-select: none;
    }
    #screen.waiting {
        background-color: aqua;
    }
    #screen.ready {
        background-color: red;
        color: white;
    }
    #screen.now {
        background-color: greenyellow;
    }
</style>