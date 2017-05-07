lib = window.lib || {};

(function () {
  class ClockModel {
    constructor() {
      this.date = null;
      this._timezoneOffset = 2;
      this._updateTime();
      //setInterval(this._updateTime.bind(this), 1000);
      //set interval to 10msec (its enough for >60 fps :D)
      setInterval(this._updateTime.bind(this), 10);
    }

   set timezoneOffset(offset) {
      //return this._timezoneOffset;
      this._timezoneOffset = offset;
    }


    get timezoneOffset() {
    }

    get mseconds() {
      return this.date.getUTCMilliseconds();
    }

    get seconds() {
      return this.date.getUTCSeconds();
    }

    get minutes() {
      return this.date.getUTCMinutes();
    }

    get hours() {
      //return this.date.getUTCHours() + this._timezoneOffset;
      return this.date.getUTCHours() + this._zoneOffset();
    }

    // ----- private -----

    _updateTime() {
      this.date = new Date();
      $(this).trigger('change');
    }

    _zoneOffset() {
      return this._timezoneOffset;
    }
  }

  lib.ClockModel = ClockModel;
}());