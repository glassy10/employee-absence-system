<template>
  <div id="employee-absence">

    <div class="heading">Display Absence by Date</div>

    <div id="inputs" v-if="!absences.length">
      <select v-model="userName">
        <option value="-1" selected v-if="!showAllOption">Select Name</option>
        <option value="-1" selected v-if="showAllOption">Select All or Name</option>
        <option value="All" selected v-if="showAllOption">All</option>
        <option v-for="e in employees" :value="e.UserName" :key="e.UserName">{{e.FirstName}} {{e.Surname}}</option>
      </select>

      <label for="fromDate">From</label>
      <datepicker id="fromDate" format="dd/MM/yyyy" placeholder="From date" v-model="fromDate" class="datepicker-input"></datepicker>

      <label for="toDate">To</label>
      <datepicker id="toDate" format="dd/MM/yyyy" placeholder="To date" v-model="toDate" class="datepicker-input"></datepicker>

      <button class="button" @click="submit()">Submit</button>
      <div style="margin-bottom:150px;">&nbsp;</div>
    </div>

    <div id="results" v-if="absences.length">

      <div style="font-weight:bold;margin-bottom:6px;">
        Absences <span v-if="userName != 'All'" style="font-weight:bold;">
          for {{absences[0].FirstName}} {{absences[0].Surname}}
        </span>
        {{formatJsDateForDisplay(fromDate)}} - {{formatJsDateForDisplay(toDate)}}
      </div>

      <div v-for="a in absences" :key="a.AbsenceId" class="card absence-div">
        {{formatDateForDisplay(a.AbsenceDate)}}
        <a :href="'mailto:' + a.Email" v-if="userName == 'All'"> {{a.FirstName}} {{a.Surname}}</a> -
        {{a.Reason}}
        {{a.Notes}}
        <span v-if="a.HalfDay">(Half Day)</span>

      </div>

      <div style="padding-top:10px;">
        <a href="" @click.prevent="reset()" >Search again?</a>
      </div>

    </div>

    <div v-if="noResults">No results</div>

  </div>
</template>

<script>
import Constants from '@/components/helpers/Constants'
import router from '../router/'
import Datepicker from 'vuejs-datepicker'
import Utilities from '@/components/helpers/Utilities'
import ApiInterface from '@/apiInterface'

export default {
  name: 'employee-absence',
  components:{Datepicker},
  props:{
    showAllOption:Boolean
  },
  data () {
    return {
      employees:[],
      userName:'-1',
      fromDate:'',
      toDate:'',
      absences:[],
      noResults:false
    }
  },
  methods:{
    submit: function(){
      let vm = this;
      let employee = vm.userName != "All" ? vm.userName : null
      ApiInterface.getAbsences(vm.fromDate,vm.toDate,employee)
      .then((res) => {
        vm.absences = res.data.sort((a,b) => {
          return new Date(a.AbsenceDate) - new Date(b.AbsenceDate);
        })
        vm.noResults = vm.absences.length == 0
      });
    },
    reset:function(){
      this.absences = [];
      this.userName = "-1"
      this.fromDate = ''
      this.toDate = ''
    },
    getEmployees:function(){
      let vm = this;
      ApiInterface.getEmployees()
      .then((res) => {
        vm.employees = res.data
      });
    },
    formatDateForDisplay:function(textDate){
      return Utilities.formatDateForDisplay(textDate)
    },
    formatJsDateForDisplay:function(date) {
      return Utilities.formatJsDateForDisplay(date)
    }
  },
  created: function(){
    this.getEmployees()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.absence-div {

}
.absence-date {
  font-size: .88em;
  font-style:italic;
}
</style>
