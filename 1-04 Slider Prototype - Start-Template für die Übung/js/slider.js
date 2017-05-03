lib = window.lib || {};

//----------------------------------- Library  ------------------------------------

(function (lib) {

//------------------------------------ Slider Component  ---------------------------

  class Slider {
    constructor({ min = 0, max = 1, value = 0, view, }) { // {min: 0, max: 10, value: 100} {

      // TODO: store the constructor args

      let $min = min;
      let $max = max;
      let $value = value;
      const _$view = view;
      const _$track = _$view.find('.track');
      const _$thumb = _$view.find('.thumb');
      const _$document = $(document);
      let dragOffsetX;

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

      if(e.target == this._$thumb[0]){
        //1.Fall: click on thumb: keep the distance between thumb and mouse
        //differenz thumb zum äußeren rand
        dragOffsetX = e.pageX - $thumb.offset().left;
      }
      else if (e.target == _$track[0]){
        //mouseDown on Track
        dragOffsetX = _$thumb.width() / 2;
        //TODO move the thumb
        updateThumbPosition(e.pageX);
      }

      $slider.addClass('active');
      $document.on('mousemove.slider', onMouseMove);
      //Beim ersten mal wenn event, kommt es weg
      $document.one('mouseup.slider', onMouseUp);

      //*$document.on('mousemove.slider', onMouseMove);
      e.preventDefault();


      function onMouseUp (e) {
        console.log('up');
        $slider.removeClass('active');
        $document.off('mousemove.slider', onMouseMove);

      }

      function onMouseMove(e) {
        console.log('move');
        $thumb.css('left', e.pageX - $track.offset().left - dragOffsetX);
        e.preventDefault();
      }

      function updateThumbPosition(pageX) {
        let position = pageX - $track.offset().left - dragOffsetX;

        $thumb.css('left', position);
      }
    };
  }

//-------------------------- Expose Constructor function  ---------------------------

  lib.Slider = Slider;

}(window.lib));