//#4-1 建立分頁元件樣板
export default {
    //#7 傳入分頁資訊，使用 props，定義接收變數 pages
    props: ["pages"],
    //#9 使用 vue 寫活 template
    //#10 發送事件到外面(由內到外)，使用 emit
    template: `<nav aria-label="Page navigation example">
    <ul class="pagination">
        <li class="page-item" :class="{'disabled': !pages.has_pre}">
            <a class="page-link" href="#" aria-label="Previous"
            @click="$emit('get_product',pages.current_page -1)">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li class="page-item" v-for="page in pages.total_pages" :key="page+'page'" 
            :class="{'active': page === pages.current_page}"
            @click="$emit('get_product',page)"><a class="page-link" href="#">{{page}}</a></li>
        <li class="page-item" :class="{'disabled': !pages.has_next}">
            <a class="page-link" href="#" aria-label="Next"
            @click="$emit('get_product',pages.current_page +1)">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
    </nav>`,
};
