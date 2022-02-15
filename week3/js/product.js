import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
//需先宣告一個參數再於 mounted 中賦予它 modal物件
let productModal = null;
let delProductModal = null;
const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'piggystore';
createApp({
    data() {
        return {
            tempProduct: {
                imagesUrl: [],
            },
            isNewProduct: false,
            products: [],
        }
    },
    methods: {
        checkLogin() {
            axios.post(`${url}/api/user/check`)
                .then((res) => {
                    // console.log(res);
                    this.getProductslist();
                })
                .catch((err) => {
                    // console.dir(err);
                    alert(`${err.response.data.message}，請重新登入一次，謝謝!`);
                    window.location.href = './login.html';
                })
        },
        getProductslist() {
            axios.get(`${url}/api/${path}/admin/products/all`)
                .then((res) => {
                    this.products = res.data.products
                })
                .catch((err) => {
                    console.dir(err.response);
                    alert(`${err.response.data.message}`);
                })
        },
        showModal(isNew, item) {
            //將所有開啟 modal 放在同一個函式執行，並且使用淺複製處理賦予值
            if (isNew === 'new') {
                this.tempProduct = {
                    imagesUrl: [],
                };
                this.isNewProduct = true;
                productModal.show();
            } else if (isNew === 'edit') {
                this.tempProduct = { ...item };
                this.isNewProduct = false;
                productModal.show();
            } else if (isNew === 'delete') {
                this.tempProduct = { ...item };
                delProductModal.show()
            }
        },
        updateProduct() {
            //因為更新及新增都使用同欄位 ，所以可以共用同一個方法，只需修改 發送的方式即可
            let tempurl = `${url}/api/${path}/admin/product`;
            let temphttp = 'post';

            if (!this.isNewProduct) {
                tempurl = `${url}/api/${path}/admin/product/${this.tempProduct.id}`;
                temphttp = 'put'
            }
            axios[temphttp](`${tempurl}`, { data: this.tempProduct })
                .then((res) => {
                    this.getProductslist();
                    productModal.hide();
                })
                .catch((err) => {
                    console.dir(err);
                    alert(`${err.response.data.message}`);
                })
        },
        deleteProduct(item) {
            axios.delete(`${url}/api/${path}/admin/product/${item.id}`)
                .then((res) => {
                    delProductModal.hide();
                    this.getProductslist();
                })
                .catch((err) => {
                    console.dir(err);
                    alert(`${err.response.data.message}`);
                })
        },
        createImages() {
            //清空圖片連結陣列，新增一個空位(讓之後可以存放圖片位址用)
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push('');
        },
    },
    mounted() {
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false
        });
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
        });
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)piggyToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.checkLogin();
    }
}).mount('#app');