<template>
  <div id="eas-menu">
    <header class="header">
      <button id="butBackArrow" class="headerButton" aria-label="Back" v-if="showBackArrow" @click="(selectComponent(''))"></button>
      <h1 class="header__title">{{headerTitle}}</h1>
      <button id="butPerson" class="headerButton" aria-label="Search" @click="(selectComponent('report'))" v-if="!showBackArrow && showButtons"></button>
      <button id="butAdd" class="headerButton" aria-label="Add" @click="(selectComponent('input'))" v-if="!showBackArrow && showButtons"></button>
    </header>
  </div>
</template>
<script>

import Vue from 'vue';
import VueBus from 'vue-bus';
Vue.use(VueBus);
import router from '../router/'

export default {
  name: 'eas-menu',
  components:{router},
  data() {
    return {
      headerTitle:"Absence System",
      showBackArrow:false,
      msg:'',
      showButtons:true,
    }
  },
  methods: {
    selectComponent(component) {
      let vm = this
      vm.$bus.emit('loadComponent',component)
      switch (component) {
        case 'input':
          vm.headerTitle = 'Input Absence'
          vm.showBackArrow = true
          break;
        case 'report':
          vm.headerTitle = 'Find Absences'
          vm.showBackArrow = true
          break;
        case '':
          vm.headerTitle = 'Absence System'
          vm.showBackArrow = false
          vm.showButtons = true
          break;
        default:
      }
      //also need to set route back to default in case on authorise page
      router.push({name:'Home'});
    }
  },
  created: function(){
    let vm = this
    //if route is 'authorise' don't show header buttons & set title to "authorise" & show back button
    if (vm.$route.name === 'Authorise') {
      vm.showButtons = false
      vm.showBackArrow = true
      vm.headerTitle = 'Authorise'
    } else {
      vm.showButtons = true
      vm.showBackArrow = false
      vm.headerTitle = 'Absence System'
    }
  }
}
</script>

<style>
  .header {
    /*width: 100%;*/
    min-width:320px;
    max-width:430px;
    height: 44px;
    color: #FFF;
    background: #3F51B5;
    /*position: fixed;*/
    font-size: 20px;
    box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 2px 9px 1px rgba(0, 0, 0, 0.12), 0 4px 2px -2px rgba(0, 0, 0, 0.2);
    padding: 12px 4px 0 16px;
    will-change: transform;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
        -ms-flex-direction: row;
            flex-direction: row;
    -webkit-flex-wrap: nowrap;
        -ms-flex-wrap: nowrap;
            flex-wrap: nowrap;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
        -ms-flex-pack: start;
            justify-content: flex-start;
    -webkit-box-align: stretch;
    -webkit-align-items: stretch;
        -ms-flex-align: stretch;
            align-items: stretch;
    -webkit-align-content: center;
        -ms-flex-line-pack: center;
            align-content: center;
    -webkit-transition: -webkit-transform 0.233s cubic-bezier(0, 0, 0.21, 1) 0.1s;
    transition: -webkit-transform 0.233s cubic-bezier(0, 0, 0.21, 1) 0.1s;
    transition: transform 0.233s cubic-bezier(0, 0, 0.21, 1) 0.1s;
    transition: transform 0.233s cubic-bezier(0, 0, 0.21, 1) 0.1s, -webkit-transform 0.233s cubic-bezier(0, 0, 0.21, 1) 0.1s;
    z-index: 1000;
  }

  .header .headerButton {
      width: 24px;
      height: 24px;
      margin-right: 16px;
      text-indent: -30000px;
      overflow: hidden;
      opacity: 0.75;
      -webkit-transition: opacity 0.333s cubic-bezier(0, 0, 0.21, 1);
      transition: opacity 0.333s cubic-bezier(0, 0, 0.21, 1);
      border: none;
      outline: none;
      cursor: pointer;
  }

  .header #butRefresh {
      background: url(../assets/ic_refresh_white_24px.svg) center center no-repeat;
  }
  .header #butAdd {
      background: url(../assets/ic_add_white_24px.svg) center center no-repeat;
  }
  .header #butPerson {
    background: url(../assets/ic_person_black_24px.svg) center center no-repeat;
  }
  .header #butBackArrow {
      background: url(../assets/ic_arrow_back_24px.svg) center center no-repeat;
  }

  .header__title {
    padding-top:3px;
    font-weight: 400;
    font-size: 18px;
    margin: 0;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
        -ms-flex: 1;
            flex: 1;
          }


</style>
