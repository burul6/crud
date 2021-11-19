// $("#FirstSearch").on("keyup input", function () {
  
//     if (this.value.length > 0) {
//       $("#toy-collection .card h2").hide('.card').filter(function () {
//         return $(this).text().toLowerCase().lastIndexOf($("#FirstSearch").val().toLowerCase(),0)==  0;
        
//       }).show();
//     }
//     else {
        
//       $(".card h2").show();
//     }
//     });

$('#searchBtn').click(function () {
    let value = $('#searchValue').val();
    
    let rg = /[a-zA-Z]+/gi;
    let ns = value.match(rg);
    $('.card-title').each(function() {
      let card = $(this).closest('.card');
      let text = $(this).text();
      text.includes(ns)? card.show() : card.hide();
    });
  });  

