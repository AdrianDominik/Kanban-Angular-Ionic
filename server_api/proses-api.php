<?php

  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Credentials: true");
  header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
  header("Content-Type: application/json; charset=utf-8");

  include "library/config.php";
  
  $postjson = json_decode(file_get_contents('php://input'), true);
  $today    = date('Y-m-d');

  

  if($postjson['aksi']=='add'){

  	$query = mysqli_query($mysqli, "INSERT INTO master_project SET
  		name_project = '$postjson[name_project]',
  		created_at	  = '$today',
		created_by    = '$postjson[created_by]'
  	");
	
  	$idcust = mysqli_insert_id($mysqli);

  	if($query) $result = json_encode(array('success'=>true, 'projectid'=>$idcust));
  	else $result = json_encode(array('success'=>false));

  	echo $result;

  }

  elseif($postjson['aksi']=='addtable'){

  	$query = mysqli_query($mysqli, "INSERT INTO master_table SET
  		name_table = '$postjson[name_table]',
  		created_at = '$today',
		project_id = '$postjson[project_id]'
  	");

  	$idcust = mysqli_insert_id($mysqli);

  	if($query) $result = json_encode(array('success'=>true, 'tableid'=>$idcust));
  	else $result = json_encode(array('success'=>false));

  	echo $result;

  }

  elseif($postjson['aksi']=='adduserhistory'){

	$query = mysqli_query($mysqli, "INSERT INTO master_userhistory SET
		userhistory_name = '$postjson[userhistory_name]',
		userhistory_color = '$postjson[userhistory_color]',
		created_at = '$today',
		userhistory_tableId = '$postjson[userhistory_tableId]',
		userhistory_projectId = '$postjson[userhistory_projectId]'
	");

	$idcust = mysqli_insert_id($mysqli);

	if($query) $result = json_encode(array('success'=>true, 'tableid'=>$idcust));
	else $result = json_encode(array('success'=>false));

	echo $result;

}

  elseif($postjson['aksi']=='getdata'){
  	$data = array();
  	$query = mysqli_query($mysqli, "SELECT * FROM master_project ORDER BY project_id");

  	while($row = mysqli_fetch_array($query)){

  		$data[] = array(
  			'project_id' => $row['project_id'],
  			'name_project' => $row['name_project'],
			'created_at' => $row['created_at'],
			'created_by' => $row['created_by']

  		);
  	}

  	if($query) $result = json_encode(array('success'=>true, 'result'=>$data));
  	else $result = json_encode(array('success'=>false));

  	echo $result;

  }

  elseif($postjson['aksi']=='getdatatable'){
  	$data = array();
  	$query = mysqli_query($mysqli, "SELECT * FROM master_table WHERE project_id = $postjson[project_id] ORDER BY table_id");

  	while($row = mysqli_fetch_array($query)){

  		$data[] = array(
  			'table_id' => $row['table_id'],
  			'name_table' => $row['name_table'],
			'created_at' => $row['created_at'],
			'project_id' => $row['project_id']

  		);
  	}

  	if($query) $result = json_encode(array('success'=>true, 'result'=>$data));
  	else $result = json_encode(array('success'=>false));

  	echo $result;

  }

  elseif($postjson['aksi']=='getdatauserhistory'){
	$data = array();
	$query = mysqli_query($mysqli, "SELECT * FROM master_userhistory WHERE userhistory_tableId = 0 AND userhistory_projectId = $postjson[userhistory_projectId] ORDER BY userhistory_id");

	while($row = mysqli_fetch_array($query)){

		$data[] = array(
			'userhistory_id' => $row['userhistory_id'],
			'userhistory_name' => $row['userhistory_name'],
			'userhistory_color' => $row['userhistory_color'],
			'created_at' => $row['created_at'],
			'userhistory_tableId' => $row['userhistory_tableId'],
			'userhistory_projectId' => $row['userhistory_projectId']

		);
	}

	if($query) $result = json_encode(array('success'=>true, 'result'=>$data));
	else $result = json_encode(array('success'=>false));

	echo $result;

}

elseif($postjson['aksi']=='getdatauserhistoryontables'){
	$data = array();
	$query = mysqli_query($mysqli, "SELECT * FROM master_userhistory WHERE userhistory_tableId IN ($postjson[userhistory_tableId]) AND userhistory_projectId = $postjson[userhistory_projectId] ORDER BY userhistory_id");

	while($row = mysqli_fetch_array($query)){

		$data[] = array(
			'userhistory_id' => $row['userhistory_id'],
			'userhistory_name' => $row['userhistory_name'],
			'userhistory_color' => $row['userhistory_color'],
			'created_at' => $row['created_at'],
			'userhistory_tableId' => $row['userhistory_tableId'],
			'userhistory_projectId' => $row['userhistory_projectId']

		);
	}

	if($query) $result = json_encode(array('success'=>true, 'result'=>$data));
	else $result = json_encode(array('success'=>false));

	echo $result;

}

  elseif($postjson['aksi']=='update'){
  	$query = mysqli_query($mysqli, "UPDATE master_project SET 
  		name_project='$postjson[name_project]' WHERE project_id='$postjson[project_id]'");

  	if($query) $result = json_encode(array('success'=>true, 'result'=>'success'));
  	else $result = json_encode(array('success'=>false, 'result'=>'error'));

  	echo $result;

  }

  elseif($postjson['aksi']=='updatetable'){
  	$query = mysqli_query($mysqli, "UPDATE master_table SET 
  		name_table='$postjson[name_table]' WHERE table_id='$postjson[table_id]'");

  	if($query) $result = json_encode(array('success'=>true, 'result'=>'success'));
  	else $result = json_encode(array('success'=>false, 'result'=>'error'));

  	echo $result;

  }

  elseif($postjson['aksi']=='updateuserhistory'){
	$query = mysqli_query($mysqli, "UPDATE master_userhistory SET 
		userhistory_name='$postjson[userhistory_name]', userhistory_color='$postjson[userhistory_color]' WHERE userhistory_id='$postjson[userhistory_id]'");

	if($query) $result = json_encode(array('success'=>true, 'result'=>'success'));
	else $result = json_encode(array('success'=>false, 'result'=>'error'));

	echo $result;

}

elseif($postjson['aksi']=='updateuserhistorykanbas'){
	$query = mysqli_query($mysqli, "UPDATE master_userhistory SET 
		userhistory_tableId='$postjson[userhistory_tableId]' WHERE userhistory_id='$postjson[userhistory_id]'");

	if($query) $result = json_encode(array('success'=>true, 'result'=>'success'));
	else $result = json_encode(array('success'=>false, 'result'=>'error'));

	echo $result;

}

  elseif($postjson['aksi']=='delete'){
  	$query = mysqli_query($mysqli, "DELETE FROM master_project WHERE project_id='$postjson[project_id]'");

  	if($query) $result = json_encode(array('success'=>true, 'result'=>'success'));
  	else $result = json_encode(array('success'=>false, 'result'=>'error'));

  	echo $result;

  }

  elseif($postjson['aksi']=='deletetable'){
  	$query = mysqli_query($mysqli, "DELETE FROM master_table WHERE table_id='$postjson[table_id]'");

  	if($query) $result = json_encode(array('success'=>true, 'result'=>'success'));
  	else $result = json_encode(array('success'=>false, 'result'=>'error'));

  	echo $result;

  }

  elseif($postjson['aksi']=='deleteuserhistory'){
	$query = mysqli_query($mysqli, "DELETE FROM master_userhistory WHERE userhistory_id='$postjson[userhistory_id]'");

	if($query) $result = json_encode(array('success'=>true, 'result'=>'success'));
	else $result = json_encode(array('success'=>false, 'result'=>'error'));

	echo $result;

}

  elseif($postjson['aksi']=="login"){
    $password = md5($postjson['password']);
    $query = mysqli_query($mysqli, "SELECT * FROM master_user WHERE username='$postjson[username]' AND password='$password'");
    $check = mysqli_num_rows($query);

    if($check>0){
      $data = mysqli_fetch_array($query);
      $datauser = array(
        'user_id' => $data['user_id'],
        'username' => $data['username'],
        'password' => $data['password']
      );

      if($data['status']=='y'){
        $result = json_encode(array('success'=>true, 'result'=>$datauser));
      }else{
        $result = json_encode(array('success'=>false, 'msg'=>'Cuenta Inactiva')); 
      }

    }else{
      $result = json_encode(array('success'=>false, 'msg'=>'Cuenta no registrada'));
    }

    echo $result;
  }

  elseif($postjson['aksi']=="register"){
    $password = md5($postjson['password']);
    $query = mysqli_query($mysqli, "INSERT INTO master_user SET
      username = '$postjson[username]',
      password = '$password',
      status   = 'y'
    ");

    if($query) $result = json_encode(array('success'=>true));
    else $result = json_encode(array('success'=>false, 'msg'=>'Error, intentalo de nuevo'));

    echo $result;
  }


?>