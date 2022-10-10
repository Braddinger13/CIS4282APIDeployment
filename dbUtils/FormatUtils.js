const formatUtils = {}

// formatting birthdays before sending result
formatUtils.formatBday = function (bday) {
    var day = bday.getDate().toString();
    if (day.length < 2) {
      day = "0" + day;
    }
  
    var month = (bday.getMonth() + 1).toString();
    if (month.length < 2) {
      month = "0" + month;
    }
  
    var year = bday.getFullYear().toString();
  
    return month + "/" + day + "/" + year;
  }

//Formatting membership fee before sending the result
formatUtils.formatCurrency = function (currency) {
    var newCurrency = "$" + currency;
    return newCurrency;
}

module.exports = formatUtils