<template>
    <div>
        <h1>{{result.strike}} 스트라이크 <br> {{result.ball}} 볼</h1>
        <form @submit.prevent="onSubmit">
            <input type="text" ref="answer" maxlength="10" v-model="value">
            <button type="submit">입력</button>
        </form>
        <div>시도 : {{tryObj.cur}}</div>
        <ul>
            <li v-for="t in tries" v-bind:key="t">{{t}}</li>
            
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            tryObj: {
                // 최대 시도 횟수
                max: 5,
                // 현재 시도한 횟수
                cur: 0
            },
            value: '',
            result: {
                // 스트라이크 수
                strike: 0,
                // 볼 수
                ball: 0,
                // 정답
                value: [ 0,7,6 ],
                
            }
        }
    },
    methods: {
        onSubmit(e){
            this.$refs.answer.focus();
            if( this.tryObj.cur >= 5 ){
                this.result.msg = '5번까지만 시도 할 수 있습니다.';
                return;
            }

            this.tryObj.cur++;

            var valueArr = this.value.split(',');
            this.result.strike = 0;
            this.result.ball = 0;

            valueArr.forEach(( cur, i ) => {
                if( cur == this.result.value[i] ){
                    this.result.strike++;
                } else {
                    this.result.ball++;
                }
            });
            
        }
    },
}

</script>
<style>
    
</style>