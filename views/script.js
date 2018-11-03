    

$(document).ready(function() {

    $("submit").on("click", function () {
        // alert('/imdb/?url='+$("#123").val());
        $('#btn').hide();
        $('#info').hide();
          $('#divMsg').show();
        var url = '/imdb/?url='+$("#123").val() ;
        $.ajax({
        type: 'GET',
        url: url,
        success: function(result) {
             
             // alert("Hello");
             // alert(result);
             console.log(result);
              $('#info').html(`
                <h1><strong>Movie Name</strong>    : ${result.Movie_Title}</h1>

                <h1><strong>Plot Summary</strong>  : ${result.Plot_Summary}</h1>

                <h1><strong>Director</strong>      :  ${result.Director}</h1>

                <h1><strong>Writer</strong>        : ${result.Writer}</h1>

                <h1><strong>Stars</strong>         : ${result.Stars}</h1>

                <h1><strong>Rating</strong>        : ${result.Rating}</h1>
                `);

              $('#btn').show();
              $('#info').show();
                $('#divMsg').hide();
        }
      });

    })

});

