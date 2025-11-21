import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
    content: [
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/sanity/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)'],
                serif: ['var(--font-lora)'],
                'roboto-condensed': ['var(--font-roboto-condensed)'],
                'oswald': ['var(--font-oswald)'],
            },
        },
    },
    plugins: [typography],
} satisfies Config;