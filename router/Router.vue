<template>
    <div>
        <div>
            <router-link to="/rock-scissors-paper">rock</router-link>
            <router-link to="/lotto">lotto</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>

export default {
    name: 'Router',
}
</script>
<style>

</style>