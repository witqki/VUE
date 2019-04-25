<template>
  <div>
    <div class="mod_header">
      <div class="section_inner">
        <h1 class="qqmusic_title">
          <router-link to="/">
            <img class="qqmusic_logo" src="http://39.96.172.186:8080/musiclogo.jpg" alt="T-music">
          </router-link>
        </h1>
        <ul class="mod_top_nav">
          <li class="top_nav__item top_nav__item--room">
            <router-link class="top_nav_link" :class="{'top_nav_link--current': linkIndex==1}" to="/home">音乐馆</router-link>
          </li>
          <li class="top_nav__item top_nav__item--mine">
            <router-link class="top_nav_link" :class="{'top_nav_link--current': linkIndex==2}" to="/myMusic">我的音乐</router-link>
          </li>
          <!--<li class="top_nav__item top_nav__item--down">
            <router-link class="top_nav_link" :class="{'top_nav_link--current': linkIndex==3}" to="resume">关于我</router-link>
          </li>-->
        </ul>
        
        <div class="mod_top_search" @mouseout="schleave">
          <div class="mod_search_input">
            <input type="text" class="search_input__input" v-model="keyword" placeholder="先搜一下好吗？" @click="dropmenu">
            <button class="search_input__btn">
              <i class="icon_search" @click="search(keyword)"></i>
              <span class="icon_text"></span>
            </button>
          </div>
          <!-- 搜索下的内容-->
          <div class="js_smartbox">
            <div class="mod_search_other" :class="drop?'drop':''">
              <div class="search_hot">
                <dl class="search_hot__list">
                  <dt class="search_hot__tit">热门搜索</dt>
                  <dd>
                    <a href="javascript:;" class="search_hot__link js_smartbox_search
                      js_left" data-name="">
                        <span class="search_hot__number">1</span>
                        <span class="search_hot__name">鹿晗</span>
                        <span class="search_hot__listen">100.6万</span>
                    </a>
                    <a href="javascript:;" class="search_hot__link js_smartbox_search
                      js_left" data-name="">
                        <span class="search_hot__number">2</span>
                        <span class="search_hot__name">薛之谦</span>
                        <span class="search_hot__listen">80.6万</span>
                    </a>
                    <a href="javascript:;" class="search_hot__link js_smartbox_search
                      js_left" data-name="">
                        <span class="search_hot__number">3</span>
                        <span class="search_hot__name">周杰伦</span>
                        <span class="search_hot__listen">78.6万</span>
                    </a>
                    <a href="javascript:;" class="search_hot__link js_smartbox_search
                      js_left" data-name="">
                        <span class="search_hot__number">4</span>
                        <span class="search_hot__name">bigbang</span>
                        <span class="search_hot__listen">66.6万</span>
                    </a>
                  </dd>
                </dl>
              </div>
              <div class="search_history">
                <dl class="search_history__list">
                  <dt class="search_history__tit">
                    搜索历史
                    <a href="" class="search_history__clear js_smartbox_delete_all">
                      <i class="icon_history_clear"></i>
                      <span class="icon_txt">清空</span>
                    </a>
                  </dt>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div class="header__opt">
          <span class="mod_top_login">
            <img class="avatar" v-show='isLogin?true:false'
              src="https://p.qpic.cn/music_cover/Q5MtyhqyicZRIFMHk9v3tflKkLNRVG0opUMd0rm0Oe6U3iam0Es6pd3Q/300?n=1" alt="">
           <!-- <a href="#" class="top_login__link js_login" @click="login" v-show='isLogin?false:true'>登录</a>-->
            <el-dropdown  @command="handleCommand">
                    <el-button round type="primary" v-show='isLogin?false:true'>
                        登录<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command=0>用户名登录</el-dropdown-item>
                        <el-dropdown-item command=1>手机号登录</el-dropdown-item>
                        <el-dropdown-item command=2>邮箱登录</el-dropdown-item>
                     
                    </el-dropdown-menu>
                </el-dropdown>
               <el-button type="primary" plain @click="registerdialog(0)" v-show='isLogin?false:true'>注册</el-button>
                
                 
      <!--  <a href="#" class="mod_btn_green top_login__btn_vip js_openvip">开通绿钻豪华版</a>
            <a href="#" class="mod_btn top_login__btn_vip js_openmusic">开通付费包</a> -->
          </span>
        </div>
      </div>
    </div>

     <el-dialog
                        title="注册"
                        :visible.sync="registereddialogVisible"
                        width="40%"
                        :before-close="handleClose"
                        :append-to-body='true'
                        :lock-scroll="false"
                        
                        >
                        <el-form :inline="true" :model="formInline"  ref="namelogin"  class="demo-form-inline">
                            <el-form-item label="用户名" prop="name" 
                            :rules="[
                                { required: true, message: '请输入用户名', trigger: 'blur' },
                                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }          
                                ]"
                            >
                                <el-input v-model="formInline.name" placeholder="请输入用户名" ></el-input>
                            </el-form-item>
                              <br>
                            <el-form-item label="密码" prop="psw"
                            :rules="[
                                { required: true, message: '请输入密码', trigger: 'blur' },
                                { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' },
                                ]"
                            >
                                <el-input v-model="formInline.psw" placeholder="请输入密码" autocomplete="off"></el-input>
                            </el-form-item>
                            <br>
                           <el-form-item label="确认密码" prop="conpsw"
                            :rules="[
                                { required: true, message: '请输入确认密码密码', trigger: 'blur' },
                                { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' },
                                
                                ]"
                            >
                                <el-input v-model="formInline.conpsw" placeholder="请确认输入密码" autocomplete="off"></el-input>
                            </el-form-item>
                            <br>
                              <el-form-item label="性别" prop="sex" >
                                <el-radio v-model="formInline.sex" label="0">男</el-radio>
                                <el-radio v-model="formInline.sex" label="1">女</el-radio>
                              </el-form-item>
                              <br>
                                <el-form-item label="手机号" prop="phone">
                                  <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
                                </el-form-item>
                                <br>
                                <el-form-item label="邮箱" prop="email">
                                  <el-input v-model="formInline.email" placeholder="邮箱"></el-input>
                                </el-form-item>
                                <br>

                             <el-form-item label="记住密码">                            
                               <el-switch v-model="formInline.remeber" ></el-switch>
                            </el-form-item>
                            <br>
                            <el-form-item>
                                <el-button type="primary" @click="onRegister()">注册</el-button>
                                <el-button @click="resetForm">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                     <el-dialog
                        title="用户名登录"
                        :visible.sync="namedialogVisible"
                        width="40%"
                        :before-close="handleClose"
                        :append-to-body='true'
                        :lock-scroll="false"
                        
                        >
                        <el-form :inline="true" :model="formInline"  ref="namelogin"  class="demo-form-inline">
                            <el-form-item label="用户名" prop="name" 
                            :rules="[
                                { required: true, message: '请输入用户名', trigger: 'blur' },          
                                ]"
                            >
                                <el-input v-model="formInline.name" placeholder="请输入用户名" ></el-input>
                            </el-form-item>
                            <br>
                            <el-form-item label="密码" prop="psw"
                            :rules="[
                                { required: true, message: '请输入密码', trigger: 'blur' },
                               
                                ]"
                            >
                                <el-input v-model="formInline.psw" placeholder="请输入密码" autocomplete="off"></el-input>
                            </el-form-item>
                            <br>
                           <el-form-item label="记住密码">                            
                               <el-switch v-model="formInline.remeber" ></el-switch>
                            </el-form-item>
                            <br>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit(0)">登录</el-button>
                                <el-button @click="resetForm">重置</el-button>
                                 <el-button type="danger" round @click="forgetpsw()">忘记密码</el-button>
                            </el-form-item>
                            
                        </el-form>
                    </el-dialog>
                     <el-dialog
                        title="手机号登录"
                        :visible.sync="phonedialogVisible"
                        width="40%"
                        :before-close="handleClose"
                        :append-to-body='true'
                        :lock-scroll="false"
                        
                        >
                        <el-form :inline="true" :model="formInline"  ref="phonelogin"  class="demo-form-inline">
                            <el-form-item label="手机号" prop="phone" 
                            :rules="[
                                { required: true, message: '请输入手机号', trigger: 'blur' },
                                { pattern:/^1(3|4|5|7|8)\d{9}$/, message: '请输入正确的手机号' }
                               
                                ]"
                            >
                                <el-input v-model="formInline.phone" placeholder="请输入手机号" ></el-input>
                            </el-form-item>
                                <br>
                            <el-form-item label="密码" prop="psw"
                            :rules="[
                                { required: true, message: '请输入密码', trigger: 'blur' },
                               
                                ]"
                            >
                                <el-input v-model="formInline.psw" placeholder="请输入密码" autocomplete="off"></el-input>
                            </el-form-item>
                           <br>
                           <el-form-item label="记住密码">                            
                               <el-switch v-model="formInline.remeber" ></el-switch>
                            </el-form-item>
                              <br>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit(1)">登录</el-button>
                                <el-button @click="resetForm">重置</el-button>
                                <el-button type="danger" round @click="forgetpsw()">忘记密码</el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                    <el-dialog
                        title="邮箱登录"
                        :visible.sync="emaildialogVisible"
                        width="40%"
                        :before-close="handleClose"
                        :append-to-body='true'
                        :lock-scroll="false"
                        
                        >
                        <el-form :inline="true" :model="formInline"  ref="emaillogin"  class="demo-form-inline">
                            <el-form-item label="邮箱" prop="email" 
                            :rules="[
                                { required: true, message: '请输入邮箱', trigger: 'blur' },
                                { pattern:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱' }
                               
                                ]"
                            >
                                <el-input v-model="formInline.email" placeholder="请输入邮箱" ></el-input>
                            </el-form-item>
                               <br>
                            <el-form-item label="密码" prop="psw"
                            :rules="[
                                { required: true, message: '请输入密码', trigger: 'blur' },
                               
                                ]"
                            >
                                <el-input v-model="formInline.psw" placeholder="请输入密码" autocomplete="off"></el-input>
                            </el-form-item>
                            <br>
                           <el-form-item label="记住密码">                            
                               <el-switch v-model="formInline.remeber" ></el-switch>
                            </el-form-item>
                             <br>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit(2)">登录</el-button>
                                <el-button @click="resetForm()">重置</el-button>
                                <el-button type="danger" round @click="forgetpsw()">忘记密码</el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>

                    <el-dialog
                        title="重置密码"
                        :visible.sync="forgetdialogVisible"
                        width="40%"
                        :before-close="handleClose"
                        :append-to-body='true'
                        :lock-scroll="false"
                        
                        >
                        <el-form :inline="true" :model="formInline"  ref="emaillogin"  class="demo-form-inline">
                            <el-form-item label="邮箱" prop="email" 
                            :rules="[
                                { required: true, message: '请输入邮箱', trigger: 'blur' },
                                { pattern:/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱' }
                               
                                ]"
                            >
                                <el-input v-model="formInline.email" placeholder="请输入邮箱" ></el-input>
                            </el-form-item>
                             <el-button type="primary" v-show="show" v-on:click="getCode">发送验证码</el-button>
                             	<span class="register-msg-btn" v-show="!show">{{count}} s</span>
                               <br>
                            <el-form-item label="新密码" prop="psw"
                            :rules="[
                                { required: true, message: '请输入密码', trigger: 'blur' },
                                { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' },
                               
                                ]"
                            >
                                <el-input v-model="formInline.psw" placeholder="请输入新密码" autocomplete="off"></el-input>
                            </el-form-item>
                            <br>
                            <el-form-item label="确认密码" prop="conpsw"
                            :rules="[
                                { required: true, message: '请输入确认密码密码', trigger: 'blur' },
                                { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' },
                                
                                ]"
                            >
                                <el-input v-model="formInline.psw" placeholder="请确认输入密码" autocomplete="off"></el-input>
                            </el-form-item>
                            <br>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit(2)">确认</el-button>
                                <el-button @click="resetForm()">重置</el-button>
                                
                            </el-form-item>
                        </el-form>
                    </el-dialog>
    
  </div>
</template>

<script>
import Axios from 'axios'
import {mapActions, mapState} from 'vuex'
  export default {
    data () {
      return {
        loginbtn:false,
         show: true,    
				count: '',    
				timer: null,
        drop: false,
        keyword: '',
        isLogin: false,
        namedialogVisible: false,
        phonedialogVisible: false,
        emaildialogVisible: false,
        registereddialogVisible:false,
        forgetdialogVisible:false,//忘记密码
        formInline: {
                     name:'',
                     phone: '',
                     email:'',
                     psw: '',
                     conpsw:'',
                     sex: '0',
                     msg:'',
                    
                     remeber:false
                },
      }
    },
    mounted () {
      console.log(this.$route.path)
      console.log(this.$store.state)
    },
    computed: {
      linkIndex () {
        return this.$store.state.linkIndex
      },
      tagLink () {
        return this.$store.state.tagLink
      }
    },
    methods: {
       getCode(){      
				const TIME_COUNT = 60;      
				if (!this.timer) {        
					this.count = TIME_COUNT;        
					this.show = false;        
					this.timer = setInterval(() => {        
						if (this.count > 0 && this.count <= TIME_COUNT) {          
							this.count--;         
						} else {          
							this.show = true;          
							clearInterval(this.timer);          
							this.timer = null;         
						}        
					}, 1000)       
        }
        },
      forgetpsw(){
          this.namedialogVisible=false;
          this.phonedialogVisible=false;
          this.emaildialogVisible=false;
           this.registereddialogVisible=false;
             this.forgetdialogVisible=true;
      },
       resetForm() {
                this.formInline.name="";
                this.formInline.psw="";
                this.formInline.conpsw="";
                this.formInline.phone="";
                this.formInline.email="";

            },
      registerdialog(index){
           if(index==0){
             this.registereddialogVisible=true;
           }
           else{
             this.registereddialogVisible=false;
           }
      },
      onRegister(){
       var api='http://localhost:8081/user/register';
     //post
                this.axios({
                    method: 'post',
                    url: api,
                        data:{
                        name:this.formInline.name, 
                        password:this.formInline.psw,
                        cpassword:this.formInline.conpsw,
                        sex:this.formInline.sex,
                        phone:this.formInline.phone,
                        email:this.formInline.email,
                        }
                    }).then(response=>{
                        if(response.data.success){
                               this.formInline.password="";
                               this.formInline.cpassword="";
                               this.$router.push('/home');
                        }else{
                            this.formInline.password="";
                            this.formInline.cpassword="";
                                alert(response.data.msg);
                        }
                        

                        console.log(response);
                    }).catch(function(err){
                        console.log(err)
                    });
      },
      onSubmit(fromName) {
                        var api='http://localhost:8081/user';
                        if(fromName==0){
                           
                            this.formInline.msg=this.formInline.name;
                        }else if(fromName==1){
                          
                            this.formInline.msg=this.formInline.phone;
                        }else{
                            this.formInline.msg=this.formInline.email;
                        }
                        //post
                   
                         this.axios({
                            method: 'post',
                            url: api,
                             data:{
                                checkcode:fromName, 
                                message:this.formInline.msg,
                                password:this.formInline.psw,
                             }
                            }).then(response=>{
                                if(response.data.success){
                                      this.formInline.password="";
                                       console.log(!this.$store.state.isLogin);
                                       this.isLogin =!this.$store.state.isLogin;
                                        this.namedialogVisible=false;
                                        this.phonedialogVisible=false;
                                        this.emaildialogVisible=false;
                                      
                                }else{
                                    this.formInline.password="";
                                     alert(response.data.msg);
                                }
                              

                                console.log(response);
                            }).catch(function(err){
                                console.log(err)
                            });
         },
       handleClose(done) {//关闭登录弹窗
          this.namedialogVisible=false;
          this.phonedialogVisible=false;
          this.emaildialogVisible=false;
           this.registereddialogVisible=false;
            this.forgetdialogVisible=false;
                       
        },
        handleCommand(command){
          console.log()
                    if(command==0){
                       this.namedialogVisible=true;
                    }else if(command==1){
                       this.phonedialogVisible=true;
                    }else{
                       this.emaildialogVisible=true;
                    }
                   
                },
      search: function (keyword) {
      
       
        if (keyword.trim()) {
          console.log('获得数据')
          this.axios.get('http://localhost:8081/music/search',{
            params:{
             searchcontent:keyword
            }
          })
            .then(res => {
              // console.log(res.data.result.songs);
              console.log(res.data)
              console.log(res.data.list)
              this.$store.commit('save_songList', res.data.list)
              this.$router.push({path: '/artList', query: {keyword: this.keyword}})
            })

        } else {
          alert('请输入好吗?')
        }
      },
      schleave: function () {
        setTimeout(
          () => {
            this.drop = false
          }, 1000)
      },
      dropmenu: function () {
        this.drop = true
      },
      login: function() {
        console.log(!this.$store.state.isLogin);
        this.isLogin =!this.$store.state.isLogin
      }
    }
  }
</script>

<style lang="css" scoped>
  @import "./style/header.css";
</style>
