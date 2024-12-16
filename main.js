
let btnaction = "Insert";  // Default action is insert

// When the "Add New" button is clicked, show the modal for inserting a new student
$("#addNew").click(function() {
    $("#stdModel").modal("show");
    $("#studentForm")[0].reset();  // Reset form for new entry
    btnaction = "Insert";  // Set action to insert
});


// Submit form
$("#studentForm").submit(function(event) {
    event.preventDefault();  // Prevent default form submission
    
    // Get the form data
    let form_data = new FormData($("#studentForm")[0]);
    
    // Set the appropriate action based on btnaction
    if (btnaction === "Insert") {
        form_data.append("action", "registerStudent");
    } else if (btnaction === "Update") {
        form_data.append("action", "updateStudent");
    }

    // Make the AJAX request
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "api.php",
        data: form_data,
        processData: false,
        contentType: false,
        success: function(data) {
            let status = data.data;
            $("#studentForm")[0].reset();  // Reset the form after submission
            alert(status);
            btnaction = "Insert";  // Reset action back to insert
            $("#stdModel").modal("hide");
            loaddate();  // Reload the data after updating
        },
        error: function(data) {
            console.log(data);
        }
    });
});

loaddate();

function loaddate() {
    $("#studentTable tbody").html(""); // Clear the table body
    let sendDate = {
        action: "readall"
    }

    $.ajax({
        method: "POST",
        url: "api.php",
        data: sendDate,
        dataType: "JSON",
        success: function(data) {
            
            console.log(data);  // Log the entire response to check if the data is returned properly
            let status = data.status;
            let response = data.data;

            if (status) {
               
                response.forEach(item => {
                    let thml ='';
                    let tr = '';
                     tr += '<tr>';
                    for (let i in item) {
                        tr += `<td>${item[i]}</td>`;
                    }
                    tr += `<td> 
                        <a class="btn btn-info update_info" update_id="${item['id']}">
                            <i class="fas fa-edit"></i>
                        </a> &nbsp; &nbsp;
                        <a class="btn btn-danger delete_info" delete_id="${item['id']}">
                            <i class="fas fa-trash"></i>
                        </a>
                    </td>`;
                    tr += "</tr>";
                    
                    $('#studentTable tbody').append(tr);
                });
            } else {
                console.log("status failed: ", data.message);  // Log failure details
            }
        }
        
    });
}


// Fetch information of a student to update
function fetch_info(id) {
    let sendDate = {
        "action": "readStudentInfo",
        "id": id
    };

    // AJAX request to get student information
    $.ajax({
        type: "POST",
        url: "api.php",
        dataType: "JSON",
        data: sendDate,
        success: function(data) {
            let status = data.status;
            let response = data.data;
            
            if (status) {
                let student = response[0];  // Assuming the response is an array of student data
                $("#StudentId").val(student.id);  // Set the student ID in the form
                $("#StudentName").val(student.name);  // Set the student name
                $("#StudentClass").val(student.class);  // Set the student class

                $("#stdModel").modal("show");  // Show the modal for editing
                btnaction = "Update";  // Set action to update
             

            } else {
                console.log("Failed to fetch data");
            }
        },
        error: function(data) {
            console.log(data);
        }
    });
}

function deletestudent(id) {
    let sendDate = {
        "action": "deleteStudent",
        "id": id
    };

    // AJAX request to get student information
    $.ajax({
        type: "POST",
        url: "api.php",
        dataType: "JSON",
        data: sendDate,
        success: function(data) {
            let status = data.status;
            let response = data.data;
            
            if (status) {
                alert(response);
                loaddate();

            } else {
                console.log("Failed to fetch data");
            }
        },
        error: function(data) {
            console.log(data);
        }
    });
}

// When clicking the "Edit" button, load the student's information into the modal
$("#studentTable").on("click", "a.update_info", function(event) {
    event.preventDefault();  // Prevent default link behavior
    let id = $(this).attr("update_id");  // Get the ID of the student to update
    fetch_info(id);  // Fetch the student's information
});

$("#studentTable").on("click", "a.delete_info", function(event) {
    event.preventDefault();  
    let id = $(this).attr("delete_id"); 
    if(confirm("Are Sure to delete")){
        deletestudent(id); 
    } 
     
});
