console.log("Oh hell.");

function createNewListItemHTML(task) {
    var htmlStr = 
    "<li class=\"list-group-item\"> \
        <span class=\"lead\">" + task + "</span> \
        <div class=\"pull-right\"> \
            <button class=\"btn btn-sm btn-warning edit-task-button\">Edit</button> \
            <button class=\"btn btn-sm btn-danger del-task-button\">Delete</button> \
        </div> \
    </li>";
    return htmlStr;
}

function createNewRowItemHTML(task) {
    var formAction = 'http://localhost:8080/Note/api/notes/'+task.id
    var editText = "\"" + task.body + "\"";
    var htmlStr = 
        "<tr class=\"task-row\">\
            <th scope=\"row\">"+task.id+"</th>\
            <td><span>"+task.body+"</span>\
                <div class=\"pull-right\"> \
                    <button class=\"btn btn-xs btn-warning edit-task-button\">Edit</button> \
                    <button class=\"btn btn-xs btn-danger del-task-button\">Delete</button> \
                </div> \
                <form class=\"edit-task-form\" method=\"PUT\" action="+formAction+">  \
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

$('.table').on('click','.edit-task-button', function(event) {
    var editForm = $(this).parent().siblings('form.edit-task-form').toggle();
});


// EDIT a single task item
$('.table').on('submit','.edit-task-form', function(event) {
    event.preventDefault();
    var editForm = $(this).toggle();
    var taskCell = $(this).parent().find('span');
    var formData = { body : $(this).find('input').val() };
    var formAction = $(this).attr('action');
    var formMethod = $(this).attr('method');
    $.ajax({
        url: formAction,
        data: JSON.stringify(formData),
        type: formMethod,
        taskCell : taskCell,
        contentType : 'application/json',
        dataType: 'json',        
        success: function(data) {
            console.log("Response from AJAX PUT request:" + JSON.stringify(data,null,'\t'));
            taskCell.text(data.body);
        }
    });
});

// DELETE item
$('.table').on('click','.del-task-button', function(event) {
    event.preventDefault();
    var taskRowObj = $(this).parents('tr')
    var taskIdCell = taskRowObj.find('th');
    var url = 'http://localhost:8080/Note/api/notes/' + taskIdCell.text(); 
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
    taskRowObj.remove();
});

// GET : update table to contain all tasks currently stored on 
//       the server side.
$('#notetaker_get').click(function(event){
    console.log("Clicked the button.");
    $.ajax({ 
        url: 'http://localhost:8080/Note/api/notes', 
        type: 'GET', 
        success: function(data) { 
            console.log(JSON.stringify(data,null,'\t')) 
            $('table.table').find('.task-row').remove();
            data.forEach(function(task){
                $('table.table').append(createNewRowItemHTML(task));            
                // $('.note-list-group').append(createNewListItemHTML(task.body));
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

// DELETE all tasks in the table.
$('#notetaker_delete').click(function(event){
    console.log("Clicked the button.");
    $.ajax({ 
        url: 'http://localhost:8080/Note/api/notes', 
        type: 'DELETE', 
        success: function(data) { 
            console.log(JSON.stringify(data,null,'\t'))
                $('table.table').find('.task-row').remove();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            console.log("AJAX DELETE didn't work!!!:" + 
                    JSON.stringify(XMLHttpRequest,null,'\t'));
            console.log("Status: " + textStatus); 
            console.log("Error: " + errorThrown); 
        } 
    });
});

// CREATE a new task
$('#newitemform').submit(function(event){
    event.preventDefault();
    var formData = $(this).serialize();
    var taskText = $(this).find('.form-control').val();
    var postData = JSON.stringify({
        body : taskText
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
            // $('.note-list-group').append(createNewListItemHTML(data.body));
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            console.log("AJAX POST didn't work!!! " + 
                    JSON.stringify(XMLHttpRequest,null,'\t'));
            console.log("Error: " + errorThrown); 
        }
    });
    $(this).find('.form-control').val('');
});