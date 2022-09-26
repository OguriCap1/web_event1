$(function () {
    const layer = layui.layer
    const form = layui.form
    const laypage = layui.laypage;
    //定义一个查询的参数对象
    //需要将请求参数对象提交到服务器
    const q = {
        pagenum:1,//页码值，默认请求第一页的数据
        pagesize:2,//每页显示几条数据
        cate_id:'',//文章分类的id
        state:''//文章的发布状态
    }

    //调用方法
    initTable()
    //获取文章列表数据的方法
    function initTable() {
        $.ajax({
            method:'GET',
            url:'/my/article/list',
            data:q,
            success(res){
                console.log(res);
                if (res.status !==0) {
                    return layer.msg('获取文章列表失败')
                }
                // 使用模板引擎渲染页面数据
                // 调用模板引擎
                const htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)

                //调用渲染分页的方法
                renderPage(res.total)
            }
        })
    }

    //定义渲染分页的方法
    function renderPage(total) {
        console.log(total);
        //调用laypage.render()方法来渲染分页的结构
        laypage.render({
            elem:'pageBox',//分页容器的id
            count:total,//总数居条数
            limit:q.pagesize,//每页显示几条数据
            curr:q.pagenum//指定默认选中的分页
        })
    }
})