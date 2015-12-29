<!DOCTYPE html>
<html>
<head>
  <title>Glydel</title>
  <link rel="stylesheet" type="text/css" href="css/bootstrap.css"/>
  <link rel="stylesheet" type="text/css" href="css/animate.min.css"/>
  <link rel="stylesheet" type="text/css" href="css/font-awesome.css">
  <link rel="stylesheet/less" type="text/css" href="css/theme.less"/>
  <script type="text/javascript" src="js/less.min.js"></script>
  <script type="text/javascript" src="js/angular.min.js"></script>
  <script type="text/javascript" src="js/jquery.min.js"></script>
  <script type="text/javascript" src="js/main.js"></script>
</head>
<body ng-app="hotelApp" ng-controller="hotelCtrl">
  <div class="container-fluid">
    <div class="main-header row">
      <div class="topbar">
        <a href="index.php"><div class="header-logo"><img src="img/iamgegrid.png" height="80"><img src="logo.png" height="80"></div></a>
        <ul class="navigation">
          <li><a href="contact.php">Contact</a></li></ul>
        </ul>
        <div class="search-box">
          <div class="likes-total"><i class="fa fa-thumbs-up"></i> {{likes_total}}</div>
          <div class="infinite-toggle">Infinite Scroll <input type="checkbox" ng-model="infiniteScroll"></div>
        </div>
      </div>
    </div>    <!-- Content -->
    <div class="row main-content">
      <div class="user-image col-sm-3">
        <img src="img/piyush.jpg"/>
      </div>
      <div class="col-sm-9">
        <h1>Piyush Kumar Baliyan</h1>
        <div class="col-md-12">
          <h2><a href="http://facebook.com/piyushkumarbaliyan" style="color:#00AEBD; text-decoration:none"><i class="fa fa-facebook"></i> Facebook</a></h2>
          <h2><a href="https://plus.google.com/+PiyushKumarBaliyan/" style="color:#DC4937; text-decoration:none"><i class="fa fa-google"></i> Google</a></h2>
          <h2><a href="linkedin.com/in/piyushkumarbaliyan" style="color:#1985BD; text-decoration:none"><i class="fa fa-linkedin"></i> Linkedin</a></h2>
        </div>
      </div>
    </div>
  </div>
</body>
</html>