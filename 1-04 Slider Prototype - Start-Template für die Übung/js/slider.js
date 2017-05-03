lib = window.lib || {};

//----------------------------------- Library  ------------------------------------

(function (lib) {

//------------------------------------ Slider Component  ---------------------------

  class Slider {
    constructor({ min = 0, max = 1, value = 0, view, thumb, track, document }) { // {min: 0, max: 10, value: 100} {

      // TODO: store the constructor args

      this.$min = min;
      this.$max = max;
      this._value = value;
      this._$view = view;
      this._$thumb = thumb;
      this._$track = track;
      this._$document = document;
      //let dragOffsetX;

      // init the state machine
     this._$view.on('mousedown', this._onMouseDown.bind(this));
      //console.log(_$view);
      //_$view.on('mousedown', this._onMouseDown.bind(this));
      this.value = this._value;
    };


    //-------------------------- public --------------------------------------------

    get value() {
      return this._value;
    };

    set value(v) {
      if (v === this.value)
        return; // nothing has changed – do nothing

      // TODO: limit value to the range between min and max

      // set the backing field
      this._value = v;

      // update the thumb's position
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
    };

    /**
     *
     * @param position
     * @returns inverse function to _valueToPosition
     * @private
     */
    _positionToValue(position) {
      // TODO implement
    };

    //-------------------------- event handlers -------------------------------------

    _onMouseDown(e) {
      // TODO get the code from our presence training's achievements an port it to the class
      // Tip 1: you must convert the local vars of the 'outer' scope (i.e. the callback function to jquerys 'each'
      // iteration into properties of class Slider.
      // Tip 2: For the sake of brevity, you can implement the other mouse event handlers as inner functions to this method
      console.log(e.pageX);
      console.log(this._$track);
      console.log(this._$document);

      let $this = this;
      let dragOffsetX;


      if(e.target == this._$thumb[0]){
        //1.Fall: click on thumb: keep the distance between thumb and mouse
        //differenz thumb zum äußeren rand
        dragOffsetX = e.pageX - this._$thumb.offset().left;
      }
      else if (e.target == this._$track[0]){
        console.log("track clicked!");
        //mouseDown on Track
        dragOffsetX = this._$thumb.width() / 2;
        //move thumb
        updateThumbPosition(e.pageX);
      }

      this._$view.addClass('active');
      this._$document.on('mousemove.this._$view', onMouseMove);
      //Beim ersten mal wenn event, kommt es weg
      this._$document.one('mouseup', onMouseUp);

      //*$document.on('mousemove.slider', onMouseMove);
      e.preventDefault();

      function onMouseUp (e) {
        console.log('up');
        $this._$view.removeClass('active');
        //e.preventDefault();
      }

      function onMouseMove(e) {
        console.log('move');

        //COPY!!
        let position = $this._$track.position();
        let sliderWidth = $this._$view.width();
        let minX = position.left;
        let maxX = minX + sliderWidth;

        let finalPosition = e.pageX - $this._$track.offset().left - dragOffsetX;

        //TEST AREA
        console.log(position);
        console.log(sliderWidth);
        console.log(minX);
        console.log(maxX);
        console.log(finalPosition);
        console.log($this._$track.offset().left - dragOffsetX);

        //If within the slider's width, follow it along
        if (finalPosition >= minX && finalPosition <= maxX) {
          $this._$thumb.css('left', e.pageX - $this._$track.offset().left - dragOffsetX);
        }
        //console.log('move');
        e.preventDefault();
      }

      function updateThumbPosition(pageX) {
        let position = pageX - $this._$track.offset().left - dragOffsetX;

        $this._$thumb.css('left', position);
      }
    };
  }

//-------------------------- Expose Constructor function  ---------------------------

  lib.Slider = Slider;

}(window.lib));