<template>
    <form class="form_container" @submit.prevent="submitForm">
        <div class="form_group">
            <label class="placeholder">Имя:</label>
            <input
                id="username"
                v-model="formValues.username"
                @focus="handleFocus('username')"
                :class="{
                    _focused: focusedField === 'username',
                    _with_error: formSubmitted && errors.username && errors.username.length > 0,
                }"
            />
            <div
                class="error_message_container"
                v-if="formSubmitted && errors.username && errors.username.length"
            >
                <span class="error_message" v-for="(err, i) in errors.username" :key="i">{{
                    err
                }}</span>
            </div>
        </div>
        <div class="form_group">
            <label class="placeholder">Email:</label>
            <input
                id="email"
                v-model="formValues.email"
                @focus="handleFocus('email')"
                :class="{
                    _focused: focusedField === 'email',
                    _with_error: formSubmitted && errors.email && errors.email.length > 0,
                }"
            />
            <div
                class="error_message_container"
                v-if="formSubmitted && errors.email && errors.email.length"
            >
                <span class="error_message" v-for="(err, i) in errors.email" :key="i">{{
                    err
                }}</span>
            </div>
        </div>
        <Button @click="submitForm">Отправить</Button>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFormValidation } from "../composables/useFormValidation.ts";
import Button from "./ui/Button.vue";

const initialValues = {
    username: "",
    email: "",
};

const rules = {
    username: [
        {
            validate: (value: string) => value.trim().length > 0,
            message: "Имя обязательно",
        },
        {
            validate: (value: string) => value.length >= 3,
            message: "Имя должно содержать не менее 3 символов",
        },
    ],
    email: [
        {
            validate: (value: string) => value.trim().length > 0,
            message: "Email обязателен",
        },
        {
            validate: (value: string) => /\S+@\S+\.\S+/.test(value),
            message: "Некорректный email",
        },
    ],
};

const { formValues, errors, validateField, validateForm, isValid } = useFormValidation(
    initialValues,
    rules,
);

const focusedField = ref<string | null>(null);
const formSubmitted = ref(false);

const handleFocus = (fieldName: string) => {
    focusedField.value = fieldName;
};

const submitForm = () => {
    formSubmitted.value = true;

    validateField("username");
    validateField("email");

    validateForm();

    if (isValid.value) {
        console.log("Форма валидна, отправляем данные:", formValues);
    } else {
        console.log("Обнаружены ошибки валидации");
    }
};
</script>

<style lang="scss">
.form_container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 25px;
}

.form_group {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.placeholder {
    font-size: 16px;
    font-weight: 500;
    color: $primary_dark;
}

input {
    width: 400px;
    height: 50px;
    cursor: text;
    padding: 12px;
    overflow: hidden;
    transition: 0.2s;
    border-radius: 16px;
    background: $secondary_white;
    border: 2px solid transparent;

    font-size: 16px;
    font-weight: 500;
    color: $primary_dark;

    &:hover {
        background: $third_white;
    }

    &._focused {
        background: $secondary_white;
        border: 2px solid $primary_dark;
    }

    &._with_error {
        background: $third_red;
        border: 2px solid $primary_red;
    }
}

.error_message_container {
    width: 100%;
    margin-top: 5px;
}

.error_message {
    font-size: 16px;
    font-weight: 400;
    color: $primary_red;
}
</style>
