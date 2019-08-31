<?php
   $dbhost = 'localhost:3036';
   $dbuser = 'root';
   $dbpass = 'rootpassword';
   $conn = mysql_connect($dbhost, $dbuser, $dbpass);
   
   if(! $conn ) {
      die('Could not connect: ' . mysql_error());
   }

   $sql = 'UPDATE allgames
      SET appid = REPLACE(allgames, 'oldstring', 'newString')
      WHERE appid LIKE 'oldString%'
      SET name = REPLACE(allgames, 'oldstring', 'newString')
      WHERE name LIKE 'oldString%';

   mysql_select_db(steamdiscount);
   $retval = mysql_query( $sql, $conn );
   
   if(! $retval ) {
      die('Could not update data: ' . mysql_error());
   }
   echo "Updated data successfully\n";
   mysql_close($conn);
?>