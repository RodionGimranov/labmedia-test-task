import { reactive, ref, computed } from "vue";

interface Rule {
    validate: (value: any) => boolean;
    message: string;
}

interface FieldRules {
    [field: string]: Rule[];
}

interface FormFields {
    [field: string]: any;
}

export function useFormValidation(initialValues: FormFields, rules: FieldRules) {
    const formValues = reactive({ ...initialValues });
    const errors = reactive<{ [field: string]: string[] }>({});
    const formSubmitted = ref(false);

    const validateField = (field: string) => {
        errors[field] = [];

        if (rules[field]) {
            const requiredRule = rules[field].find(
                (rule) => rule.message === "Имя обязательно" || rule.message === "Email обязателен",
            );
            if (formValues[field] === "") {
                if (requiredRule) {
                    errors[field].push(requiredRule.message);
                }
                return;
            }

            rules[field].forEach((rule) => {
                if (!rule.validate(formValues[field])) {
                    errors[field].push(rule.message);
                }
            });
        }
    };

    const validateForm = () => {
        formSubmitted.value = true;
        Object.keys(formValues).forEach((field) => {
            validateField(field);
        });
    };

    const isValid = computed(() => {
        return Object.keys(errors).every((field) => errors[field].length === 0);
    });

    return {
        formValues,
        errors,
        validateField,
        validateForm,
        isValid,
    };
}
