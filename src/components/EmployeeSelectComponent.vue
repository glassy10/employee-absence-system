<template>
  <div id="employee-select">

      <select v-model="selectedEmployee" @change="employeeSelected()">
        <option value="-1" selected>Select Name</option>
        <option v-for="e in employees" :value="e.UserName">{{e.FirstName}} {{e.Surname}}</option>
      </select>

  </div>
</template>

<script>
import Constants from '@/components/helpers/Constants'

export default {
  name: 'employee-select',
  data () {
    return {
      employees:[],
      selectedEmployee:''
    }
  },
  methods:{
    getEmployees:function(){
      let vm = this;
      axios.get(Constants.api + 'users/GetUsersForSelect')
      .then((res) => {
        vm.employees = res.data
      });
    },
    employeeSelected:function(){
      this.$emit(selectedEmployee)
    }
  },
  created: function(){
    this.getEmployees()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
