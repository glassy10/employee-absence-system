<template>
  <div id="app">
    <eas-menu></eas-menu>
    <main class="main">
      <router-view></router-view>
    </main>
    <div class="loader" :class="{ hideme: !isLoading }" >
      <svg viewBox="0 0 32 32" width="32" height="32">
        <circle id="ud811Spinner" cx="16" cy="16" r="14" fill="none"></circle>
      </svg>
    </div>
  </div>
</template>

<script>

import EasMenu from '@/components/MenuComponent'
export default {
  name: 'app',
  components: {
    EasMenu
  },
  data() {
    return {
      isLoading:true
    }
  },
  mounted:function(){
    this.isLoading = false
  }
}
</script>

<style>


  .hideme {
    display:none;
  }
  * {
    box-sizing: border-box;
    /*Reset's every elements apperance*/
    background: none repeat scroll 0 0 transparent;
    border: medium none;
    border-spacing: 0;
    font-weight: normal;
    /*line-height: 1.42rem;*/
    list-style: none outside none;
    margin: 0;
    padding: 0;
    text-align: left;
    text-decoration: none;
    text-indent: 0;
  }

  button::-moz-focus-inner,
  input::-moz-focus-inner {
    border: 0;
    padding: 0;

  }
  html, body {
    font-family:-apple-system,
                 BlinkMacSystemFont,
                 "Segoe UI",
                 Roboto,
                 Oxygen,
                 Ubuntu,
                 Cantarell,
                 "Fira Sans",
                 "Droid Sans",
                 "Helvetica Neue",
                 sans-serif;
    font-size:14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
   }


html,
body{
  top:0;
  bottom:0;
  left:0;
  right:0;
  z-index:100;
  margin:auto;
  padding:0;
  max-width:100%;
  max-height:100%;
  line-height:20px;
  min-width:320px;
  min-height:480px;
  max-width:430px;
  /*max-height:792px;*/
  width:100%;
  height:100%;
  /*overflow:hidden;*/
  /*border-left:1px solid #ced7e6;
  border-right:1px solid #ced7e6;*/

}
html{
  -webkit-text-size-adjust:100%;
  -ms-text-size-adjust:100%;
  -webkit-tap-highlight-color:transparent;
  display:flex;
  color:#444;
  background:#f9f9f9 !important;
}

  .heading {
    padding: 12px 0 20px 0;
    margin: 0;
    font-size:26px;
    line-height:1.25em;

  }
  input,select,textarea,datepicker-input {
    padding:7px;
    /*border-radius:3px;*/
    display:block;
    margin:0 0 10px 0;
    background: #fff;
    border: 1px solid #ccc;
    border-spacing: 0;
    color: #444;
    font-weight: normal;
    line-height: 1.42rem;
    text-align: left;
    text-decoration: none;
    text-indent: 0;
    font-family:-apple-system,
                 BlinkMacSystemFont,
                 "Segoe UI",
                 Roboto,
                 Oxygen,
                 Ubuntu,
                 Cantarell,
                 "Fira Sans",
                 "Droid Sans",
                 "Helvetica Neue",
                 sans-serif;
  }
  input[type="checkbox"] {
      vertical-align:baseline;
  }
  label {
    font-size:100%;
    display:block;
  }
  .button {
    cursor:pointer;
    background-color: rgb(91, 192, 222);
    color: white;
    padding:10px;
    border-radius:3px;
    margin:20px 0 10px 0;
    text-align:center;
    width: 96%;

  }
  .button:hover {
    background-color: rgb(2, 117, 216);
  }
  /*@media (max-width: 768px) {
    button {
      width: 100%;
    }
  }*/

  .loader {
    left: 50%;
    top: 50%;
    position: fixed;
    -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%); }
    .loader #ud811Spinner {
      box-sizing: border-box;
      stroke: #673AB7;
      stroke-width: 3px;
      -webkit-transform-origin: 50%;
              transform-origin: 50%;
      -webkit-animation: line 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite, rotate 1.6s linear infinite;
              animation: line 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite, rotate 1.6s linear infinite; }

  @-webkit-keyframes rotate {
    from {
      -webkit-transform: rotate(0);
              transform: rotate(0); }
    to {
      -webkit-transform: rotate(450deg);
              transform: rotate(450deg); } }

  @keyframes rotate {
    from {
      -webkit-transform: rotate(0);
              transform: rotate(0); }
    to {
      -webkit-transform: rotate(450deg);
              transform: rotate(450deg); } }

  @-webkit-keyframes line {
    0% {
      stroke-dasharray: 2, 85.964;
      -webkit-transform: rotate(0);
              transform: rotate(0); }
    50% {
      stroke-dasharray: 65.973, 21.9911;
      stroke-dashoffset: 0; }
    100% {
      stroke-dasharray: 2, 85.964;
      stroke-dashoffset: -65.973;
      -webkit-transform: rotate(90deg);
              transform: rotate(90deg); } }

  @keyframes line {
    0% {
      stroke-dasharray: 2, 85.964;
      -webkit-transform: rotate(0);
              transform: rotate(0); }
    50% {
      stroke-dasharray: 65.973, 21.9911;
      stroke-dashoffset: 0; }
    100% {
      stroke-dasharray: 2, 85.964;
      stroke-dashoffset: -65.973;
      -webkit-transform: rotate(90deg);
              transform: rotate(90deg); } }

  
  
  .main {
    padding-top: 10px;
    margin:0 10px 0 10px;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
        -ms-flex: 1;
            flex: 1;
    overflow-x: auto;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
   }

 .card {
   position: relative;
   box-sizing: border-box;
   margin-bottom:10px;
   border-top: 1px solid #ddd;
   border-left: 1px solid #ddd;
   border-right:1px solid #ddd;
   border-bottom:1px solid #ddd;
   padding:0 0 4px 0;
   background-color:#fff;
   border-radius:0px;
   /*box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);*/

 }

  .dialog-container {
    background: rgba(0, 0, 0, 0.57);
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    pointer-events: none;
    will-change: opacity;
    -webkit-transition: opacity 0.333s cubic-bezier(0, 0, 0.21, 1);
    transition: opacity 0.333s cubic-bezier(0, 0, 0.21, 1);
   }

  .dialog-container--visible {
    opacity: 1;
    pointer-events: auto;
   }

  .dialog {
    background: #FFF;
    border-radius: 2px;
    box-shadow: 0 0 14px rgba(0, 0, 0, 0.24), 0 14px 28px rgba(0, 0, 0, 0.48);
    min-width: 280px;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%) translateY(30px);
            transform: translate(-50%, -50%) translateY(30px);
    -webkit-transition: -webkit-transform 0.333s cubic-bezier(0, 0, 0.21, 1) 0.05s;
    transition: -webkit-transform 0.333s cubic-bezier(0, 0, 0.21, 1) 0.05s;
    transition: transform 0.333s cubic-bezier(0, 0, 0.21, 1) 0.05s;
    transition: transform 0.333s cubic-bezier(0, 0, 0.21, 1) 0.05s, -webkit-transform 0.333s cubic-bezier(0, 0, 0.21, 1) 0.05s;
    padding: 24px;
  }

  .vdp-datepicker__calendar {
    width:220px; /*(30+1+1 * 7 days)*/
  }
  .vdp-datepicker__calendar header {
    height:30px;
    line-height:30px;
  }
   .vdp-datepicker__calendar .cell {
     height:30px;
     width:30px;
     line-height:30px;
     padding: 0 0px 0px 0;
   }
   /*@media (min-width: 992px) {
     #app {
          width: 800px;
          margin: 0 auto;
     }
     .main {
       margin-left:0;
       margin-right:0;
     }
   }*/
</style>
