"use strict";

function getNthDayOf(n, day, month, year) {
  var firstOfMonth = new Date(Date.parse(month + "/1/" + year + " GMT"));

  var dayOffset = firstOfMonth.getUTCDay() - day;
  if (dayOffset > 0) {
    dayOffset = 7 - dayOffset;
  } else {
    dayOffset = -dayOffset;
  }
  var initialDay = firstOfMonth.getUTCDate() + dayOffset;

  var finalDay = initialDay + 7 * (n - 1);
  return new Date(Date.parse(month + "/" + finalDay + "/" + year + " GMT"));
}

function getLastDayOf(day, month, year) {
  var firstOfDay = getNthDayOf(1, day, month, year).getUTCDate();
  var daysInMonth = new Date(year, month, 0).getUTCDate() - 7;

  var lastOfDay = firstOfDay;
  while (lastOfDay <= daysInMonth) {
    lastOfDay += 7;
  }

  return new Date(Date.parse(month + "/" + lastOfDay + "/" + year + " GMT"));
}

function allFederalHolidaysForYear() {
  var year = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date().getFullYear();
  var shiftSaturdays = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var shiftSundays = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var holidays = [];

  holidays.push({
    name: "New Year's Day",
    date: new Date(Date.parse("1/1/" + year + " GMT"))
  });

  holidays.push({
    name: "Birthday of Martin Luther King, Jr.",
    date: getNthDayOf(3, 1, 1, year)
  });

  holidays.push({
    name: "Washington's Birthday",
    date: getNthDayOf(3, 1, 2, year)
  });

  holidays.push({
    name: "Memorial Day",
    date: getLastDayOf(1, 5, year)
  });

  holidays.push({
    name: "Independence Day",
    date: new Date(Date.parse("7/4/" + year + " GMT"))
  });

  holidays.push({
    name: "Labor Day",
    date: getNthDayOf(1, 1, 9, year)
  });

  holidays.push({
    name: "Columbus Day",
    date: getNthDayOf(2, 1, 10, year)
  });

  holidays.push({
    name: "Veterans Day",
    date: new Date(Date.parse("11/11/" + year + " GMT"))
  });

  holidays.push({
    name: "Thanksgiving Day",
    date: getNthDayOf(4, 4, 11, year)
  });

  holidays.push({
    name: "Christmas Day",
    date: new Date(Date.parse("12/25/" + year + " GMT"))
  });

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = holidays[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var holiday = _step.value;

      var dow = holiday.date.getUTCDay();

      if (dow == 0) {
        if (shiftSundays) {
          holiday.date = new Date(Date.UTC(holiday.date.getUTCFullYear(), holiday.date.getUTCMonth(), holiday.date.getUTCDate() + 1));
        }
      } else if (dow == 6) {
        if (shiftSaturdays) {
          holiday.date = new Date(Date.UTC(holiday.date.getUTCFullYear(), holiday.date.getUTCMonth(), holiday.date.getUTCDate() - 1));
        }
      }

      holiday.dateString = holiday.date.getUTCFullYear() + "-" + (holiday.date.getUTCMonth() + 1) + "-" + holiday.date.getUTCDate();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return holidays;
}

function isAHolidayBase(year, month, day) {
  var shiftSaturdays = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var shiftSundays = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

  var isHoliday = false;

  var allForCurrentYear = allFederalHolidaysForYear(year, shiftSaturdays, shiftSundays);
  var allForNextYear = allFederalHolidaysForYear(year + 1, shiftSaturdays, shiftSundays);
  var allForYear = allForCurrentYear.concat(allForNextYear[0]);

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = allForYear[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var holiday = _step2.value;

      if (holiday.date.getUTCMonth() == month && holiday.date.getUTCDate() == day) {
        isHoliday = true;
        break;
      }
      if (holiday.date.getUTCMonth() > month) {
        break;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return isHoliday;
}

function isAHoliday() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var shiftSaturdays = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var shiftSundays = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDate();
  return isAHolidayBase(year, month, day, shiftSaturdays, shiftSundays);
}

function isAHolidayUTC() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var shiftSaturdays = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var shiftSundays = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var year = date.getUTCFullYear();
  var month = date.getUTCMonth();
  var day = date.getUTCDate();
  return isAHolidayBase(year, month, day, shiftSaturdays, shiftSundays);
}

module.exports = {
  isAHoliday: isAHoliday,
  isAHolidayUTC: isAHolidayUTC,
  allForYear: allFederalHolidaysForYear
};