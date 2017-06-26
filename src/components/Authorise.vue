<template>
  <div class="authorise">
   
    <div v-if="unauthorisedAbsences">
      <div class="heading">Unauthorised Absences for {{unauthorisedAbsences[0].FirstName}} {{unauthorisedAbsences[0].Surname}}</div>
      <table >
        <tr>
          <th></th>
          <th>Authorise?</th>
        </tr>
        <tr v-for="a in unauthorisedAbsences">
          <td style="vertical-align:top;">{{formatDateForDisplay(a.AbsenceDate)}}</td>
          <td><input type="checkbox" style="vertical-align:middle;margin-top:3px;margin-left:20px;" v-model= "a.Auth"/></td>
        </tr>
      </table>
      <button class="button" @click="authorise()">Authorise</button>
    </div>

    <div v-if="!unauthorisedAbsences">No unauthorised absences found</div>
  </div>
</template>

<script>
import ApiInterface from '@/apiInterface'
import router from '../router/'
import Constants from '@/components/helpers/Constants'
import Utilities from '@/components/helpers/Utilities'

export default {
  name: 'Authorise',
  components:{
    router
  },
  data () {
    return {
      userName: this.$route.params.userName,
      unauthorisedAbsences:[],    
    }
  },
  methods:{
    getUnauthorisedAbsences: function() {
      let vm = this;
      //get employees unauthorised absences
      let fromDate = new Date()
      const numberOfDaysToAdd = 730;
      let toDate = new Date();
      toDate.setDate(toDate.getDate() + numberOfDaysToAdd);
    
      ApiInterface.getUnauthorisedAbsences(fromDate,toDate,vm.userName)
      .then((res) => {
        console.log('res.data',res.data)
        vm.unauthorisedAbsences = res.data.sort((a,b) => {
          return new Date(a.AbsenceDate) - new Date(b.AbsenceDate);
        })
      });
    },
    authorise: () => {
      let vm = this;
      //return array of authorised dates
      let authoriser = ''
      let absenceIds = []
      console.log('vm.unauthorisedAbsences',vm.unauthorisedAbsences)


      ApiInterface.authoriseAbsences(absenceIds,authoriser)
      .then((res)=>{
        console.log(res.data)
      })

    },
    formatDateForDisplay: (textDate) => {
      return Utilities.formatDateForDisplay(textDate)
    },
    formatJsDateForDisplay: (date) => {
      return Utilities.formatJsDateForDisplay(date)
    }
  },
  created: function(){
    this.getUnauthorisedAbsences()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
