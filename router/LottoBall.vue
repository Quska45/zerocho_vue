<template>
    <div class="ball" :style="styleObject">
        {{number}}
    </div>
</template>
<script>
export default {
    name: 'LottoBall',
    // props로 받은 값을 바꾸는 짓을 안하는게 좋다.
    props: {
        number: Number,
    },
    
    computed: {
        styleObject(){
            let background;
            if( this.number < 10 ){
                background= "red";

            } else {
                background = 'orange'
            }
            return {
                background,
            }
        }
    },
    methods: {
        
    },
    beforeMount() {
        console.log('beforMount');
    },
    mounted(){   
        console.log('mounted');
    },
    watch(){
        console.log('updated');
    },
    beforeDestroy() {
        
    },
}
</script>
<style scoped>
    /* scoped를 붙이면 여기서만 적용받음. 개발자 도구를 열어 보면 뒤에 랜덤한 값이 붙어서 생성됨 */
    .ball {
        display: inline-block;
        border: 1px solid black;
        border-radius: 20px;
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 20px;
    }
</style>