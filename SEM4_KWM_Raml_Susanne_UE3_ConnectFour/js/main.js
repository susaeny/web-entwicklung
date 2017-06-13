$(function () {
    console.log('Ready');

    var model = new connectFour.Model();
    model.init();

    $(window).on("keypress", _keydown);
    console.log("change event");

    $(model).on("change", _render);
    console.log("change event");
    $(model).on(model.game_over, _gameover);

    _render();

    function _keydown(e) {
        let columnIndex = String.fromCharCode(e.keyCode) - 1;
        if (model.isInsertTokenPossibleAt(columnIndex)) {
            model.insertTokenAt(columnIndex);
        }
    }

    function _gameover(e) {
        $("#output").html(model.toString() + `Game over. Player ${e.curPlayer} won`);
        $(window).off("keypress", _keydown());
    }


    function _render(e) {
        //$("#output").html(model.toString().replace(/\n/g, "<br>"));
        $("#output").html(model.toString());
    }

});



