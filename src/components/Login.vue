<template>
  <div class="login">
  
    <div class="heading">Log in</div>

    <label for="username">User name</label>
    <input type="text" id="username" placeholder="User name" v-model="user.eeUserName">
    
    <label for="password">Password</label>
    <input type="text" id="password" placeholder="Password" v-model="user.eePassword">
    
    <button class="button" @click.prevent="submit()">Submit</button>
  
  </div>
</template>

<script>
import router from '../router/'
import Auth from '@/components/Auth'

export default {
  name: 'login',
  data () {
    return {
      user: {
        eeUserName:'',
        eePassword:''
      },
      incorrectCreds:false,
    }
  },
  methods:{
    submit: function() {
      let vm = this
      // let creds = {}
      // creds.username = vm.user.email
      // creds.password = vm.user.password
      const redirect = vm.getParameterByName('redirect')
      console.log(vm.user)
      Auth.login(vm.user,redirect)

      
      // ApiInterface.login(vm.user)
      // .then((res) => {
      //   //console.log(res.data)
      //   if (res.data === true){
      //     //set session variable
      //     document.cookie = "EAS_Username=" + vm.user.eeUserName;
      //     //redirect to Home
      //     router.push('/')
      //   } else {
      //     console.log('login failed')
      //   }
      //})
    },
    getParameterByName: function(name,url){
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
        const results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  },
  created: function(){
    let vm = this;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
