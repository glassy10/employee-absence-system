<template>
  <div class="home">
    <transition name="slide-fade" appear >
      <input-absence v-if="showInputAbsence"></input-absence>

      <employee-absence v-if="showEmployeeAbsence" :showAllOption="true"></employee-absence>

      <upcoming-absences v-if="showUpcomingAbsence"></upcoming-absences>
    </transition>
  </div>
</template>

<script>
import UpcomingAbsences from '@/components/UpcomingAbsencesComponent'
import InputAbsence from '@/components/InputAbsenceComponent'
import EmployeeAbsence from '@/components/EmployeeAbsenceComponent'

import Vue from 'vue';
import VueBus from 'vue-bus';
Vue.use(VueBus);

export default {
  name: 'Home',
  components:{
    UpcomingAbsences,InputAbsence,EmployeeAbsence,
  },
  data () {
    return {
      showInputAbsence: false,
      showEmployeeAbsence:false,
      showUpcomingAbsence:true,
    }
  },
  methods:{
    menuClick:function(component){
      let vm = this;
      switch (component) {
        case 'input':
          vm.showInputAbsence = true
          vm.showEmployeeAbsence = false
          vm.showUpcomingAbsence = false
          break;
        case 'report':
          vm.showInputAbsence = false
          vm.showEmployeeAbsence = true
          vm.showUpcomingAbsence = false
          break;
          case '':
            vm.showInputAbsence = false
            vm.showEmployeeAbsence = false
            vm.showUpcomingAbsence = true
            break;
        default:
      }
    }
  },
  created: function(){
    let vm = this;
    vm.$bus.on('loadComponent', function (component) {
      vm.menuClick(component)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  overflow-x: hidden;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active { transition: all .3s ease; }
.slide-fade-leave-active { transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0); }
.slide-fade-enter  { transform: translateX(400px); opacity: 0; }
.slide-fade-leave-to  { transform: translateX(-400px); opacity: 0; }
/* .slide-fade-leave-active for <2.1.8 */
</style>
