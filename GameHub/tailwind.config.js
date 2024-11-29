/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                gray: {
                    900: '#111827',
                    800: '#1f2937',
                    700: '#374151',
                    600: '#4b5563',
                    500: '#6b7280',
                    400: '#9ca3af',
                    300: '#d1d5db',
                    200: '#e5e7eb',
                    100: '#f3f4f6',
                },
                purple: {
                    500: '#8b5cf6',
                    400: '#a78bfa',
                },
            },
        },
    },
    plugins: [],
};