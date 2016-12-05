$(function(){
  
  // should probably split this up... This section of code is for timeline functionality
  var height = $('.article-section-left').height()
  var vertical_line_height = $(".line-vert").height();
  var title_background_height = $('.title-background').height();
  var article_body_height = $(".article-body").height();
  
  message = "article-selection-left height is " + height + '..    ';
  message += "Vertical timeline height is " + vertical_line_height + '..     ';
  message += "Title background height is " + title_background_height + '..     ';
  message += "article-body height is " + article_body_height;
  $('#output1').text(message);
  
  
  // whats the difference?
  // $( window ).onload(function(){
  //   adjustDomElementDims() })
  
  // $( window ).onload(adjustDomElementsDims())
  
  $( window ).resize(function() {
      adjustDomElementDims();
    });
  
  // adjusts timeline vertical line graphic with the article height increase
  function resizeTimelineVertical(height){
    verticalLineHeight = $(".line-vert").height();
    
    var testHeight = 100;
    $('.line-vert').each(function() {
      $( this ).height(200);
      testHeight += 200;
      console.log( "OBJ is " + $( this ).height() + ' ' + testHeight);
    });
    
    // increases length of timeline vertical
    if (height > (verticalLineHeight + 50)){
       $(".line-vert").height((height + 100));
    } 
    
    // decreases length of timeline vertical
      else if (verticalLineHeight > (height + 100)){
      $('.line-vert').height((height + 50));
    }
  }
  
  // adjusts the article margin to keep it "relatively" centered in the body of the article
  function resizeArticleSpacing(articleHeight, titleBackgroundHeight, articleBodyHeight){
    var dimDiff = articleHeight - titleBackgroundHeight - articleBodyHeight;
    
    // !!! 33 pixels chosen based on what looked aesthetically pleasing, might want to make this a function input so that it can be made more general
    var adjustedMarginTop = 100 - dimDiff;
    $('.article-body').css('margin-top' , adjustedMarginTop)
  };
  
  // adjusts article distance from timeline
  function adjustArticleDistFromTimeline(articleWidth){
    var windowWidth = $(window).width();
    var screenOffSet = 100;
    
    var adjustedWidthLeftArt = windowWidth/2 - screenOffSet - articleWidth ;
    var adjustedWidthRtArt = windowWidth/2 + screenOffSet;
    if (adjustedWidthLeftArt > 10){
      $('.article-section-left').css({left:adjustedWidthLeftArt});
      $('.article-section-right').css({left:adjustedWidthRtArt});
    } else {
      $('.article-section-left').css({left:10});
      $('.article-section-right').css({left:adjustedWidthRtArt});
    }
  };
  
  function adjustArticleWidth(){
    var artcileWidth = $(".news-article").width();
    var windowWidth = $(window).width();
    
    // harcoded screen sizes to designate when screen size criterias are used
    var screenWidthCutOff1 = 1400;
    var screenWidthCutOff2 = 1000;
    
    if (windowWidth > screenWidthCutOff1){
      $(".news-article").width((screenWidthCutOff1 * 0.4));
    } else if (windowWidth > screenWidthCutOff2) {
      var fixedScreenWidth = "35vw";
      $(".news-article").width(fixedScreenWidth);
    } else {
      var fixedScreenWidth = "30vw";
      $(".news-article").width(fixedScreenWidth);    
    };
  };
  
  function adjustDomElementDims(){
          // !!! need to make this functional general and loop through all article elements
      var height = $('.article-section-left').height();
      var vertical_line_height = $(".line-vert").height();
      var title_background_height = $('.title-background').height();
      var article_body_height = $(".article-body").height();
      var articleSectionCoord = $('.article-section-left').position();
      var articleWidth = $('.article-section-left').width();
    
      // functions to adjust screen elements when screen is resized
      resizeTimelineVertical(height);
      resizeArticleSpacing(height, title_background_height, article_body_height);
      adjustArticleWidth(articleWidth);
    
      articleWidth = $('.article-section-left').width();
      adjustArticleDistFromTimeline(articleWidth);
  };
  
})();