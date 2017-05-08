lib = window.lib || {};

//----------------------------------- Library  ------------------------------------

(function (lib) {

//------------------------------------ Slider Component  ---------------------------

  class Slider {
    constructor({ min = 0, max = 1, value = 0, view, thumb, track, document }) { // {min: 0, max: 10, value: 100} {

      this.$min = min;
      this.$max = max;
     // this.value = value;
      this._$view = view;
      this._$thumb = thumb;
      this._$track = track;
      this._$document = document;

      // init the state machine
     this._$view.on('mousedown', this._onMouseDown.bind(this));
      //console.log(_$view);
      //_$view.on('mousedown', this._onMouseDown.bind(this));
      //this.value = this._value;
      this.value = value;

    };


    //-------------------------- public --------------------------------------------

    get value() {
      return this._value;
    };

    set value(v) {
      if (v === this._value)
        return; // nothing has changed – do nothing


      //TODO :limit value to the range between min and max
      //v = Math.min(Math.max(v, this._minValue), this._maxValue);
      if(v <= this.$min) {
        this._value = this.$min;
      }
      else if (v >= this.$max){
        this._value = this.$max;
      }
      else {
        // set the backing field
        this._value = v;
      }


      // update the thumb's position
      this._$thumb.addClass('horizontalTranslate');
      this._$thumb.css('left', this._valueToPosition(v)); // TODO: implement _valueToPosition

      // notify observers
      $(this).trigger('change'); // we have to wrap ourself in a jquery obj to get access to the trigger method. listeners mus do the same to subscribe to the event.
    };


    //-------------------------- private --------------------------------------------

    /**
     *
     * @param value The value in the range between min and max
     * @returns The thumb's position ('left' property) in pixels
     * @private
     */
    _valueToPosition(value) {
      // TODO implement

     // debugger;

        //convert value in the 'percentage' it has in relevance to the range

        let range = this.$max - this.$min;

        let rangeInPixel = this._$track.width() - this._$thumb.width();

        let valueInPercent = (value / range) * 100;

        return (valueInPercent * rangeInPixel) / 100;

        //let thumbPosition = (valueInPercent * rangeInPixel) / 100;
        //return thumbPosition;

        /*
        if(value == this.$min){
          thumb = 0;
        }
        if(value == this.$max) {
          thumb = this._$thumb.width();
        }
        //checks which percentage the value's percentage would be for the track
        return Math.abs((this._$track.width()) * valueRelevance) - thumbDivTwo;*/
    };

    /**
     *
     * @param position
     * @returns inverse function to _valueToPosition
     * @private
     */
    _positionToValue(position) {
      //let pos = position - this._$view.offset().left - this._$thumb.width() / 2;
      // how much percent is the position of the track
      //(pos)/(this._$track.width() -this._$thumb.width());

      //debugger;

      let newPosition = position - this._$track.offset().left - this._$thumb.width() / 2;
      newPosition = Math.max(0, newPosition);

     // let thumbDivTwo = this._$thumb.width() / 2;

      let rangeInPixel = this._$track.width() - this._$thumb.width();
      let range = (this.$max - this.$min);

      let positionInPercent = (newPosition / rangeInPixel) * 100;

      return ((positionInPercent * range) / 100) + this.$min;

      //let value = ((positionInPercent * range) / 100) + this.$min;
      //return value;
    };


    _inRange(value){
      //return true = if in range
      return ( value > this.$min && value <= this.$max);
    }



    //-------------------------- event handlers -------------------------------------


    _onMouseDown(e) {
      // TODO get the code from our presence training's achievements an port it to the class
      // Tip 1: you must convert the local vars of the 'outer' scope (i.e. the callback function to jquerys 'each'
      // iteration into properties of class Slider.
      // Tip 2: For the sake of brevity, you can implement the other mouse event handlers as inner functions to this method

      let $this = this;
      let dragOffsetX;

      if(e.target == this._$thumb[0]){
        //1.Fall: click on thumb: keep the distance between thumb and mouse

        //differenz thumb zum äußeren rand
        dragOffsetX = e.pageX - this._$thumb.offset().left;

        //set new value
        this.value = this._positionToValue(e.pageX);
      }

      else if (e.target == this._$track[0]){
        //click on Track
        dragOffsetX = this._$thumb.width() / 2;

        //move thumb via setter
        $this.value = $this._positionToValue(e.pageX);
      }


      this._$view.addClass('active');
      this._$document.on('mousemove', onMouseMove);
      this._$document.one('mouseup', onMouseUp);
      e.preventDefault();


      function onMouseUp (e) {
        $this._$view.removeClass('active');
        $this._$document.off('mousemove', onMouseMove);
        e.preventDefault();
      }

      function onMouseMove(e) {

        //Remove Transition Class - so thumb-position is the same as mousepointer-position
        $this._$thumb.removeClass('horizontalTranslate');

        let curValue = $this._positionToValue(e.pageX);

        if ($this._inRange(curValue)) {
          $this._$thumb.css('left', (e.pageX - $this._$track.offset().left - dragOffsetX));
          //update Position
          $this.value = $this._positionToValue(e.pageX);
        }
        e.preventDefault();
      }
    };
  }
/*
        //crop move area
        let position = $this._$track.position();
        let sliderWidth = $this._$track.width();
        let minX = position.left;
        let maxX = minX + sliderWidth;
        let thumbOffset = $this._$thumb.width() / 2;


        let finalPositionMin = e.pageX - $this._$track.offset().left - thumbOffset;
        let finalPositionMax = e.pageX - $this._$track.offset().left + thumbOffset;

        //TEST AREA
        console.log(position);
        console.log(sliderWidth);
        console.log(minX);
        console.log(maxX);
        //console.log(finalPosition);
        console.log($this._$track.offset().left - dragOffsetX);

        //If within the slider's width, follow it along
        /* if (finalPositionMin >= minX && finalPositionMax <= maxX) {
          $this._$thumb.css('left', e.pageX - $this._$track.offset().left - dragOffsetX);
        }

        if ($this._valueToPosition($this.$min) >= minX && $this._valueToPosition($this.$max) <= maxX) {
          $this._$thumb.css('left', e.pageX - $this._$track.offset().left - dragOffsetX);
        }*/


      /*function updateThumbPosition(pageX) {
        //console.log(dragOffsetX);
        let position = pageX - $this._$track.offset().left - dragOffsetX;

        $this.value = $this._positionToValue(position);

        $this._$thumb.addClass('horizontalTranslate');
        //$this._$thumb.css('transform', 2s);
        $this._$thumb.css('left', position);


        //$this.value = this._positionToValue(e.pageX - this._$view.offset().left - thumbDivTwo);


        /*let currentValue = $this._positionToValue(position);
        console.log(currentValue);
        $(".label-value").html(currentValue);
      }*/

//-------------------------- Expose Constructor function  ---------------------------

  lib.Slider = Slider;

}(window.lib));