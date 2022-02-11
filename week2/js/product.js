import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'piggystore';
createApp({
    data() {
        return {
            tempProduct: {},
            products: [],
        }
    },
    methods: {
        checkLogin() {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)piggyToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization'] = token;
            axios.post(`${url}/api/user/check`)
                .then((res) => {
                    // console.log(res);
                    this.getProductslist();
                })
                .catch((err) => {
                    // console.dir(err);
                    alert('未正確登入，請重新登入再繼續！');
                    window.location.href = './login.html';
                })
        },
        getProductslist() {
            axios.get(`${url}/api/${path}/admin/products/all`)
                .then((res) => {
                    // console.log(res);
                    this.products = res.data.products
                })
                .catch((err) => {
                    console.dir(err.response);
                })
        },
        showProductDetails(item) {
            this.tempProduct = item;
            console.log(this.tempProduct.title);
        },
        // deleteProduct(item) {
        //     axios.post(`${url}/api/user/check`)
        //         .then((res) => {
        //             // console.log(res);
        //             this.getProductslist();
        //         })
        //         .catch((err) => {
        //             // console.dir(err);
        //             alert('未正確登入，請重新登入再繼續！');
        //             window.location.href = './login.html';
        //         })
        // }
    },
    mounted() {
        this.checkLogin();
    }
}).mount('#app');


//新增產品
      // function addProduct() {
      //   const product = {
      //     data: {
      //       title: '[賣]動物園造型衣服3',
      //       category: '衣服2',
      //       origin_price: 100,
      //       price: 300,
      //       unit: '個',
      //       description: 'Sit down please 名設計師設計',
      //       content: '這是內容',
      //       is_enabled: 1,
      //       imageUrl: 'https://images.unsplash.com/photo-1573662012516-5cb4399006e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80'
      //     }
      //   }
      //   axios.post(`${url}/api/${path}/admin/product`,product)
      //     .then((res) => {
      //       console.log(res);
      //     })
      //     .catch((err) => {
      //       console.dir(err.response);
      //     })
      // }