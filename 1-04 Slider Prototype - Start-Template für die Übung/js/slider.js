lib = window.lib || {};

//----------------------------------- Library  ------------------------------------

(function (lib) {

//------------------------------------ Slider Component  ---------------------------

  class Slider {
    constructor({ min, max, value = 0, view, thumb, track, document }) { // {min: 0, max: 10, value: 100} {

      this.$min = min;
      this.$max = max;
      this._$view = view;
      this._$thumb = thumb;
      this._$track = track;
      this._$document = document;

      // init the state machine
     this._$view.on('mousedown', this._onMouseDown.bind(this));

      //set start value;
      this.value = value;      //this.value = this._value;
    };

    //-------------------------- public --------------------------------------------

    get value() {
      return this._value;
    };

    set value(v) {
      if (v === this._value)
        return; // nothing has changed – do nothing

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
      this._$thumb.css('left', this._valueToPosition(v));

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

        //compute range of values in slider
        let range = this.$max - this.$min;
        let rangeInPixel = this._$track.width() - this._$thumb.width();
        //prevent negativ percentage bug (min-value zb. -1)
        let valueChangeToPos = Math.abs(this.$min) + value;
        let valueInPercent = (valueChangeToPos / range) * 100;
        return (valueInPercent * rangeInPixel) / 100;
    };

    /**
     *
     * @param position
     * @returns inverse function to _valueToPosition
     * @private
     */
    _positionToValue(position) {
      let newPosition = position - this._$track.offset().left - this._$thumb.width() / 2;
      newPosition = Math.max(0, newPosition);
      let range = this.$max - this.$min;
      let rangeInPixel = this._$track.width() - this._$thumb.width();
      let positionInPercent = (newPosition / rangeInPixel) * 100;
      return ((positionInPercent * range) / 100) + this.$min;
    };

    /**
     *
     * @param value
     * @returns {boolean} it value is in range
     * @private
     */
    _inRange(value){
      return ( value > this.$min && value <= this.$max);
    };



    //-------------------------- event handlers -------------------------------------

    _onMouseDown(e) {

      let $this = this;
      let dragOffsetX;

      if(e.target == this._$thumb[0]){
        //click on thumb: keep the distance between thumb and mouse
        //difference thumb to left-page-boarder
        dragOffsetX = e.pageX - this._$thumb.offset().left;

        //set new value
        this.value = this._positionToValue(e.pageX);
      }

      else if (e.target == this._$track[0]){
        //click on Track
        dragOffsetX = this._$thumb.width() / 2;

        //move thumb via setter
        this.value = $this._positionToValue(e.pageX - dragOffsetX);
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

//-------------------------- Expose Constructor function  ---------------------------

  lib.Slider = Slider;

}(window.lib));