function createNewRowItemHTML(note) {
    var formAction = 'http://localhost:8080/Note/api/notes/'+note.id
    var editText = "\"" + note.body + "\"";
    var htmlStr = 
        "<tr class=\"note-row\">\
            <th scope=\"row\">"+note.id+"</th>\
            <td><span>"+note.body+"</span>\
                <div class=\"pull-right\"> \
                    <button class=\"btn btn-xs btn-warning edit-note-button\">Edit</button> \
                    <button class=\"btn btn-xs btn-danger del-note-button\">Delete</button> \
                </div> \
                <form class=\"edit-note-form\" method=\"PUT\" action="+formAction+">  \
                    <button class=\"btn btn-sm btn-primary\">Update Item</button> \
                    <div class=\"form-group\" > \
                        <input type=\"text\" value="+editText+ " name=\"todo[text]\" \
                             type=\"submit\" class=\"form-control\"> \
                    </div> \
                </form> \
                <div class=\"clearfix\"></div> \
            </td>\
        </tr>"
    return htmlStr;
}

$('.table').on('click','.edit-note-button', function(event) {
    var editForm = $(this).parent().siblings('form.edit-note-form').toggle();
});


// EDIT a single note item
$('.table').on('submit','.edit-note-form', function(event) {
    event.preventDefault();
    var editForm = $(this).toggle();
    var noteCell = $(this).parent().find('span');
    var formData = { body : $(this).find('input').val() };
    var formAction = $(this).attr('action');
    var formMethod = $(this).attr('method');
    $.ajax({
        url: formAction,
        data: JSON.stringify(formData),
        type: formMethod,
        noteCell : noteCell,
        contentType : 'application/json',
        dataType: 'json',        
        success: function(data) {
            console.log("Response from AJAX PUT request:" + JSON.stringify(data,null,'\t'));
            noteCell.text(data.body);
        }
    });
});

// DELETE item
$('.table').on('click','.del-note-button', function(event) {
    event.preventDefault();
    var noteRowObj = $(this).parents('tr')
    var noteIdCell = noteRowObj.find('th');
    var url = 'http://localhost:8080/Note/api/notes/' + noteIdCell.text(); 
    $.ajax({ 
        url: url, 
        type: 'DELETE', 
        success: function(data) { 
            console.log(JSON.stringify(data,null,'\t'))
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            console.log("AJAX DELETE didn't work!!!:" + 
                    JSON.stringify(XMLHttpRequest,null,'\t'));
            console.log("Status: " + textStatus); 
            console.log("Error: " + errorThrown); 
        } 
    });
    noteRowObj.remove();
});

// GET : update table to contain all notes currently stored on 
//       the server side.
$('#notetaker_get').click(function(event){
    console.log("Clicked the button.");
    $.ajax({ 
        url: 'http://localhost:8080/Note/api/notes', 
        type: 'GET', 
        success: function(data) { 
            console.log(JSON.stringify(data,null,'\t')) 
            $('table.table').find('.note-row').remove();
            data.forEach(function(note){
                $('table.table').append(createNewRowItemHTML(note));            
            });
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            console.log("AJAX DELETE didn't work!!!:" + 
                    JSON.stringify(XMLHttpRequest,null,'\t'));
            console.log("Status: " + textStatus); 
            console.log("Error: " + errorThrown); 
        } 
    });
});

// DELETE all notes in the table.
$('#notetaker_delete').click(function(event){
    console.log("Clicked the button.");
    $.ajax({ 
        url: 'http://localhost:8080/Note/api/notes', 
        type: 'DELETE', 
        success: function(data) { 
            console.log(JSON.stringify(data,null,'\t'));
            $('table.table').find('.note-row').remove();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            console.log("AJAX DELETE didn't work!!!:" + 
                    JSON.stringify(XMLHttpRequest,null,'\t'));
            console.log("Status: " + textStatus); 
            console.log("Error: " + errorThrown); 
        } 
    });
});

// CREATE a new note
$('#newitemform').submit(function(event){
    event.preventDefault();
    var formData = $(this).serialize();
    var noteText = $(this).find('.form-control').val();
    var postData = JSON.stringify({
        body : noteText
    });

    console.log("AJAX post request data: " + JSON.stringify(postData,null,'\t'));
    $.ajax({ 
        url: 'http://localhost:8080/Note/api/notes', 
        type: 'POST',
        dataType: 'json',
        data : postData,
        contentType : 'application/json',
        success: function(data, status, xhr) { 
            console.log(JSON.stringify(data,null,'\t')) 
            console.log("status:" + status); 
            console.log(JSON.stringify(xhr,null,'\t'));
            $('table.table').append(createNewRowItemHTML(data));
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            console.log("AJAX POST didn't work!!! " + 
                    JSON.stringify(XMLHttpRequest,null,'\t'));
            console.log("Error: " + errorThrown); 
        }
    });
    $(this).find('.form-control').val('');
});