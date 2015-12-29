img_cols = ".image-cols.visible"
var imageApp = angular.module('imageApp',['chieffancypants.loadingBar']);
// The top progress bar loader implemented using library of angular js
// FROM: https://github.com/chieffancypants/angular-loading-bar
imageApp.config(function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
})
imageApp.controller('imageCtrl', ['$scope', '$http', '$compile', function($scope, $http, $compile){
  // general range function for general angular for loop
  // ex: ng-repeat="i in range(5)"
  // bejaves like for loop for (i=0;i<5;i++)
  $scope.range = function(range){
    arr = new Array();
    for (i=0;i<range;i++){
      arr.push(i);
    }
    return arr;
  }
  //initial infinitescroll true
  $scope.infiniteScroll = true;
  //initial page_no = 0
  $scope.page_no = 0;
  $scope.getPage = function(){
    //initialize localstorage if not set to prevent Undefined error
    if(!localStorage.gainsight){
      gainsight = {};
      localStorage.setItem("gainsight", JSON.stringify(gainsight));
    }

    if($scope.infiniteScroll)
      $http.get('php/call.php?page_no='+$scope.page_no)//get page by page no
      .success(function(data){
        //for each image on any given image
        angular.forEach(data, function(img, key){
          //just unique ID for unique image identification, helpful in local stroage
          img.id= CryptoJS.MD5(img.name).toString();
          likes = JSON.parse(localStorage.gainsight)[img.id] || 0;
          var cols_height = new Array();
          $(img_cols).each(function(){
            cols_height.push($(this).height());
          });
          var atIndex = findMin(cols_height);
          imgString = JSON.stringify(img);
          imgs = '<div class="card-image-single animated fadeInUp" id="'+img.id+'">\
                <div class="card-image">\
                  <div class="shadow">\
                  <div class="card-likes"><i class="fa fa-thumbs-o-up"></i> <span>'+likes+'</span></div>\
                    <div class="card-like"><i class="fa fa-thumbs-o-up" ng-click="like(\''+img.id+'\')"></i></div>\
                    <img src="'+img.url+'" class="loading"/>\
                  </div>\
                </div>\
                <div class="card-name">\
                  '+img.name+'\
                </div>\
                <div class="card-desc">\
                  Random Description can go here if I feel like putting it.\
                </div>\
                <div class="card-footer">\
                  <div class="card-share"><span>Share:</span>\
                    <a href="https://www.facebook.com/sharer/sharer.php?u='+img.url+'" target="_blank"><i class="fa fa-facebook" data-color="#00AEDB"></i></a>\
                  </div>\
                  <div class="card-extra row">\
                    <a href="'+img.url+'" target="_blank"><div class="col-xs-6 bg-primary">\
                      <i class="fa fa-download"></i>\
                      </div></a>\
                    <div class="col-xs-6 bg-success" style="cursor:pointer" ng-click=\'showModal('+imgString+')\'>\
                      <i class="fa fa-bar-chart"></i>\
                    </div>\
                  </div>\
                </div>\
              </div>';
          $(img_cols).eq(atIndex).append($compile(imgs)($scope));
          imagePreloader();
        });
       $scope.page_no++;
      })
  }
  $scope.getPage($scope.page_no);
  //************************ SCROLL BIND *****************************//
  direction = 0;
  $(document).on('scroll',function(e){
    direction = 0;
    scrollBody(direction);
  });
  $(document).on('mousewheel', function(e){
    direction = e.originalEvent.wheelDelta/-Math.abs(e.originalEvent.wheelDelta);
    e.preventDefault();
    scrollBody(direction);
  });
  function scrollBody(direction){
    var body_total = $('body').height()-$(window).height();
    var body_top = $('body').scrollTop();
    if(direction==0){//it is triggred by arrow scroll not by mousewheel
      if(body_total - body_top < 5){
        $scope.getPage($scope.page_no);
      }
    } else{
      $('body').stop().animate({scrollTop:$('body').scrollTop()+direction*300},500,function(){
        if(body_total - body_top < 200){
          $('body').scrollTop(body_total);
        }
        if(body_total - body_top < 1){
          $scope.getPage($scope.page_no);
        }
      });
    }
  }
  $scope.showModal = function(img){
    $scope.img = img;
    $("#chartModal").modal();
  }

  $scope.like = function(imgname){
    //create new local storage items
      gainsight = JSON.parse(localStorage.gainsight);
      if(gainsight[imgname]){
        gainsight[imgname]++;
      } else{
        gainsight[imgname] = 1;
      }
    console.log(gainsight);
    localStorage.setItem("gainsight", JSON.stringify(gainsight));
    console.log(localStorage);
    $('#'+imgname).find(".card-likes span").html(parseInt($('#'+imgname).find(".card-likes span").html())+1);
    $scope.likes_total++;
  }
  $scope.likes_total = 0;
  localstoragejson = JSON.parse(localStorage.gainsight)
  for (var key in localstoragejson) {
    if (localstoragejson.hasOwnProperty(key)) {
      $scope.likes_total += localstoragejson[key];
    }
  }

}])

function findMin(array){
  var min = array[0];
  var minIndex = 0;
  for (var i = 1; i < array.length; i++) {
    if (array[i] < min) {
      minIndex = i;
      min = array[i];
    }
  }
  return minIndex;
}
function imagePreloader(){
  $(".loading").each(function(){
    $(this).load(function(){
      $(this).removeClass("loading");
      $(this).parent().parent().css({'background': 'none'});
    })
    //console.log($(this));
  })
}
/*function like(img){
  console.log(img);
}*/
$(window).on('load resize', function(){
  if($(window).width()<768){
    $("#col-3").removeClass("visible").addClass('hidden');
  } else{
    $("#col-3").removeClass("hidden").addClass('visible');
  }
})