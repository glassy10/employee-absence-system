
import Constants from '@/components/helpers/Constants'
import Utilities from '@/components/helpers/Utilities'

export default {
    getAbsences: (from,to,employee) => {
      let query = 'absences/GetAbsences?from=' + Utilities.formatDateForApi(from) +'&to=' + Utilities.formatDateForApi(to)
      if (employee) {
        query += '&user=' + employee
      }
      return axios.get(Constants.api + query)
    },

    getEmployees: () => {
      return axios.get(Constants.api + 'users/GetUsersForSelect')
    },

    getUnauthorisedAbsences: (from,to,employee) => {
      let query = 'absences/GetUnauthorisedAbsences?' + 
      'from=' + Utilities.formatDateForApi(from) +
      '&to=' + Utilities.formatDateForApi(to) + 
      '&user=' + employee
      return axios.get(Constants.api + query)
    },

    saveAbsence: (absence) => {
      //correct dates which are logged hour earlier
      absence.fromDate = Utilities.formatDateForApi(absence.fromDate)
      absence.toDate = Utilities.formatDateForApi(absence.toDate)

      return axios.post(Constants.api + 'absences/SaveAbsence', absence)
    },

    authoriseAbsences: (absenceIds,authoriser) => {
      return axios.post(Constants.api + 'absences/AuthoriseAbsences', 
        {
          absenceIds: absenceIds,
          authoriser: authoriser
        }
      )
    },
    login: (user) => {
      console.log('user',user)
      return axios.post(Constants.api + 'users/login', user)
    }
  

}
