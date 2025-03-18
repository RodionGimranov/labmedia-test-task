import { ref } from "vue";

interface RequestOptions {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    body?: any;
    queryParams?: Record<string, string | number>;
}

export function useApi<T = any>() {
    const data = ref<T | null>(null);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);
    const success = ref<boolean>(false);

    const request = async (options: RequestOptions) => {
        loading.value = true;
        error.value = null;
        success.value = false;

        try {
            let url = options.url;
            if (options.queryParams) {
                const queryString = new URLSearchParams(
                    options.queryParams as Record<string, string>,
                ).toString();
                url += `?${queryString}`;
            }

            const fetchOptions: RequestInit = {
                method: options.method || "GET",
                headers: options.headers ? ({ ...options.headers } as HeadersInit) : {},
            };

            if (options.body && options.method !== "GET") {
                fetchOptions.body = JSON.stringify(options.body);
                (fetchOptions.headers as Record<string, string>)["Content-Type"] =
                    "application/json";
            }

            const response = await fetch(url, fetchOptions);

            if (!response.ok) {
                throw new Error(`Ошибка запроса: ${response.statusText}`);
            }

            data.value = (await response.json()) as T;
            success.value = true;
        } catch (err: any) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    return { data, loading, error, success, request };
}
