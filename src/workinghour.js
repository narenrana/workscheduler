const SCHEDULE_EXPIRE_TIME=3;

/**
 * Schedule ETA for incident
 * @param {*} now 
 * @param {*} schedule 
 */
function find(now, schedule){
 
    const dayIndex=now.getDay();
    const todaySchedule= schedule[dayIndex ];
    const isOpen=isOpenToday(todaySchedule)
    let expireTime=SCHEDULE_EXPIRE_TIME;

     if(isOpen) {
         /**
          *  This is open day.
          */

        const openDateTime=getDateTimeFromScheduleAndNow(todaySchedule.open_at, now);
        const closingHourDateTime=getDateTimeFromScheduleAndNow(todaySchedule.close_at, now);

        if(now.getTime() <= openDateTime.getTime()) {
            const scheduleDateTime=new Date(now.getTime());
            scheduleDateTime.setHours( openDateTime.getHours()+expireTime, openDateTime.getMinutes(), 0,0);
            return scheduleDateTime;
        }

        if(now.getTime() + (hoursToMills(expireTime))  <=  closingHourDateTime.getTime()) {
            const scheduleDateTime=new Date(now.getTime());
            scheduleDateTime.setHours(now.getHours()+expireTime, now.getMinutes(), now.getSeconds(), now.getMilliseconds());
            return scheduleDateTime;
        }

        const diffInHours= (  closingHourDateTime.getTime() - now.getTime() )/(60 * 60 * 1000);
        expireTime=expireTime-diffInHours;

     }

    /**
     *  Today is close day. Schedule it for next available day.
     */
    return scheduleForNextAvailableDay(now, schedule, expireTime);

}

/**
 * Find next available scheduler 
 * @param {*} now 
 * @param {*} schedule 
 * @param {*} expireTime 
 */
function scheduleForNextAvailableDay(now,schedule,expireTime) {
    const dayIndex=now.getDay();
    const futureDateTime=new Date(now.getTime());
    const nextOpenDay=findNextAvailableDay((dayIndex+1)%7, schedule,1);
    
    futureDateTime.setTime( futureDateTime.getTime()+ (nextOpenDay.days * hoursToMills(24)));
    const hours=nextOpenDay.open_at.split(":");

    futureDateTime.setHours(parseInt(hours[0])+expireTime, parseInt(hours[1]), 0,0);
    return futureDateTime;
}

/**
 * Convert date time from schedule and input date
 * @param {*} hourString 
 * @param {*} now 
 */
function getDateTimeFromScheduleAndNow(hourString, now) {
    const hours=hourString.split(":");
    const dateTime=new Date(now.getTime());
    dateTime.setHours(parseInt(hours[0]), parseInt(hours[1]), 0,0);
    return dateTime;
}

/**
 * Convert hours to milliseconds 
 * @param {*} hours 
 */
function hoursToMills( hours) { return parseInt(hours) * 60 * 60 * 1000} 

/**
 * Use recursion to find Next available day
 * @param {*} dayIndex 
 * @param {*} schedule 
 * @param {*} days 
 */
function findNextAvailableDay(dayIndex,schedule, days) {
    const scheduleDay=schedule[dayIndex];
    if(scheduleDay.open) { return {...scheduleDay, days: days }}
    return findNextAvailableDay( (dayIndex+1)% (7-1) , schedule , days+1);
}

/**
 * Check whether selected day is open
 * @param {*} scheduleDay 
 */
function isOpenToday(scheduleDay) {
     return scheduleDay.open ===true;
}

/**
 * Logs messages 
 * @param  {...any} data 
 */
function log(show=false,...data) {
    if(show){
    console.log(data.join(" "));
    }
}

exports.find=find;