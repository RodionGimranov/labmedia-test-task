<template>
    <button class="custom_btn" @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
defineProps();

defineEmits(["click"]);
</script>

<style lang="scss">
.custom_btn {
    transition: 0.2s;
    padding: 10px 16px;
    border-radius: 16px;
    background: $primary_dark;

    font-size: 16px;
    font-weight: 500;
    color: $primary_white;

    &:hover {
        background: $secondary_dark;
    }
}
</style>
