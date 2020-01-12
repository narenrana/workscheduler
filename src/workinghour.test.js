const expect    = require("chai").expect;
const workinghours = require("./workinghour");

describe("Scheduler Tests for all days", function() {

  const schedule= [
        {"open": false, "open_at": "", close_at: ""}, // sunday
        {"open": true, "open_at": "09:40", close_at: "18:00"}, // monday
        {"open": true, "open_at": "09:00", close_at: "18:00"},
        {"open": true, "open_at": "09:00", close_at: "18:00"},
        {"open": true, "open_at": "09:00", close_at: "18:00"},
        {"open": true, "open_at": "09:00", close_at: "17:00"},
        {"open": true, "open_at": "09:00", close_at: "17:00"},
    ];

  const sampleWeekDays= [
        { given: "Jan 11 2020 16:00:00 GMT+0800 (Singapore Standard Time)", expected: "Mon Jan 13 2020 11:40:00 GMT+0800 (Singapore Standard Time)"},
        { given: "Jan 12 2020 15:00:00 GMT+0800 (Singapore Standard Time)", expected: "Mon Jan 13 2020 12:40:00 GMT+0800 (Singapore Standard Time)"},
        { given: "Jan 13 2020 15:00:00 GMT+0800 (Singapore Standard Time)", expected: "Mon Jan 13 2020 18:00:00 GMT+0800 (Singapore Standard Time)"},
        { given: "Jan 14 2020 14:00:00 GMT+0800 (Singapore Standard Time)", expected: "Mon Jan 14 2020 17:00:00 GMT+0800 (Singapore Standard Time)"},
        { given: "Jan 15 2020 14:00:00 GMT+0800 (Singapore Standard Time)", expected: "Jan 15 2020 17:00:00 GMT+0800 (Singapore Standard Time)"},
        { given: "Jan 16 2020 15:00:00 GMT+0800 (Singapore Standard Time)", expected: "Jan 16 2020 18:00:00 GMT+0800 (Singapore Standard Time)"},
        { given: "Jan 17 2020 14:00:00 GMT+0800 (Singapore Standard Time)", expected: "Jan 17 2020 17:00:00 GMT+0800 (Singapore Standard Time)"},
        { given: "Jan 18 2020 15:00:00 GMT+0800 (Singapore Standard Time)", expected: "Jan 20 2020 10:40:00 GMT+0800 (Singapore Standard Time)"},

  ]

    sampleWeekDays.forEach(data => {

     it("Scheduled time for "+data.given +" should be "+ data.expected  , function () {
        const result=workinghours.find(new Date( data.given),schedule)
         expect(result.toLocaleString()).to.equal(new Date(data.expected).toLocaleString());
      });


    });


});