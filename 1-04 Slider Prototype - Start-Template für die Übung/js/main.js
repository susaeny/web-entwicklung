(function (lib) {

  var Slider = lib.Slider; // import the Slider class

  // iterate over all ".slider" elements and create "Slider" Instances
  $('.slider').each(function () {
    const $this = $(this);

    const slider = new Slider({
      min: $this.data('min'), // this will extract the min-data attribute (see index.html) to initialize the slider
      max: $this.data('max'),
      value: $this.data('value'),
      view: $this,
      thumb: $this.find('.thumb'),
      track: $this.find('.track'),
      document: $(document) //TODO: make var in MouesDown
    });

    // subscribe to the change event
    $(slider).on('change', function()  { // since we use querys event engine, we must wrap slider in a jquery object

      //only want 2 decimal digits if range is under 10, everything above interger
      if((slider.$max - slider.$min) >= 10) {
        $this.siblings('.label-value').html(Math.floor(slider.value)); // get the slider's value an output it
      } else {
        $this.siblings('.label-value').html(Math.round(slider.value * 100) / 100); // get the slider's value an output it
      }

    });

    // test buttons: find all buttons which are siblings to the slider, and, if pressed, set the slider to the respective value
    $this.siblings('button').on('click', function(e) {
      slider.value = parseFloat($(this).html());
      e.preventDefault();
    });
  });

})(window.lib);