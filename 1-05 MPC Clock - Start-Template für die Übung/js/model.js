lib = window.lib || {};

(function () {
  class ClockModel {
    constructor() {
      this.date = null;
      this._timezoneOffset = 2;
      this._updateTime();
      //setInterval(this._updateTime.bind(this), 1000); -> every second / 1th version
      //set interval to 10msec (its enough for "fluid animation")
      setInterval(this._updateTime.bind(this), 10);
    }

   set timezoneOffset(offset) {
      this._timezoneOffset = offset;
    }

    get timezoneOffset() {
      return this._timezoneOffset;
    }

    get milSeconds() {
      return this.date.getUTCMilliseconds();
    }

    get seconds() {
      return this.date.getUTCSeconds();
    }

    get minutes() {
      return this.date.getUTCMinutes();
    }

    get hours() {
      return this.date.getUTCHours() + this.timezoneOffset;
    }

    // ----- private -----

    _updateTime() {
      this.date = new Date();
      $(this).trigger('change');
    }

    /*_zoneOffset() {
      return this._timezoneOffset;
    }*/
  }

  lib.ClockModel = ClockModel;
}());