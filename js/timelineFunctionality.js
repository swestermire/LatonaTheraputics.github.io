$(function(){
  
  var $body = $("body");
  var $articleCollectionLeft = $(".article-collection-left");
  var $articleCollectionRight = $(".article-collection-right");
  var $articleElements = {
    "2016" : {
        1 : {
        "title" : "The Amazing Article Title",
        "date" : "29-NOV-2016",
        "article type": "Product Release",
        "article content" : "This is the article content, it is quite impressive an spectacular"
          },
      
        2 : {
        "title" : "The Second Amazing Article Title",
        "date" : "15-Jan-2017",
        "article type": "Patent Release",
        "article content" : "This is an article to show how amazing my JS code is.  Too awesome!!! "
          },
      
        3 : {
        "title" : "The Third Amazing Article Title",
        "date" : "15-Jan-2017",
        "article type": "Patent Release",
        "article content" : "COPYING CODE MY ASS THIS IS ALL OG ORIGINAL SHIET FROM THE MIND OF STEVEN TADASHI WESTERMIRE!!! YING CODE MY ASS THIS IS ALL OG ORIGINAL SHIET FROM THE MIND OF STEVEN TADASHI WESTERMIREYING CODE MY ASS THIS IS ALL OG ORIGINAL SHIET FROM THE MIND OF STEVEN TADASHI WESTERMIREYINGYING CODE MY ASS THIS IS ALL OG ORIGINAL SHIET FROM THE MIND OF STEVEN TADASHI WESTERMIREYING CODE MY ASS THIS IS ALL OG ORIGINAL SHIET FROM THE MIND OF STEVEN TADASHI WESTERMIREYING CODE MY ASS THIS IS ALL OG ORIGINAL SHIET FROM THE MIND OF STEVEN TADASHI WESTERMIREYING CODE MY ASS THIS IS ALL OG ORIGINAL SHIET FROM THE MIND OF STEVEN TADASHI WESTERMIREYING CODE MY ASS THIS IS ALL OG ORIGINAL SHIET FROM THE MIND OF STEVEN TADASHI WESTERMIREYING CODE MY ASS THIS IS ALL OG ORIGINAL SHIET FROM THE MIND OF STEVEN TADASHI WESTERMIRE"
          },
      
        4 : {
        "title" : "AND ANOTHER AMAZING FEATUREEEE!!!!!!!!",
        "date" : "15-Jan-2017",
        "article type": "Patent Release",
        "article content" : "YESHHH SHUFCK LONG AND SHUCK IT HARDDD!!!!"
          },

        5 : {
        "title" : "SPARLAGH ASD L DK ASD  SADSAD",
        "date" : "1230-Jan-2020",
        "article type": "Patent ASDASDAS",
        "article content" : "YESHHH SHUFCK LONG AND SHUCK IT HARDDD!!!!"
         }
        //  ,

        //  6 : {
        // "title" : "The Third Amazing Article Title",
        // "date" : "15-Jan-2017",
        // "article type": "Patent Release",
        // "article content" : "COPYING CODE MY ASS THIS IS ALL OG ORIGINAL SHIET FROM THE MIND OF STEVEN TADASHI WESTERMIRE!!! YING CODE MY ASS THIS IS ALL OG ORIGINAL SHIET FROM THE MIND OF STEVEN TADASHI WESTERMIREYING CODE MY ASS THIS IS ALL OG ORIGINAL SHIET FROM THE MIND OF STEVEN TADASHI WESTERMIREYINGYING CODE MY ASS THIS IS ALL OG ORIGINAL SHIET FROM THE MIND OF STEVEN TADASHI WESTERMIREYING CODE MY ASS THIS IS ALL OG ORIGINAL SHIET FROM THE MIND OF STEVEN TADASHI WESTERMIREYING CODE MY ASS THIS IS ALL OG ORIGINAL SHIET FROM THE MIND OF STEVEN TADASHI WESTERMIREYING CODE MY ASS THIS IS ALL OG ORIGINAL SHIET FROM THE MIND OF STEVEN TADASHI WESTERMIREYING CODE MY ASS THIS IS ALL OG ORIGINAL SHIET FROM THE MIND OF STEVEN TADASHI WESTERMIREYING CODE MY ASS THIS IS ALL OG ORIGINAL SHIET FROM THE MIND OF STEVEN TADASHI WESTERMIRE"
        //  }

        }
  };

// --- GENERAL HELPER FUNCTIONS ------------------------------------------------------------------
    // !!! NEED TO MAKE INTO A GENERAL HELPER FUNCTION
  function uniqueIDName(idBase, idIdx){
    /// returns unique ID name to be used when generating id names
    return idBase + idIdx;
  };
  
  // generates style key:value pair for use as inline css. Input is a hash/dictionary table.  return is a string intended for inline css
  function generateStyleElements(styleHash = ""){
    
    if (styleHash == ""){
      return ;
    }
  
    var inlineStyle = "";
    $.each(styleHash, function(key, value){
      inlineStyle += key+":"+ value + ";"
    })
    
    return '"' + inlineStyle + '"';
  };
  
  function divGenerator(className = '', idIdx = '' , style = '', idBase = ''){
    /// returns an array with div beginning [0] and end tag [1] based on provided className and id params
    
    if (className != '' && idBase == '' && idIdx !== ''){
      idBase = className + '-';
    };
    
    
    var result = ["<div style=" + generateStyleElements(style) + " id =" + uniqueIDName(idBase, idIdx) + " class=" + className + ">",
            "</div>"];
    return result;
  };
  
  // readjusts the timeline vertical line gfx
  function timelineGfxReadjust(){
      $('.timeline-vertical-line-gfx').each(function(){
        var $topCircle = $('.timeline-circle');
        var timelinePositionLeft = parseFloat($topCircle.css("left")) + $topCircle.width()/2 - $(this).width()/2;
        $(this).css({left: (timelinePositionLeft + 'px')});
      });
    };



  // --- TIMELINE PAGE RENDER AND FUNCTIONALITY---------------------------------------------------
  // this will only execute once when document has been loaded.
  $( window ).ready(initialScreenLoad());
  
  function initialScreenLoad(){
    
    // initially draws all the articles on to the page taking info from JS object
    var $secondToLast /// this tracks the last element
    var idIdx = 0;
    var idBase = "article-block-id-";
    var idName = "";
    $.each($articleElements, function(index){
    
    // returns article-block div tag with id and class input
    var articleYearDivTag = function(idName = "", index){
        var elementTag = "<div id =" + idName + " class = article-block> <b>Article Element Year</b>: " + index + "<br>";
        return elementTag};
      
      var left = true;
      var cumRightArticleHeight = parseFloat($(".article-collection-right").css("padding-top"));
      var cumLeftArticleHeight = parseFloat($(".article-collection-left").css("padding-top"));
      var idArticleLast = 0;
      
      $.each(this, function(index){
        idName = idBase + index;
        msg = articleYearDivTag(idName, index);
        msg += "<b>Article Element:</b> " + index + "<br>";
        msg += "<b>Title:</b> " + this["title"] + "<br>";
        msg += "<b>Date:</b> " + this["date"] + "<br>";
        msg += "<b>Article Type:</b> " + this['article type'] + "<br>";
        msg += "<b>Article Content:</b> " + this['article content'] + "<br></div>";
        
        // this will place articles in the left or right article column/collection depending on the amount of content
        // the current right and left article columns have

        if (left){
          $articleCollectionLeft.append(msg);
          $lastElement = $("#" + idBase + index);

          cumLeftArticleHeight += parseFloat($($lastElement).height());

          if (cumLeftArticleHeight >= cumRightArticleHeight){
            left = false;
          }
          
        } else {
          $articleCollectionRight.append(msg);
          $lastElement = $("#" + idBase + index);

          cumRightArticleHeight += parseFloat($($lastElement).height());

          if (cumRightArticleHeight >= cumLeftArticleHeight){
            left = true;
          }
        }
        
        /// REPOSITION ARTICLES SO THEY ARE STAGGERED
        /// Checks the current article block and the previous article block to see what their height difference is
        /// if a certain value is hit, then the article will stagger
        if ($secondToLast){
          if ($secondToLast.position().top - $lastElement.position().top <= 50){
            var idElement = '#' + $lastElement.attr('id');
            
            $(idElement).css({"margin-bottom": 50});
            
          }
        } 
        
        $secondToLast = $(".article-block:last")      
      });
    });
    
    
    
    // !!!NEW FUNCTION!!!! 
    // This draws timeline cirlces according to the timeline article positioning
    $(function(){ // immediately invoked function
      $articleBlock = $(".article-block");
      $timelineGfx = $('.timeline-gfx');  
      var articleBlocksSorted = [];

      $articleBlock.each(function(){
        articleBlocksSorted.push($(this).attr('id'))
      })

      console.log("Before - articleBlockSort = " + articleBlocksSorted)
      articleBlocksSorted.sort()
      console.log("After - articleBlockSort = " + articleBlocksSorted)

      $.each(articleBlocksSorted, function(index){
        console.log("This / index = " + this + "/" + index);
        var $specificElement = $("#" + this);
        var position = $($specificElement).position();
        var divTags = divGenerator('timeline-circle' , (index+1));
        var $circleDiv = divTags[0] + divTags[1];
        $timelineGfx.append($circleDiv);

        //this repositions the timeline-circles
        $(".timeline-circle").last().css({
          top: position.top,
          left: "45%",
          position : "absolute"
        });

      })
  });
    
    // !!! NEW FUNCTION
    //this function draws the vertical line graphics for the timeline
    $(function(){

      var userDefinedParams = {
        marginTopBot : 5 //this defines the distance between the circle dimension and vertical timeline gfx
      }

      var $articleBlock = $(".article-block");
      var $timelineGfx = $('.timeline-gfx');                                                           

      var leftArticleBlocksTrace = [];
      var rightArticleBlocksTrace = [];

      /// left article blocks
      var count = 0;
      $($articleCollectionLeft).children().each(function(){
        leftArticleBlocksTrace.push(count);
        count++;
      });
      
      /// right article blocks
      $($articleCollectionRight).children().each(function(){
        rightArticleBlocksTrace.push(count);
        count++;
      });

      console.log("leftArticleBlocksTrace = " + leftArticleBlocksTrace);
      console.log("rightArticleBlocksTrace =" + rightArticleBlocksTrace);
      
      // defines the index of the top and bottom circle
      var idxTop = leftArticleBlocksTrace[0];
      var idxBot = rightArticleBlocksTrace[0];
      var leftTopState = true;
      
      var numArticles = rightArticleBlocksTrace.length + leftArticleBlocksTrace.length;
      var arrayIdx = 0;

      for (iter = 1 ; iter < (numArticles) ; iter++){
        var $topCircle = $('#timeline-circle-' + idxTop);
        var $botCircle = $('#timeline-circle-' + idxBot);
        console.log("idxTop/idxBot = " + idxTop +"/"+ idxBot)
      

        var topCircleHeight = $topCircle.height();
        var topCirclePosition = $topCircle.position();
        var botCirclePosition = $botCircle.position();

        var timelinePositionTop = topCirclePosition.top + topCircleHeight;
        var timelineGfxLineHeight = Math.abs(botCirclePosition.top - timelinePositionTop - 2*userDefinedParams.marginTopBot);
        
        var timelinePositionLeft = parseFloat($topCircle.css("left")) + $topCircle.width()/2 - $('.timeline-vertical-line-gfx').width()/2

        console.log("timelinePositionTop = " + timelinePositionTop);

        var styleArray = {
          height: timelineGfxLineHeight + 'px',
          top: timelinePositionTop + 'px',
          left: timelinePositionLeft + 'px',
          "margin-top":  userDefinedParams.marginTopBot + 'px',
          "margin-bottom" : userDefinedParams.marginTopBot + 'px'
        }
        
        divTags = divGenerator('timeline-vertical-line-gfx', 
                               iter , 
                               styleArray);
        
        $timelineGfx.append((divTags[0] + divTags[1]))
        
        // switches the numeric value of circle IDS to get the correct elements for the height and positioning calculations
        idxTop = idxBot;

        if (leftTopState){
          idxTop = idxBot;
          arrayIdx+=1;
          // if ($('#timeline-circle-' + idxTop).position().top < $('#timeline-circle-' + idxTop).position().top){
          // }
          idxBot = leftArticleBlocksTrace[arrayIdx];  
          leftTopState = false;
        }  else {
          idxTop = idxBot;
          idxBot = rightArticleBlocksTrace[arrayIdx]
          leftTopState = true;  
        }
      }
      
      // readjusts timeline gfx positioning
      timelineGfxReadjust();
      });
  };

  $( window ).resize(function(){
    // changes background color of body
    // $body.css('background-color' , "red");
    
    // readjusts timeline gfx
    timelineGfxReadjust();
    
  });
  
})();
//END OF CODE
