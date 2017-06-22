<template>
  <div id="absence-card">
    Grouped by: {{groupBy}}
    <div v-for="day in groupedAbsences" class="card" v-if="groupBy === 'date'">
      <div class="uc-date">{{formatDateForDisplay(day.AbsenceDate)}}</div>
      <div v-for="a in day.Absences">
        <div class="uc-details">
          {{a.FirstName}} {{a.Surname}}
          <div class="uc-reason">({{a.Reason}}) {{a.HalfDay ? "HalfDay" : ""}} <i>{{a.Notes}}</i></div>
        </div>

      </div>
    </div>

    <div v-for="employee in groupedAbsences" class="card" v-if="groupBy === 'employee'">
      <div class="uc-date">{{employee.FullName}}</div>
      <div v-for="a in employee.Absences">
        <div class="uc-details">
          {{formatDateForDisplay(a.AbsenceDate)}}
          <div class="uc-reason">({{a.Reason}}) {{a.HalfDay ? "HalfDay" : ""}} <i>{{a.Notes}}</i></div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import Utilities from '@/components/helpers/Utilities'

export default {
  name: 'absence-card',
  props: ['absences', 'groupBy'],
  data () {
      return {
          groupedAbsences:[]
      }
  },
  methods:{
    groupByDate:function(){
        console.log('groupByDate running')
      let vm = this;
      let data = vm.absences
      const dates = [...new Set(data.map(item => item.AbsenceDate))];
      console.log('dates',dates)
      dates.sort()
      .forEach(item => {
        let obj = {}
        obj.AbsenceDate = item
        obj.Absences = data.filter(absence => absence.AbsenceDate === item)
        vm.groupedAbsences.push(obj)
      })
      console.log('vm.groupedAbsences',vm.groupedAbsences)
    },
    groupByEmployee:function(){
           console.log('groupByEmployee running')
      let vm = this;
      let data = vm.absences
      const employees = [...new Set(data.map(item => item.UserName))];
      console.log('employees',employees)
      let tmpArray = []
      employees.sort()
      .forEach(item => {
        let obj = {}
        obj.UserName = item
        obj.Absences = data.filter(absence => absence.UserName === item)
        obj.FullName = obj.Absences[0].FirstName + " " + obj.Absences[0].Surname
        vm.groupedAbsences.push(obj)
        tmpArray.push(obj)
      })
      console.log('tmpArray',tmpArray)
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
      if (this.groupBy === "date") {
        this.groupByDate()
      } else if (this.groupBy === "employee"){
        this.groupByEmployee()
      }
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
