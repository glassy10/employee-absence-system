export default {
    niceDate: function(date){
      //parse js date "2017-03-22T17:15:14.414Z" & return nice date
      const options = {
          weekday: "short", year: "numeric", month: "short",
          day: "numeric", hour: "2-digit", minute: "2-digit"
      };
      return date.toLocaleTimeString("en-GB", options);
    },
    formatDateForApi: function(date) {
      const dd = date.getDate();
      const month = +date.getMonth() + 1
      const mm = month < 10 ? '0' + month : month;
      const y = date.getFullYear();
      return y + '/'+ mm + '/'+ dd;
    },
    formatDateForDisplay: function(textDate) {
      //format of textDate is 2017-05-31T00:00:00
      const date = new Date(textDate)
      const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
      const day = weekday[date.getDay()];
      return day + ", " + textDate.slice(8,10) + '/' + textDate.slice(5,7) + '/' + textDate.slice(0,4)
    },
    formatJsDateForDisplay: function(date) {
      const dd = date.getDate();
      const month = +date.getMonth() + 1
      const mm = month < 10 ? '0' + month : month;
      const y = date.getFullYear();
      return dd + '/'+ mm + '/'+ y;
    },
    getCookieValue: function (a) {
      const b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
      return b ? b.pop() : '';
    },
    delete_cookie: function(name) {
      document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}
