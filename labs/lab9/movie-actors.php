<?php 
  include('includes/init.inc.php'); // include the DOCTYPE and opening tags
  include('includes/functions.inc.php'); // functions
  ini_set('display_errors', 1);
  ini_set('display_startup_errors', 1);
  error_reporting(E_ALL);
?>
<title>PHP &amp; MySQL - ITWS</title>   

<?php include('includes/head.inc.php'); ?>

<h1>PHP &amp; MySQL</h1>
      
<?php include('includes/menubody.inc.php'); ?>

<?php
  // We'll need a database connection both for retrieving records and for
  // inserting them.  Let's get it up front and use it for both processes
  // to avoid opening the connection twice.  If we make a good connection,
  // we'll change the $dbOk flag.
  $dbOk = false;

  /* Create a new database connection object, passing in the host, username,
     password, and database to use. The "@" suppresses errors. */
  @ $db = new mysqli('localhost', 'iit', 'iit', 'iit');

  if ($db->connect_error) {
    echo '<div class="messages">Could not connect to the database. Error: ';
    echo $db->connect_errno . ' - ' . $db->connect_error . '</div>';
  } else {
    $dbOk = true;
  }
?>

<h3>Movie Actors</h3>
<table id="movieActorsTable">
<?php
  if ($dbOk) {


    $query = 'select movies.title as movieTitle, actors.first_names as actorFirstNames, actors.last_name as actorLastName from movie_actors left join movies on movies.movieid = movie_actors.movieid left join actors on actors.actorid = movie_actors.actorid';
    $result = $db->query($query);
    $numRecords = $result->num_rows;

    echo '<tr><th>Movie:</th><th>Actor:</th><th></th></tr>';
    for ($i=0; $i < $numRecords; $i++) {
      $record = $result->fetch_assoc();
      if ($i % 2 == 0) {
        echo "\n".'<tr><td>';
      } else {
        echo "\n".'<tr class="odd"><td>';
      }
      echo htmlspecialchars($record['movieTitle']);
      echo '</td><td>';
      echo htmlspecialchars($record['actorFirstNames'] . ', ' . $record['actorLastName']);
      echo '</td></tr>';
    }

    $result->free();

    // Finally, let's close the database
    $db->close();
  }

?>
</table>

<?php include('includes/foot.inc.php'); 
  // footer info and closing tags
?>
