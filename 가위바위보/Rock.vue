<template>
    <div>
        <div id="computer" :style="computedStyleObject"></div>
        <div>
            <button @click="onClickButton('바위')">바위</button>
            <button @click="onClickButton('가위')">가위</button>
            <button @click="onClickButton('보')">보</button>
        </div>
        <div>{{result}}</div>
        <div>현재 : {{score}}점</div>
        
    </div>
</template>
<script>
const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
};
let interval = null;
const scores = {
    바위: 0,
    가위: 1,
    보: -1
}
let computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v){
        return v[1] === imgCoord;
    })[0]
}
export default {
    // 비동기 코드에 대해서 연습하기 위해서 해본다.
    data(){
        return {
            result: '',
            score: '',
            imgCoord: rspCoords.바위
        }
    },
    computed: {
        computedStyleObject(){
            return {
                background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`
            }
        }
    },
    methods: {
        onClickButton( choice ) {
            clearInterval(interval);
            const myScore = scores[choice];
            const cpuScore = scores[computerChoice(this.imgCoord)];
            const diff = myScore - cpuScore;
            if( diff === 0 ){
                this.result = "비겼습니다.";
            } else if([-1, 2].includes(diff)){
                this.result = "이겼습니다.";
                this.score += 1;
            } else {
                this.result = '졌습니다.';
                this.score -= 1;
            };
            setTimeout(() => {
                this.changeHand();
            });
        },
        changeHand(){
            interval = setInterval(() => {
            if (this.imgCoord === rspCoords.바위){
                this.imgCoord = rspCoords.가위;
            } else if( this.imgCoord === rspCoords.가위 ){
                this.imgCoord = rspCoords.보;
            } else if( this.imgCoord === rspCoords.보 ){
                this.imgCoord = rspCoords.바위;
            }
        }, 100);
        }
    },
    created(){
        console.log('created');
    },
    beforeMount() {
        console.log('beforMount');
    },
    mounted(){
        this.changeHand();
        
        console.log('mounted');
    },
    updated(){
        console.log('updated');
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