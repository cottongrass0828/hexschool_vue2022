import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
//#4-2 匯入分頁元件樣板
import pagination from './pagination.js'

let productModal = null;
let delProductModal = null;
const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'piggystore';
const app = createApp({
    //#5 區域註冊
    components: {
        pagination
    },
    data() {
        return {
            tempProduct: {
                imagesUrl: [],
            },
            isNewProduct: false,
            pagination: {},
            //#1 定義分頁資料
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
        getProductslist(page = 1) { //#3-2 參數預設值
            axios.get(`${url}/api/${path}/admin/products?page=${page}`) //#3-1 代入參數
                .then((res) => {
                    this.products = res.data.products
                    //#2 取出分頁資料
                    this.pagination = res.data.pagination;
                })
                .catch((err) => {
                    console.dir(err.response);
                    alert(`${err.response.data.message}`);
                })
        },
        showModal(isNew, item) {
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
});

app.mount('#app');