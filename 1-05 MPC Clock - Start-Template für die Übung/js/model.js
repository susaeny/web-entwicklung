lib = window.lib || {};

(function () {
    class ClockModel {
        constructor(button, mode) {
            this.date = null;
            this._updateTime();
            //set interval to 10msec (its enough for "fluid animation")
            setInterval(this._updateTime.bind(this), 10);

            //set timezoneOffset to "Default" -> MEZ
            this._timezoneOffset = 2;

            this.buttons = button;
            this.mode = mode;
            this.buttonAdd = this.buttons[0];
            this.buttonSubstract = this.buttons[1];

            // ------ CLICK - HANDLER -------
            //initialize Clickhandler for timezone +/- Buttons
            let that = this;
            this.buttons.each(function () {
                $(this).on('click', function (e) {
                    that._changeTimezone(this);
                    e.preventDefault();
                });
            });

            //Clickhandler for 12h/14h-Mode
            this.mode.on('click', this._updateMode.bind(this));
        }

        set timezoneOffset(offset) {
            this._timezoneOffset = offset;
            this._updateTime();
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

        _updateMode() {
            $(this).trigger('modeChange');
        }

        _changeTimezone(btn) {
            if (btn.name == "add" && this._timezoneOffset <= 12) {
                this._timezoneOffset++;
                this.timezoneOffset = this._timezoneOffset;
            } else if (btn.name == "substract" && this._timezoneOffset >= -11) {
                this._timezoneOffset--;
                this.timezoneOffset = this._timezoneOffset;
            }

            //disable buttons if TimezoneOffset-Limit reached +12/-12
            if (this._timezoneOffset >= 12) {
                this.buttonAdd.setAttribute("disabled", "true");
            } else {
                this.buttonAdd.removeAttribute("disabled");
            }
            if (this._timezoneOffset == -11) {
                this.buttonSubstract.setAttribute("disabled", "true");
            } else {
                this.buttonSubstract.removeAttribute("disabled");
            }

            $(this).trigger('timezoneChange');
        }
    }

    lib.ClockModel = ClockModel;
}());