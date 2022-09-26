$(function () {
    //点击"去注册账号"的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击"去登陆"的链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })


    //从layui中获取form对象
    const form = layui.form
    //从layui中获取layer对象
    const layer = layui.layer
    //通过form.verify()函数自定义校验规则
    form.verify({
        //自定义一个叫做pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        repwd: function (value) {
            //通过形参value拿到的是确认密码框中的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于的判断
            //如果判断失败，则return一个提示消息即可
            const pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })


    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        //阻止默认行为
        e.preventDefault()
        // $.post('http://www.liulongbin.top:3007/api/reguser',{username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()},function (res) {
        //     if (res.status !==0) {
        //         return  console.log(res.message);
        //     }
        //     console.log('注册成功');
        // })
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message + '请登录')
                //模拟人的点击行为，跳转到登录界面
                $('#link_login').click()
            }
        })
    })
    //监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            //快速获取表单的数据
            data: $(this).serialize(),
            success: function (res) {
                console.log(res.status);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                console.log(res.token);
                //将登录成功之后得到的token字符串保存到localStorage中
                localStorage.setItem('token', res.token)
                //跳转到后台主页
                location.href = './index.html'
            }
        })
    })
})