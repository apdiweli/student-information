<?php   


header("Content-type: application/json");

include('conn.php');


// function readAll
// function insert
// function update
// function delete

if(isset($_POST['action']))
{
    $action=$_POST['action'];
    $action($conn);
}
else
{
    echo json_encode(['status'=>'error','message'=>'action Is Required']);
}

// }
function readall($conn) {
  $data = array();

  $query = "SELECT * FROM student";
  $res = $conn->query($query);

  if ($res) {
      while ($row = $res->fetch_assoc()) {
          $data[] = $row; 
      }
      $mesdate = array("status" => true, "data" => $data);
  } else {
      $mesdate = array("status" => false, "data" => $conn->error);
  }

  // Ensure this echo is not being called multiple times
  echo json_encode($mesdate);
}


function readStudentInfo($conn){
  $data = array();
  $mesdate = array(); 
  $id=$_POST['id'];
  $query = " select *from student where id='$id' ";
  $res = $conn->query($query);

 if($res){
  while ($row = $res->fetch_assoc()) {
    $data [] =  $row; 

  }
    $mesdate = array("status"=>true, "data" => $data );
  }else{
  $mesdate =array("status"=>false , "data"=>$conn->error);
  }

      echo json_encode($mesdate);
}

function deleteStudent($conn){
  $data = array();
  $mesdate = array(); 
  $id=$_POST['id'];
  $query = " delete from student where id='$id' ";
  $res = $conn->query($query);

 if($res){
  
    $mesdate = array("status"=>true, "data" => $data );
  }else{
  $mesdate =array("status"=>false , "data"=>$conn->error);
  }

      echo json_encode($mesdate);
}


function registerStudent($conn){

    $studentId=$_POST['StudentId'];
    $studentName=$_POST['StudentName'];
    $studentClass=$_POST['StudentClass'];

    $data=array();
    $messge=array();

    $sql="insert into student(id,name ,class) VALUES ('$studentId','$studentName','$studentClass')";

    $result=$conn->query($sql);
     
    if($result){
        $data=array("status" => true, "data" =>"Registrated successfully");
        

    }
    else{
        $data=array("status" => false , "data" =>$conn->error);
    }

    echo json_encode($data);

}


function updateStudent($conn){

  $studentId=$_POST['StudentId'];
  $studentName=$_POST['StudentName'];
  $studentClass=$_POST['StudentClass'];

  $data=array();
  $messge=array();

  $sql="update student set name='$studentName',class='$studentClass'  where id='$studentId'";

  $result=$conn->query($sql);
   
  if($result){
      $data=array("status" => true, "data" =>"update successfully");
      

  }
  else{
      $data=array("status" => false , "data" =>$conn->error);
  }

  echo json_encode($data);

}


// ?>