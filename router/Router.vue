<template>
    <div>
        <div>
            <router-link to="/rock-scissors-paper"></router-link>
            <router-link to="/lotto"></router-link>
        </div>
        <router-view>qq</router-view>
    </div>
</template>
<script>
import Vue from 'vue';
import router from './routes.js';

export default {
    router
}
</script>
<style>

</style>