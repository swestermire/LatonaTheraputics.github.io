// jquery functionality specifically for timeline view render.  
// This is also designed to be easy to update... in theory.

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
        "article content" : "This is an article to show how amazing my JS code is.  Too awesome!!!"
          },
      
        3 : {
        "title" : "The Third Amazing Article Title",
        "date" : "15-Jan-2017",
        "article type": "Patent Release",
        "article content" : "COPYING CODE MY ASS THIS IS ALL OG ORIGINAL SHIET FROM THE MIND OF STEVEN TADASHI WESTERMIRE!!!"
          },
      
        4 : {
        "title" : "AND ANOTHER AMAZING FEATUREEEE!!!!!!!!",
        "date" : "15-Jan-2017",
        "article type": "Patent Release",
        "article content" : "YESHHH SHUFCK LONG AND SHUCK IT HARDDD!!!!"
          }
         }
  };
  
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
      
      $.each(this, function(index){
        idName = idBase + index;
        msg = articleYearDivTag(idName, index);
        msg += "<b>Article Element:</b> " + index + "<br>";
        msg += "<b>Title:</b> " + this["title"] + "<br>";
        msg += "<b>Date:</b> " + this["date"] + "<br>";
        msg += "<b>Article Type:</b> " + this['article type'] + "<br>";
        msg += "<b>Article Content:</b> " + this['article content'] + "<br></div>";
        
        // this will place articles in the left or right article column/collection
        if (left){
        $articleCollectionLeft.append(msg);
          left = false;
          
        } else {
          $articleCollectionRight.append(msg);
          left = true;
        }
        
        // // nice print statements to check class and id of article divs as they are appended
        // console.log("Class: " + index + ": " + $(".article-block:last").attr("class"));
        // console.log("Id: " + index + ": " + $(".article-block:last").attr("id"));
        // console.log("idIdx: " + idIdx);
        
        /// REPOSITION ARTICLES SO THEY ARE STAGGERED
        $lastElement = $(".article-block:last");
        if ($secondToLast){
          if ($secondToLast.position().top - $lastElement.position().top <= 50){
            var idElement = '#' + $lastElement.attr('id');
            
            // $lastElement.css({"margin-top": 50});
            $(idElement).css({"margin-bottom": 50});
            
            // !!! Helpful comments to see whats going on !!!
            // var marginBottomElement = $(idElement).css("margin-bottom");
            // var positionTopSecondElement = $secondToLast.position().top;
            // var positionTopLastElement = $lastElement.position().top;
            // console.log('idElement: ' + idElement + " and margin-bottom: " + marginBottomElement );
            // console.log('Top-position of lastElement: ' + positionTopLastElement);
            // console.log('Top-position of secondElement: ' + positionTopSecondElement);
            
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

      $articleBlock.each(function(index){
        
        var position = $(this).position();
        var divTags = divGenerator('timeline-circle', index)
        console.log("divTags is: " + divTags);
        var $circleDiv = divTags[0] + divTags[1]
        $timelineGfx.append($circleDiv)

        // this repositions the timeline-circles
        $(".timeline-circle").last().css(
          {top: position.top, 
           left: "45%", 
           position: "absolute"})

  // !! TRIED TO UPDATE CIRCLE POSITIONS IF THERE WAS OVERLAP BUT DECIDED AGAINST IT
  //       checks to see if two timeline-circles are on top of one another
  //       if ($(".timeline-circle").last().prev()){
  //         if ($(this).position().top == $(".timeline-circle").last().position().top){
  //           var $circleObj = $(".timeline-circle").last();
  //           var topPosition = $circleObj.position.top;
  //           $circleObj.css({top: (topPosition + 50)});
  //           console.log("SAME HEIGHT TRUE!!!!")
  //         }

  //       }

      });
  });
    
    
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
    
    // !!! NEW FUNCTION
    //this function draws the vertical line graphics for the timeline
    $(function(){
      var $articleBlock = $(".article-block");
      var $timelineGfx = $('.timeline-gfx');                                                           
      var numArticles = $articleBlock.length
      
      var numRightArticles = numArticles/2;
      var numLeftArticles = numArticles - numRightArticles;
    
      var leftArticleBlocksTrace = [];
      var rightArticleBlocksTrace = [];
      
      /// left article blocks
      for ( arrayIdx = 0 ; arrayIdx < (numLeftArticles) ; arrayIdx++){
        leftArticleBlocksTrace.push(arrayIdx)
      }
      
      /// right article blocks
      for (arrayIdx = numLeftArticles; arrayIdx < (numRightArticles + numLeftArticles) ; arrayIdx++){
        rightArticleBlocksTrace.push(arrayIdx)
      }
      
      var idxTop = leftArticleBlocksTrace[0];
      var idxBot = rightArticleBlocksTrace[0];
      var leftTopState = true;
      
      var arrayIdx = 0;
      for (iter = 1 ; iter < (numArticles) ; iter++){
        var $topCircle = $('#timeline-circle-' + idxTop);
        var $botCircle = $('#timeline-circle-' + idxBot);
        
        var topCircleHeight = $topCircle.height();
        var topCirclePosition = $topCircle.position();
        var botCirclePosition = $botCircle.position();
        
        console.log("Circle dims: " + topCircleHeight + ' ' + topCirclePosition + ' ' + botCirclePosition);
        
        var timelinePositionTop = topCirclePosition.top + topCircleHeight;
        var timelineGfxLineHeight = Math.abs(botCirclePosition.top - timelinePositionTop);
        
        var styleArray = {
          height: timelineGfxLineHeight + 'px',
          top: timelinePositionTop + 'px',
          left: ($topCircle.css("left")) + $articleBlock.width()/2
        }
        
        console.log("Styles: " + styleArray.height + ' ' + styleArray.top)
        
        divTags = divGenerator('timeline-vertical-line-gfx', 
                               iter , 
                               styleArray);
        
        console.log("Top and Bottom circles were: " + idxTop + ' / ' + idxBot)
        console.log('divTags are: '  + divTags)
        
        $timelineGfx.append((divTags[0] + divTags[1]))
        
        // switches the numeric value of circle IDS to get the correct elements for the height and positioning calculations
        idxTop = idxBot;
        if (leftTopState){
          idxTop = idxBot;
          arrayIdx+=1;
          idxBot = leftArticleBlocksTrace[arrayIdx];  
          leftTopState = false;
        }  else {
          idxTop = idxBot;
          idxBot = rightArticleBlocksTrace[arrayIdx]
          leftTopState = true;  
        }
        console.log("leftArticleBlocksTrace is:" + leftArticleBlocksTrace)
        console.log("new idxTop and idxBot is: " + idxTop + ' / ' + idxBot)
      }
       
//         if (index >= 1){
//           var $height = $($currentCircle ).height();
//           var $position = $($currentCircle ).position();
//           var $marginBtm = $($currentCircle ).css("margin-bottom");
//           var $top = $($currentCircle ).css("top");

//           var lineHeight = Math.abs($($prevCircle).position().top- $position.top);
//           var linePosTop = $($prevCircle).height();

//           var styleArray = {
//             height :  lineHeight + 'px',
//             top:  linePosTop + 'px'}

//           var divTags = divGenerator("timeline-vertical-line-gfx",
//                                      index,
//                                      styleArray);

//           var verticalLineGfx = divTags[0] + divTags[1];
//           console.log("length is: " + $('.timeline-circle:nth-child(2n)').length)
//           console.log("circle bottom (height/pos/top): " + $height + ' ' + $position.top + ' ' + $top)
//           console.log("circle top (height/pos): " + $($prevCircle).height() + ' ' + $($prevCircle).position().top)
//           console.log("verticcal line gfx div: " + verticalLineGfx)
//           console.log("")

//           $($prevCircle).append(verticalLineGfx)
//           }
        
        
      });  
    
  };
  
  $( window ).resize(function(){
    // changes background color of body
    // $body.css('background-color' , "red");
  });
  
})();
//END OF CODE









// simple jquery request to a JS object to construct a formatted message that appends it to a specified div
// $(function(){
  
//   var $body = $("body");
//   var $articleElements = {
//     "2016" : {
//         1 : {
//         "title" : "Article Title",
//         "date" : "29-NOV-2016",
//         "article type": "Product Release",
//         "article content" : "This is the article content, it is quite impressive an spectacular"
//           }
      
//          }
//   };
  
//   // this will only execute once when document has been loaded.
//   $( window ).ready(function(){
//     var msg = "Default Message!!! <br>";
//     $('.article').append(msg);
    
//     // goes through each object in our JS object to print out content with format in mind
//    $.each($articleElements, function(key, value){
//       // interesting... if you define a var msg, it will define a new variable reference
//       // var msg = '<p> key: ' + key + ' and ' + 'value: ' + value + "</p>"; 
     
//       msg = 'Year: ' + key;
      
//      // creating msg to be displayed in div
//      $.each(this, function(key,value){
       
//        msg += "Title: " + this["title"] + '<br>'
//        msg += "Date: " + this["date"] + "<br>"
//        msg += "Article Type: " + this["article type"] + "<br>"
//        msg += "Article Content: " + this["article content"]
       
//        // $.each(this, function(key,value){
//        //      msg += " <br><strong>" + key + ":</strong>" + " " + value;
//        //    })
       
//        })
     
//     });
    
//     // appending msg to div of class article
//     $('.article').append(msg);
    
//   });
  
//   $( window ).resize(function(){
    
//     // changes background color of body
//     // $body.css('background-color' , "red");
    
//   });
  
// })();