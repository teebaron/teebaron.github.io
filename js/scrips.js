$(function(){
    const curDay = 24-days_to_xmas();
    const door_day = parseInt($("#door_day").text());
    // const curDay = 24;
    console.log("Today: " + curDay);
    console.log("door: " + door_day);
    console.log("days_to_xmas: " + days_to_xmas());
    console.log(curDay >= door_day);
    if(curDay === door_day || curDay > door_day){
        //today or past
    }else{
      window.location = "https://teebaron.github.io/error.html";
    }

    function days_to_xmas() {
      const xmas = new Date(2021,11,24);
      const now = new Date();

      // The number of milliseconds in one day
      const ONE_DAY = 1000 * 60 * 60 * 24;

      // Calculate the difference in milliseconds
      const diff = Math.ceil((xmas.getTime()-now.getTime())/(ONE_DAY));
      return diff;
      }
})


$.fn.shake = function(interval,distance,times){
    interval = typeof interval == "undefined" ? 100 : interval;
    distance = typeof distance == "undefined" ? 10 : distance;
    times = typeof times == "undefined" ? 3 : times;
    var jTarget = $(this);
    jTarget.css('position','relative');
    for(var iter=0;iter<(times+1);iter++){
        jTarget.animate({ left: ((iter%2==0 ? distance : distance*-1))}, interval);
    }
    return jTarget.animate({ left: 0},interval);
}


  $(function(){
  var ans_string = $('#ans_string').hide();
  var ans_string_sol = $('#ans_string_sol').hide();
  $(document)
  .ajaxStart(function () {
      // loading.show();
  }).ajaxStop(function () {
    // ans_string.hide();
    // ans_string_sol.hide();
  });

  //
  //
  
  $("button.btn-ans").on('click',function () {
      // var choice = $(this).find('input:radio').val();
      // $('#loadbar').show();
      // $('#quiz').fadeOut();

    
    if($(this).hasClass("ans_right")){
      console.log("ans_right");
      ans_string.text("Die Antwort ist richtig 🥳");
      $( "button.btn-ans" ).fadeOut(1000); 

      setTimeout(function(){
        ans_string.fadeIn(500);
        ans_string.fadeIn(500)
        ans_string_sol.fadeIn(500)
        }, 1000);
    }else{
      console.log("ans_wr2ong");
      $(this).shake(100,10,3);
      ans_string.show()
      ans_string_sol.hide()
      ans_string.text("Die Antwort ist falsch 😢");
      $('.btn-ans').fa
    }


    // $('.btn-ans').fadeOut();


      // setTimeout(function(){
    //      $( "#answer" ).html(  $(this).checking(choice) );      
    //       $('#quiz').show();
    //       $('#loadbar').fadeOut();
    //      /* something else */
      // }, 1500);
  });

  // $ans = 3;

  // $.fn.checking = function(ck) {
  //     if (ck != $ans)
  //         return 'INCORRECT';
  //     else 
  //         return 'CORRECT';
  // }; 
});	