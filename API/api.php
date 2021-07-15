<?php
require("../API/function.php");
$coronaAPI = new CoronaAPI;

if(isset($_GET['type'])){
    switch($_GET['type']){
        case 'dataID':
            echo $coronaAPI->getIndonesia();
            break;
        case 'berita':
            echo $coronaAPI->getBerita();
            break;
        case 'allCountry':
            echo $coronaAPI->getAllCountry();
            break;
        default:
            echo 'API';
            break;
    }
}
?>