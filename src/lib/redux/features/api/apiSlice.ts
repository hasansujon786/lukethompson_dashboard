import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APP_CONFIG } from "@/constants";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: APP_CONFIG.apiUrl,
        prepareHeaders: (headers) => {
            if (typeof window !== "undefined") {
                const cookies = document.cookie.split(";");
                const tokenCookie = cookies.find((cookie) =>
                    cookie.trim().startsWith("accessToken="),
                );
                if (tokenCookie) {
                    const token = tokenCookie.split("=")[1];
                    headers.set("authorization", `Bearer ${token}`);
                }
            }
            return headers;
        },
    }),
    tagTypes: [
        "Auth",
        "Dashboard",
        "Users",
        "Reviews",
        "Settings",
        "Subscription",
    ],
    endpoints: () => ({}),
});

export default api;
