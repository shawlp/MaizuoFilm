<template>
    <div id="login">
        <form>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="输入手机号/邮箱" />
                <div class="input-bg"></div>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" placeholder="输入密码/验证码" />
                <div class="input-bg"></div>                
            </div>
            <button type="submit" class="center-block submit">登录</button>
        </form>
    </div>
</template>

<script>
    import '../../assets/login.css'
    export default {
        created() {
            this.$store.dispatch('changeTitle', "登录");            
        }        
    }
</script>

