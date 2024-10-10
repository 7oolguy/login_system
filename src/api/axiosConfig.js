import axios from 'axios';

// Cria uma instância do Axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/', // URL base do seu backend
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Necessário se estiver usando cookies HTTP-Only
});

// Interceptador de requisição para adicionar o token de acesso
axiosInstance.interceptors.request.use((config) => {
    const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('CROSS-TOKEN='))
        ?.split('=')[1];

    if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken; // Send CSRF token in headers
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Variáveis para gerenciar a renovação do token
let isRefreshing = false;
let failedQueue = [];

// Função para processar a fila de requisições que falharam devido a 401
const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

// Interceptador de resposta para lidar com erros 401 (Unauthorized)
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                .then(token => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return axiosInstance(originalRequest);
                })
                .catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refreshToken');

            if (!refreshToken) {
                // Se não houver refresh token, redireciona para login
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                const response = await axiosInstance.post('/auth/refresh-token', {
                    refreshToken: refreshToken,
                });

                if (response.status === 200) {
                    const { token, refreshToken: newRefreshToken } = response.data;

                    // Atualiza os tokens no localStorage
                    localStorage.setItem('token', token);
                    localStorage.setItem('refreshToken', newRefreshToken);

                    // Atualiza o cabeçalho Authorization
                    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;

                    processQueue(null, token);
                    return axiosInstance(originalRequest);
                } else {
                    processQueue(error, null);
                    window.location.href = '/login';
                    return Promise.reject(error);
                }
            } catch (err) {
                processQueue(err, null);
                window.location.href = '/login';
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
