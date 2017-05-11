$(function () {
    const model = new lib.ClockModel($('.timezone'), $('.mode'));
    const analogView = new lib.LogView(model, $('.second'), $('.minute'), $('.hour'));
    const digitalView = new lib.DigitalView(model, $('.digitalView'));
    const timezoneView = new lib.TimezoneView(model, $('.offset'));
});