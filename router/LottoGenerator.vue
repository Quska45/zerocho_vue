<template>
    <div>
        <div>당첨 숫자</div>
        <div id="결과창">
            <lotto-ball v-for="ball in winBalls" :key="ball" :number="ball"></lotto-ball>
        </div>
        <div>보너스</div>
        <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
        <button v-if="redo" @click="onClickRedo">한번더!</button>
    </div>
</template>
<script>
import LottoBall from './LottoBall.vue';

function getWinNumbers(){
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const timeouts = [];

export default {
    components: {
        LottoBall
    },
    // 비동기 코드에 대해서 연습하기 위해서 해본다.
    data(){
        return {
            winNumbers: getWinNumbers(),
            bonus: null,
            winBalls: [],
            redo: false
        }
    },
    computed: {
        
    },
    methods: {
        onClickRedo(){
            this.winNumbers = getWinNumbers();
            this.winBalls = [];
            this.bonus = null;
            this.redo = false;
            this.showBalls();
        },
        showBalls(){
            for(let i=0; i< this.winNumbers.length-1; i++){
                timeouts[i] = setTimeout(() => {
                    this.winBalls.push(this.winNumbers[i]);
                    console.log(this.winNumbers[i]);
                }, (i+1) * 1000);
            };
            timeouts[6] = setTimeout(()=>{
                this.bonus = this.winNumbers[6];
                this.redo = true;
            }, 7000)
        }
    },
    created(){
        console.log('created');
    },
    beforeMount() {
        console.log('beforMount');
    },
    mounted(){
        this.showBalls();
        console.log('mounted');
    },
    updated(){
        console.log('updated');
    },
    beforeDestroy() {
        timeouts.forEach((t)=>{
            clearTimeout(t);
        })
    },
    destroyed() {
        console.log('destroyed');
    },
}
</script>
<style scoped>
    /* scoped를 붙이면 여기서만 적용받음. 개발자 도구를 열어 보면 뒤에 랜덤한 값이 붙어서 생성됨 */
    #computer {
        width: 142px;
        height: 200px;
        text-align: center;
        user-select: none;
    }
</style>