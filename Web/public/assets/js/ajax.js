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
    var htmlStr = 
        "<tr class=\"task-row\">\
            <th scope=\"row\">"+task.id+"</th>\
            <td>"+task.body+"</td>\
            <td style=\"width:20%\">\
                <div class=\"pull-right\"> \
                    <button class=\"btn btn-sm btn-warning edit-task-button\">Edit</button> \
                    <button class=\"btn btn-sm btn-danger del-task-button\">Delete</button> \
                </div> \
            </td>\
        </tr>"
    return htmlStr;
}

$('.table').on('click','.del-task-button', function(event) {
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

$('#notetaker_delete').click(function(event){
    console.log("Clicked the button.");
    $.ajax({ 
        url: 'http://localhost:8080/Note/api/notes', 
        type: 'DELETE', 
        success: function(data) { 
            console.log(JSON.stringify(data,null,'\t'))
                $('.note-list-group').empty();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            console.log("AJAX DELETE didn't work!!!:" + 
                    JSON.stringify(XMLHttpRequest,null,'\t'));
            console.log("Status: " + textStatus); 
            console.log("Error: " + errorThrown); 
        } 
    });
});

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