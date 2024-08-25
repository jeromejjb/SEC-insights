<template>
  <div id="app">
    <router-view></router-view>
    <SurveyComponent></SurveyComponent>
  </div>
</template>

<script>
import SurveyComponent from './components/SurveyComponent.vue';
export default {
  components: { SurveyComponent },
  name: 'App',
};
</script>

<style>
/* Your global styles here */
</style>
