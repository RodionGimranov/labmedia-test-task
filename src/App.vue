<template>
    <h1 class="main_page_title">Demo Labmedia Test Task</h1>
    <section class="form_validation">
        <h2 class="section_title">1. Валидация формы</h2>
        <FormValidation />
    </section>
    <section class="api_request">
        <h2 class="section_title">2. API-запрос</h2>
        <ApiRequest />
    </section>
</template>

<script setup lang="ts">
import FormValidation from "./components/FormValidation.vue";
import ApiRequest from "./components/ApiRequest.vue";
</script>

<style lang="scss">
body {
    width: 100vw;
    min-width: 320px;
    padding: 50px;
    overflow-x: hidden;
    overflow-y: scroll;
    background: $primary_white;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    line-height: 24px;
    color: $primary_dark;
}

.main_page_title {
    text-align: center;
    margin-bottom: 50px;
    font-weight: 600;
}

.form_validation,
.api_request {
    width: 800px;
    padding: 16px;
    overflow: hidden;
    border-radius: 24px;
    margin-bottom: 100px;
    border: 2px solid $secondary_white;
}

.section_title {
    margin-bottom: 20px;
    font-weight: 500;
}
</style>
