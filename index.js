// Your code here
function createEmployeeRecord(data) {
  return { 
  firstName: data[0], 
  familyName: data[1],
  title: data[2],
  payPerHour: data[3],
  timeInEvents: [],
  timeOutEvents: [],
  }
}

function createEmployeeRecords(data) {
  return data.map( function(array) {
    return createEmployeeRecord(array) 
  })
}

function createTimeInEvent(record, time) {
  let timeData = time.split(" ")
  const timeIn = {
    type: "TimeIn",
    hour: parseInt(timeData[1]),
    date: timeData[0]
  }
  record.timeInEvents.push(timeIn)
  return record
}

function createTimeOutEvent(record, time) {
  let timeData = time.split(" ")
  const timeOut = {
    type: "TimeOut",
    hour: parseInt(timeData[1]),
    date: timeData[0]
  }
  record.timeOutEvents.push(timeOut)
  return record
}

function hoursWorkedOnDate(record, date) {
  let startTime = record.timeInEvents.find(time => time.date == date).hour
  let endTime = record.timeOutEvents.find(time => time.date == date).hour
  return (endTime - startTime) / 100
}

function wagesEarnedOnDate(record, date) {
  return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(employee) {
  let allDates = employee.timeOutEvents.map(function (event) {
    return event.date
  })

  let totalWages = allDates.reduce(function (wages, date) {
    return wages + wagesEarnedOnDate(employee, date)
  }, 0)

  return totalWages
}

function calculatePayroll(employees) {
  return employees.reduce(function (payroll, employee) {
    return payroll + allWagesFor(employee)
  }, 0)
}

function findEmployeeByFirstName(employees, name) {
  return employees.find(employee => employee.firstName == name)
}