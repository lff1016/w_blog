// 首页下拉按钮
const scrollBtn = document.getElementById('scroll-down')
const main = document.getElementById('main')

scrollBtn.addEventListener('click', () => {
    btf.scrollToDest(main.offsetTop, 300)
})
