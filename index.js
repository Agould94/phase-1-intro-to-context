// Your code here
function createEmployeeRecord(empRecord){
    const employeeRecord = {
        firstName: `${empRecord[0]}`,
        familyName: `${empRecord[1]}`,
        title: `${empRecord[2]}`,
        payPerHour: empRecord[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employeeRecord
}

function createEmployeeRecords(rows){
   const employeeRecord = rows.map(row => createEmployeeRecord(row))
   return employeeRecord
}

function createTimeInEvent(bpRecord, time){
    const split = time.split(' ')
    const date = split[0]
    const t = parseInt(split[1])
    const timeIn = {
        type: "TimeIn",
        date: date,
        hour: t
    }
    bpRecord.timeInEvents.push(timeIn)
    return bpRecord
}

function createTimeOutEvent(record, time){
    const split = time.split(' ')
    const date = split[0]
    const t = parseInt(split[1])
    const timeOut = {
        type: "TimeOut",
        date: date,
        hour: t
    }
    record.timeOutEvents.push(timeOut)
    return record
    
}

function hoursWorkedOnDate(record, date){
    const timeIn = record.timeInEvents.find(e => e.date === date)
    const timeOut = record.timeOutEvents.find(e => e.date === date) 
    const hrs = (timeOut.hour - timeIn.hour)/100
    return hrs
}

function wagesEarnedOnDate(record, date){
    const hrs = hoursWorkedOnDate(record, date)
    const wages = record.payPerHour * hrs
    
    return wages
}

function allWagesFor(record){
    let d = record.timeInEvents.map(e => e.date)
    let w = d.map(date =>  wagesEarnedOnDate(record, date))
    const reducer = (a, b) => a+b;
    const wages = w.reduce(reducer, 0)
    return wages
    
}

function calculatePayroll(employees){
    const allWages = employees.map(e=> allWagesFor(e))
    const reducer = (a, b) => a+b;
    const payRoll = allWages.reduce(reducer, 0)
    console.log(payRoll)
    return payRoll
}