lib = window.lib || {};

(function () {

    class TimezoneView {
        constructor(model, $elem) {
            this.model = model;
            this.$elem = $elem;
            this.render();
            $(model).on('timezoneChange', this.render.bind(this));
        }

        render() {
            let offset = this.model._timezoneOffset;
            if (offset > 0) offset = "+" + offset;
            this.$elem.html("Current Timezone: UTC " + offset);
        }
    }

    /* ------------------ ANALOG VIEW ---------------- */
    class AnalogView {
        constructor(model, $secPointer, $minPointer, $hourPointer) {
            this.model = model;
            this.$secPointer = $secPointer;
            this.$minPointer = $minPointer;
            this.$hourPointer = $hourPointer;
            $(model).on('change', this.render.bind(this));
        }

        render() {
            let $sec = this.model.milSeconds / 1000 + this.model.seconds;
            let $secDeg = `rotate(${$sec * 6}deg)`;

            let $min = $sec / 60 + this.model.minutes;
            let $minDeg = `rotate(${$min * 6}deg)`;

            let $hour = $min / 60 + this.model.hours;
            let $hourDeg = `rotate(${$hour * 30}deg)`;

            this.$secPointer.css('transform', $secDeg);
            this.$minPointer.css('transform', $minDeg);
            this.$hourPointer.css('transform', $hourDeg);
        }
    }


    /* ------------------ DIGITAL VIEW ---------------- */
    class DigitalView {
        constructor(model, $elem) {
            this.model = model;
            this.$elem = $elem;
            this.$twelveHMode = true;
            $(model).on('change', this.render.bind(this));

            let that = this;
            $(model).on('modeChange', function () {
                that.$twelveHMode = !that.$twelveHMode;
            })
        }

        render() {

            let currentHour = this.model.hours;
            let daytime = "";

            //12h/24h-Mode Handling
            if (this.$twelveHMode == true) {
                daytime = "AM";
                if (currentHour >= 12) daytime = "PM";  //????
                currentHour = currentHour % 12;
            }

            //timezoneoffset-overflow Handling
            if (currentHour >= 24) currentHour -= 24;
            if (currentHour < 0) currentHour += 24;

            currentHour = checkTime(currentHour);

            let currentMinute = this.model.minutes;
            currentMinute = checkTime(currentMinute);

            let currentSecond = this.model.seconds;
            currentSecond = checkTime(currentSecond);

            this.$elem.html("<span class='digHour'>" + currentHour + ":</span><span class='digMinute'>" + currentMinute + ":</span>" +
                "<span class='digSecond'>" + currentSecond + "</span><span class='daytime'>" + daytime + "</span>");


            /**inline Function: checkTime
             * if a 0 is need in front of the current Time, it's going to be added
             * @param i
             * @returns time in the right formation for html view
             */
            function checkTime(i) {
                if (i < 10) i = "0" + i;  // add zero in front of numbers < 10
                return i;
            }
        }
    }

    lib.TimezoneView = TimezoneView;
    lib.LogView = AnalogView;
    lib.DigitalView = DigitalView;
}());