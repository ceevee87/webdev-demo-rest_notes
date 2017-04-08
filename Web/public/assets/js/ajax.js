console.log("Oh hell.");

function createNewListItemHTML(task) {
    var htmlStr = 
    "<li class=\"list-group-item\"> \
        <span class=\"lead\">" + task + "</span> \
        <div class=\"pull-right\"> \
            <button class=\"btn btn-sm btn-warning edit-button\">Edit</button> \
            <button class=\"btn btn-sm btn-danger edit-button\">Delete</button> \
        </div> \
    </li>";
    return htmlStr;
}

$('#notetaker_get').click(function(event){
    console.log("Clicked the button.");
    $.ajax({ 
        url: 'http://localhost:8080/Note/api/notes', 
        type: 'GET', 
        success: function(data) { 
            console.log(JSON.stringify(data,null,'\t')) 
            $('.note-list-group').empty();
            data.forEach(function(task){
                $('.note-list-group').append(createNewListItemHTML(task.body));
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
            $('.note-list-group').append(createNewListItemHTML(data.body));
            // $('.note-list-group').append("<li>"+data.body+"</li>");
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            console.log("AJAX POST didn't work!!! " + 
                    JSON.stringify(XMLHttpRequest,null,'\t'));
            console.log("Error: " + errorThrown); 
        }
    });
    $(this).find('.form-control').val('');
});