import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
const url = 'https://vue3-course-api.hexschool.io/v2';

createApp({
    data() {
        return {
            user: {
                username: "",
                password: "",
            },
        };
    },
    methods: {
        login() {
            axios.post(`${url}/admin/signin`, this.user)
                .then((res) => {
                    const { token, expired } = res.data;
                    document.cookie = `piggyToken=${token}; expires=${expired};`;
                    window.location.href = './productlist.html';
                })
                .catch((err) => {
                    this.user.username = '';
                    this.user.password = '';
                    alert(`${err.response.data.message}，請確認後再重新登入一次，謝謝!`);
                })
        },
    },
}).mount("#app");
