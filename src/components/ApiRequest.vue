<template>
    <div class="api_request_container">
        <Button @click="fetchData">Получить данные</Button>
        <p class="message_text" v-if="loading">Загрузка...</p>
        <p class="error_message_text" v-else-if="error">Ошибка: {{ error }}</p>
        <div v-else-if="success">
            <pre class="data_text">{{ data }}</pre>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useApi } from "../composables/useApi.ts";

import Button from "./ui/Button.vue";

const { data, loading, error, success, request } = useApi();

const fetchData = () => {
    request({ url: "https://jsonplaceholder.typicode.com/posts", method: "GET" });
};
</script>

<style lang="scss">
.api_request_container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
}

.message_text {
    font-size: 22px;
    font-weight: 400;
    color: $primary_dark;
}

.error_message_text {
    font-size: 22px;
    font-weight: 400;
    color: $primary_red;
}

.data_text {
    width: 100%;
    padding: 16px;
    border-radius: 12px;
    background-color: $secondary_dark;

    font-size: 14px;
    font-weight: 400;
    color: $third_white;
    white-space: pre-wrap;
}
</style>
