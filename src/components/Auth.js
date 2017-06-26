import router from '../router/'
import Constants from '@/components/helpers/Constants'
import ApiInterface from '@/apiInterface'


export default {
  debug: false,
  authenticated: false,

  login (user,redirect){
    const vm = this
    vm.debug && console.log('in auth',user,redirect)
    return ApiInterface.login(user)
    .then(function(response){
      if (response.data !== null){
        vm.debug && console.log('LoginUser2 response.data',response.data)
        localStorage.setItem('user', JSON.stringify(response.data))
        vm.authenticated = true

        // Redirect to a specified route
        if (redirect) {
          vm.debug && console.log('going to redirect')
          router.push(redirect)
        } else {
          router.push('/home')
        }
      } else {
        alert('login credentials incorrect')
      }
    })


  },
  loggedIn() {
    // Return true if someone is logged in, else false
    //check if localStorage has records - if so ...
    if (this.getUser()) this.authenticated = true
    return this.authenticated
  },
  getUser() {
    // Gets the current user's details
    this.debug && console.log('Auth.getUser() gets user', JSON.parse(localStorage.getItem('user')))
    return JSON.parse(localStorage.getItem('user'))
  },
  logout: function() {
    this.debug && console.log('Auth.logout() called')
    localStorage.removeItem('user');
    this.authenticated = false;
    router.push('/login')
  },
  register(username,password){
    // Registration
  },
  destroyCurrentUser() {
    // Just for fun. Only a logged in user can delete himself
  }


}
