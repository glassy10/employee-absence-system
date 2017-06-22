<template>
  <div id="upcoming-absences">
    <div class="heading">Upcoming Absences</div>
    <div v-for="day in upcomingAbsences" class="card" :key="day.AbsenceID">
      <div class="uc-date">{{formatDateForDisplay(day.AbsenceDate)}}</div>
      <div v-for="a in day.Absences" :key="a.AbsenceID">
        <div class="uc-details">
          {{a.FirstName}} {{a.Surname}}
          <div class="uc-reason">({{a.Reason}}) {{a.HalfDay ? "HalfDay" : ""}} <i>{{a.Notes}}</i></div>
        </div>

      </div>
    </div>
   
    <!--<absence-card :absences="upcomingAbsences" groupBy="date"></absence-card>-->

  </div>
</template>

<script>
import Constants from '@/components/helpers/Constants'
// import AbsenceCard from '@/components/AbsenceCardComponent'
import router from '../router/'
import Utilities from '@/components/helpers/Utilities'
import Vue from 'vue';
import VueBus from 'vue-bus';
Vue.use(VueBus);

export default {
  name: 'upcoming-absences',
  // components:{
  //   AbsenceCard
  // },
  data () {
    return {
      upcomingAbsences:[],
    }
  },
  methods:{
    getUpcomingAbsences:function(){
      let vm = this;
      const today = new Date();
      const numberOfDaysToAdd = 30;
      let end = new Date();
      end.setDate(end.getDate() + numberOfDaysToAdd);

      axios.get(Constants.api + 'absences/GetAbsences?from=' + vm.formatDateForApi(today) + '&to=' + vm.formatDateForApi(end))
      .then((res) => {
        let data = res.data
        const dates = [...new Set(data.map(item => item.AbsenceDate))];
        dates.sort()
        .forEach(item => {
          let obj = {}
          obj.AbsenceDate = item
          obj.Absences = data.filter(absence => absence.AbsenceDate === item)
          vm.upcomingAbsences.push(obj)
          console.log('vm.upcomingAbsences',vm.upcomingAbsences)
        })
      });
    },
    formatDateForApi:function(date){
      return Utilities.formatDateForApi(date)
    },
    formatDateForDisplay:function(textDate){
      return Utilities.formatDateForDisplay(textDate)
    },
    formatJsDateForDisplay:function(date) {
      return Utilities.formatJsDateForDisplay(date)
    }
  },
  mounted: function(){
    this.getUpcomingAbsences()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.uc-date {
  font-size: 13px;
  font-weight:bold;
  margin-bottom:3px;
  padding:2px 4px 2px 4px;
  background:#dfdfdf;
  border-bottom:1px solid #ddd;
}
.uc-details {
  margin:0 4px 4px 8px;
}
.uc-reason {
  display:inline;
  float:right;
}
</style>
