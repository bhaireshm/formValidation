import ValidateForm from './validateForm.js';


$('#mainForm').on('submit', function (e) {
    e.preventDefault();
    console.log(e);

    ValidateForm("mainForm");

});