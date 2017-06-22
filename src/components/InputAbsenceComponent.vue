<template>
  <div id="input-absence">
    <div class="heading">Input Absence</div>

    <div v-if="showInputs">
      <span class="error" v-if="error.userName == true">Please select a name</span>
      <select v-model="newAbsence.userName" @change="removeError('userName')">
        <option value="-1" selected>Select Name</option>
        <option v-for="e in employees" :value="e.UserName">{{e.FirstName}} {{e.Surname}}</option>
      </select>


      <label for="fromDate">From</label>
      <span class="error" v-if="error.fromDate == true">Please enter a start date</span>
      <datepicker id="fromDate"
          format="dd/MM/yyyy"
          placeholder="From date"
          v-model="newAbsence.fromDate"
          class="datepicker-input"
          :disabled="weekendDisabled"
          @selected="disableTo">
      </datepicker>

      <label for="toDate">To</label>
      <span class="error" v-if="error.toDate == true">Please enter an end date</span>
      <datepicker id="toDate"
          format="dd/MM/yyyy"
          placeholder="To date"
          v-model="newAbsence.toDate"
          class="datepicker-input"
          :disabled="disabled"
          @selected="removeError('toDate')">
        </datepicker>

      <!-- <pre>disabled: {{ disabled }}</pre> -->

      <span class="error" v-if="error.reason == true">Please select a reason</span>
      <select v-model="newAbsence.reason" @change="removeError('reason')"> >
        <option value="-1">Select Reason</option>
        <option value="Holiday">Holiday</option>
        <option value="Shutdown">Shutdown</option>
        <option value="Sick Leave">Sick Leave</option>
        <option value="Compassionate">Compassionate</option>
        <option value="Medical">Medical</option>
        <option value="Business">Business</option>
        <option value="At Hove">At Hove</option>
        <option value="At Stone">At Stone</option>
        <option value="Unspecified">Unspecified</option>
      </select>

      <label for="notes">Notes</label>
      <textarea id="notes" cols="40" rows="3" v-model="newAbsence.notes" placeholder="Notes"></textarea>

      <div>
        <label for="halfDayChkBx">
          <span>Half day? </span>
          <input type="checkbox" id="halfDayChkBx" v-model="newAbsence.halfDay" value="1" style="display:inline-block;"/>
        </label>
      </div>
      <br/>
      <button class="button" @click="submit()">Submit</button>
      <br/><br/>
      <br/><br/>
    </div>

    <div v-if="!showInputs">

      <div>
        <p>You've booked the followings days:</p>
        <div v-for="day in daysBooked">{{formatDateForDisplay(day)}}</div>
      </div>
      <br/>
      <div v-if = "authoriser">
        An email has been sent to {{authoriser.FirstName}} {{authoriser.Surname}}
        regarding authorisation of this holiday booking.
        <br/>
      </div>
      <br/>
      <a href="" @click.prevent="showInputs=true">Input another absence?</a>
    </div>
  </div>
</template>

<script>
import Constants from '@/components/helpers/Constants'
import Utilities from '@/components/helpers/Utilities'
import router from '../router/'
import Datepicker from 'vuejs-datepicker'

export default {
  name: 'input-absence',
  components:{Datepicker},
  data () {
    return {
      showInputs:true,
      newAbsence: {
        userName: '-1',
        fromDate: '',
        toDate: '',
        reason: '-1',
        notes: '',
        halfDay: false,
      },
      error:{
        userName: 'false',
        fromDate: 'false',
        toDate: 'false',
        reason: 'false',
      },
      employees:[],
      daysBooked:[],
      authoriser:'',
      disabled: {days: [6, 0]},
      weekendDisabled:{days: [6, 0]},
    }
  },
  methods:{
    formatDateForApi:function(date){
      return Utilities.formatDateForApi(date)
    },
    formatDateForDisplay:function(date){
      return Utilities.formatDateForDisplay(date)
    },
    disableTo: function (val) {
      let vm = this;
       //console.log(val)
       if (typeof vm.disabled.to === 'undefined') {
         vm.disabled = {
           to: null,
           from: this.disabled.from,
           days: [6, 0]
         };
       }
       vm.disabled.to = val;
       vm.newAbsence.toDate = val;
       vm.removeError('fromDate')
     },
     checkForErrors() {
       let vm = this;
       let hasError = false;

       if (vm.newAbsence.userName == '-1') {
         vm.error.userName = true
         hasError = true
       }
       if (vm.newAbsence.fromDate == '') {
         vm.error.fromDate = true
         hasError = true
       }
       if (vm.newAbsence.toDate == '') {
         vm.error.toDate = true
         hasError = true
       }
       if (vm.newAbsence.reason == '-1') {
         vm.error.reason = true
         hasError = true
       }
       return hasError
     },
     removeError:function(fld){
       let vm = this;
       vm.error[fld] = false
     },
    submit:function(){
      let vm = this;

      if (vm.checkForErrors()) return

      //correct dates which are logged hour earlier
      vm.newAbsence.fromDate = vm.formatDateForApi(vm.newAbsence.fromDate)
      vm.newAbsence.toDate = vm.formatDateForApi(vm.newAbsence.toDate)

      axios.post(Constants.api + 'absences/SaveAbsence', vm.newAbsence)
      .then(res => {
        //console.log('res.data',res.data)
        vm.authoriser = res.data.authoriser
        vm.daysBooked = res.data.dates
        vm.newAbsence = {userName:'-1',fromDate:'',toDate:'',reason:'-1',notes:'',halfDay:false}
        vm.error = {userName: 'false',fromDate: 'false',toDate: 'false', reason: 'false'}
        vm.showInputs = false;
      })
    },
    getEmployees:function(){
      let vm = this;
      axios.get(Constants.api + 'users/GetUsersForSelect')
      .then((res) => {
        vm.employees = res.data
      });
    },
  },
  created: function(){
    this.getEmployees()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .error {
    color:red;
  }
</style>
