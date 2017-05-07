$(function () {
  const model = new lib.ClockModel();
  const logView = new lib.LogView(model, $('.second'), $('.minute'), $('.hour'));
  const digitalView = new lib.DigitalView(model, $('.digitalView'));

  // Test code
  //------------
  // $(model).on('change', function () {
  //   console.log(model.seconds);
  // });


});