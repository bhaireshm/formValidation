

export default function ValidateForm (id, options) {

    if (!id) {
        throw new Error('Form ID Not Specified');
    }

    // Inputs to be validated (pass input types or input tags)
    this.inputs = $(`#${id} input,#${id} select,#${id} textarea`);

    // Inputs to be ignored (pass IDs in array)
    this.ignoreIDs = [];

    console.log(ValidateForm.inputs);

}

ValidateForm.isEmpty = function (data) {
    if (typeof (data) == 'number' || typeof (data) == 'boolean') { return false; }
    if (typeof (data) == 'undefined' || data === null) { return true; }
    if (typeof (data.length) != 'undefined') { return data.length == 0; }
    let count = 0;
    for (let i in data) {
        if (data.hasOwnProperty(i)) { count++; }
    }
    return count == 0;
}

ValidateForm.init = function () {
    for (var i = 0; i < ValidateForm.inputs.length; ++i) {
        ValidateForm.inputs[i].addEventListener("blur", function (ev) {
            let formData = {}, id = ev.target.id, value = ev.target.value;

            for (let j = 0; j < ignoreIDs.length; j++) {
                if (id != ignoreIDs[j]) {
                    formData[id] = value;
                    ValidateForm.validateForm(formData);
                }
            }
        });
    }
}

ValidateForm.validateForm = function (formData) {
    let message = 'cannot be empty';
    Object.entries(formData).forEach(function (obj) {
        resetFormGroup(obj[0]);
        if (ValidateForm.isEmpty(obj[1])) {
            addError(obj, message);
            return false;
        } else {
            return true;
        }
    });
}

ValidateForm.resetFormGroup = function (id) {
    let className = `${id}-block`, msgDiv, classes;
    if ($(`.messages`).hasClass(className)) {
        msgDiv = $(`.${className}`); classes = msgDiv.classList;
        msgDiv.parent().children('div.messages.mandatory').remove();
    }
}

ValidateForm.addMsgDiv = function (id) {
    let msgDiv = `<div class="messages mandatory ${id}-block"></div>`;
    $(`#${id}`).parent().after(msgDiv);
}

ValidateForm.addError = function (obj, msg) {
    let name = obj[0], messageDiv;
    ValidateForm.addMsgDiv(name);

    messageDiv = $(`.${name}-block`);
    messageDiv.addClass('has-error');

    if (name != 'psid' && name != 'sdid' && name != 'bpid')
        name = $(`#${name}`)[0].name;

    messageDiv.text(`${App.camelCase(name)} ${msg}`);
}
