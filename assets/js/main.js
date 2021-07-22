import Validate from './validateForm.js';


$('#mainForm').on('submit', function (e) {
    e.preventDefault();
    console.log(e);

    Validate("mainForm");

});