export default {
    BACKEND_HOST: import.meta.env.VITE_SERVER_HOST
        ? import.meta.env.VITE_SERVER_HOST
        : "http://localhost:3001",
};
