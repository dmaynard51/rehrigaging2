document.addEventListener("DOMContentLoaded", loadTable);

function loadTable() {
    $.ajax({
        type: 'GET',
        url: "https://rehrigaging.herokuapp.com/invoices",
        success: function (invoices) {
          //  drawRows(invoices);
        }
    })

}







/*
function d
Rows(invoices) {
    var obj = JSON.parse(invoices.results);

    if (invoices != 0)
    {
        for (var i = 0; i < obj.length; i++){
        var row = $("<tr id=" + obj[i].id + "/>");
        $("#table").append(row);
        row.append($("<td>" + obj[i].customer_number + "</td>"));
        row.append($("<td>" + obj[i].jde_customer_number + "</td>"));            
        row.append($("<td>" + obj[i].customer_name + "</td>"));
        row.append($("<td>" + obj[i].amount + "</td>"));
        row.append($("<td>" + obj[i].current_bal + "</td>"));       
        row.append($("<td>" + obj[i].pastdue_1_30 + "</td>"));
        row.append($("<td>" + obj[i].pastdue_31_60 + "</td>"));
        row.append($("<td>" + obj[i].pastdue_61_90 + "</td>"));
        row.append($("<td>" + obj[i].pastdue_over90 + "</td>"));           
        row.append($('<td><input type="submit" value="Invoices" onclick="edit(' + "'" +  obj[i].customer_number + "'" + ')"/>'));
        }
        
    }
}    */
        
$(document).ready(function() {
      if (window.location.pathname == '/') {
        var id = location.search.substring(17)
          console.log("test");
          console.log(id);

          
          
        $.ajax({
            type: 'GET',
            url: "https://rehrigaging.herokuapp.com/invoices",
            success: function (invoices) {
    var obj = JSON.parse(invoices.results);

    if (invoices != 0)
    {
        for (var i = 0; i < obj.length; i++){
        var row = $("<tr id=" + obj[i].id + "/>");
        $("#table").append(row);
        row.append($("<td>" + obj[i].customer_number + "</td>"));
        row.append($("<td>" + obj[i].jde_customer_number + "</td>"));        
        row.append($("<td>" + obj[i].customer_name + "</td>"));
        row.append($("<td>" + obj[i].amount + "</td>"));
        row.append($("<td>" + obj[i].current_bal + "</td>"));       
        row.append($("<td>" + obj[i].pastdue_1_30 + "</td>"));
        row.append($("<td>" + obj[i].pastdue_31_60 + "</td>"));
        row.append($("<td>" + obj[i].pastdue_61_90 + "</td>"));
        row.append($("<td>" + obj[i].pastdue_over90 + "</td>"));           
        row.append($("<td>" + obj[i].busUnit + "</td>"));
        row.append($("<td>" + obj[i].cusRep + "</td>"));      
        row.append($("<td>" + obj[i].cusNetDays + "</td>")); 
        row.append($("<td>" + obj[i].cus_custType + "</td>"));  
        row.append($("<td>" + obj[i].customerCode + "</td>"));               
        row.append($('<td><input type="submit" value="Invoices" onclick="edit(' + "'" +  obj[i].customer_number + "'" + ')"/>'));
        }
        
    }
           //drawCustomer(data);
            /*
            console.log("testing 2");
            var rowData = JSON.parse(data)[0];
            console.log(rowData.customer_number); 
            console.log(rowData.customer_name);  */



            }
        })
    }
 })



function drawCustomer(invoices) {
    
    var obj = JSON.parse(invoices);
    console.log(obj.length);

    if (invoices != 0)
    {


        for (var i = 0; i < obj.length; i++){

        var row = $("<tr id=" + obj[i].id + "/>");
        $("#table2").append(row);
        row.append($("<td>" + obj[i].invoice + "</td>"));
        row.append($("<td>" + obj[i].invDate + "</td>"));
        row.append($("<td>" + obj[i].dueDate + "</td>"));  
        row.append($("<td>" + obj[i].salesorder_number + "</td>"));
        row.append($("<td>" + obj[i].cus_PO + "</td>"));            
        row.append($("<td>" + obj[i].invAmt + "</td>"));
        row.append($("<td>" + obj[i].amtDue + "</td>"));
        row.append($("<td>" + obj[i].curBal + "</td>"));       
        row.append($("<td>" + obj[i].pastdue130 + "</td>"));
        row.append($("<td>" + obj[i].pastdue3160 + "</td>"));
        row.append($("<td>" + obj[i].pastdue6190 + "</td>"));
        row.append($("<td>" + obj[i].over90 + "</td>"));         

        }

    }
            var lastRow = $("<tr id=" + 'last' + "/>");
        $("#table2").append(lastRow);

    
    $("#billto").append(obj[0].customer_name);
    $("#csnumber").append(obj[0].customer_number);
    


}

function drawAmount(invoices) {


    var obj = JSON.parse(invoices);
    console.log(obj.length);

 
      $("#pastDue").append(obj[0].totalPastDue);
      $("#balancedue").append(obj[0].amtDue);
      $("#pastdue130").append(obj[0].pastDue130);      
      $("#pastDue3160").append(obj[0].pastDue3160);      
      $("#pastDue6190").append(obj[0].pastDue6190);   
      $("#pastDue91").append(obj[0].over90);         

    $("#last").append($("<td>"  + "</td>")); 
    $("#last").append($("<td>"  + "</td>")); 
    $("#last").append($("<td>"  + "</td>")); 
    $("#last").append($("<td>"  + "</td>"));     
    $("#last").append($("<td>" + 'Total:' + "</td>"));     
    $("#last").append($("<td>" + '$' + obj[0].invAmt + "</td>"));    
    $("#last").append($("<td>" + '$' + obj[0].amtDue + "</td>"));      
    $("#last").append($("<td>" + '$' + obj[0].currentBalance + "</td>"));
    $("#last").append($("<td>" + '$' + obj[0].pastDue130 + "</td>"));  
    $("#last").append($("<td>" + '$' + obj[0].pastDue3160 + "</td>"));    
    $("#last").append($("<td>" + '$' + obj[0].pastDue6190 + "</td>"));   
    $("#last").append($("<td>" + '$' + obj[0].over90 + "</td>"));       
    

}


 $(document).ready(function() {
      if (window.location.pathname == '/edit-row') {
        var id = location.search.substring(17)
          console.log("test");
          console.log(id);

          
          
        $.ajax({
            type: 'GET',
            url: "https://rehrigaging.herokuapp.com/get-a-workout?customer_number=" + id,
            success: function (data) {

           drawCustomer(data);
            /*
            console.log("testing 2");
            var rowData = JSON.parse(data)[0];
            console.log(rowData.customer_number); 
            console.log(rowData.customer_name);  */



            }
        })
            $.ajax({
            type: 'GET',
            url: "https://rehrigaging.herokuapp.com/get_amountdue?customer_number=" + id,
            success: function (data) {

           drawAmount(data);
            /*
            console.log("testing 2");
            var rowData = JSON.parse(data)[0];
            console.log(rowData.customer_number); 
            console.log(rowData.customer_name);  */



            }
        })        

    }
 })


$(document).ready(function() {
      if (window.location.pathname == '/rawaging') {
        var id = location.search.substring(17)
          console.log("test");
          console.log(id);

          
          
        $.ajax({
            type: 'GET',
            url: "https://rehrigaging.herokuapp.com/allinvoices",
            success: function (invoices) {
    var obj = JSON.parse(invoices.results);

    if (invoices != 0)
    {
        for (var i = 0; i < obj.length; i++){
        var row = $("<tr id=" + obj[i].id + "/>");
        $("#table").append(row);
        row.append($("<td>" + obj[i].customer_number + "</td>"));
        row.append($("<td>" + obj[i].cusName + "</td>"));             
        row.append($("<td>" + obj[i].jde_customer_number + "</td>"));   
        row.append($("<td>" + obj[i].invoice + "</td>"));          
        row.append($("<td>" + obj[i].invDate + "</td>"));
        row.append($("<td>" + obj[i].dueDate + "</td>"));  
        row.append($("<td>" + obj[i].salesorder_number + "</td>"));
        row.append($("<td>" + obj[i].invAmt + "</td>"));
        row.append($("<td>" + obj[i].amtDue + "</td>"));
        row.append($("<td>" + obj[i].curBal + "</td>"));       
        row.append($("<td>" + obj[i].pastDue130 + "</td>"));
        row.append($("<td>" + obj[i].pastDue3160 + "</td>"));
        row.append($("<td>" + obj[i].pastDue6190 + "</td>"));
        row.append($("<td>" + obj[i].over90 + "</td>"));    
        row.append($("<td>" + obj[i].busUnit + "</td>"));
        row.append($("<td>" + obj[i].cusRep + "</td>"));      
        row.append($("<td>" + obj[i].cusNetDays + "</td>")); 
        row.append($("<td>" + obj[i].cus_custType + "</td>"));  
        row.append($("<td>" + obj[i].customerCode + "</td>")); 
        row.append($("<td>" + obj[i].cus_PO + "</td>"));        
        }
        
    }



            }
        })
    }
 })

 
 
 
 

 
 



function edit(id) {
    $.ajax({
        type: 'GET',
        url: "https://rehrigaging.herokuapp.com/get-a-workout?customer_number=" + id,
        success: function (data) {
            var rowData = JSON.parse(data)[0];             
            window.location = "https://rehrigaging.herokuapp.com/edit-row?customer_number=" + id;

        }
    })
}

function getAmountDue(id) {
    $.ajax({
        type: 'GET',
        url: "https://rehrigaging.herokuapp.com/get_amountdue?customer_number=" + id,
        success: function (data) {
            var rowData = JSON.parse(data)[0];             
            window.location = "https://rehrigaging.herokuapp.com/edit-row?customer_number=" + id;

        }
    })
}



$(document).ready(function() {

  function exportTableToCSV($table, filename) {

    var $rows = $table.find('tr:has(td)'),

      // Temporary delimiter characters unlikely to be typed by keyboard
      // This is to avoid accidentally splitting the actual contents
      tmpColDelim = String.fromCharCode(11), // vertical tab character
      tmpRowDelim = String.fromCharCode(0), // null character

      // actual delimiter characters for CSV format
      colDelim = '","',
      rowDelim = '"\r\n"',

      // Grab text from table into CSV formatted string
      csv = '"' + $rows.map(function(i, row) {
        var $row = $(row),
          $cols = $row.find('td');

        return $cols.map(function(j, col) {
          var $col = $(col),
            text = $col.text();

          return text.replace(/"/g, '""'); // escape double quotes

        }).get().join(tmpColDelim);

      }).get().join(tmpRowDelim)
      .split(tmpRowDelim).join(rowDelim)
      .split(tmpColDelim).join(colDelim) + '"';

    // Deliberate 'false', see comment below
    if (false && window.navigator.msSaveBlob) {

      var blob = new Blob([decodeURIComponent(csv)], {
        type: 'text/csv;charset=utf8'
      });

      // Crashes in IE 10, IE 11 and Microsoft Edge
      // See MS Edge Issue #10396033
      // Hence, the deliberate 'false'
      // This is here just for completeness
      // Remove the 'false' at your own risk
      window.navigator.msSaveBlob(blob, filename);

    } else if (window.Blob && window.URL) {
      // HTML5 Blob        
      var blob = new Blob([csv], {
        type: 'text/csv;charset=utf-8'
      });
      var csvUrl = URL.createObjectURL(blob);

      $(this)
        .attr({
          'download': filename,
          'href': csvUrl
        });
    } else {
      // Data URI
      var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

      $(this)
        .attr({
          'download': filename,
          'href': csvData,
          'target': '_blank'
        });
    }
  }

  // This must be a hyperlink
  $(".export").on('click', function(event) {
    // CSV
    var args = [$('#HTMLtoPDF>table'), 'agingByAccount.csv'];

    exportTableToCSV.apply(this, args);

    // If CSV, don't do event.preventDefault() or return false
    // We actually need this to be a typical hyperlink
  });
});



$(document).ready(function() {

  function exportTableToCSV2($table, filename) {

    var $rows = $table.find('tr:has(td)'),

      // Temporary delimiter characters unlikely to be typed by keyboard
      // This is to avoid accidentally splitting the actual contents
      tmpColDelim = String.fromCharCode(11), // vertical tab character
      tmpRowDelim = String.fromCharCode(0), // null character

      // actual delimiter characters for CSV format
      colDelim = '","',
      rowDelim = '"\r\n"',

      // Grab text from table into CSV formatted string
      csv = '"' + $rows.map(function(i, row) {
        var $row = $(row),
          $cols = $row.find('td');

        return $cols.map(function(j, col) {
          var $col = $(col),
            text = $col.text();

          return text.replace(/"/g, '""'); // escape double quotes

        }).get().join(tmpColDelim);

      }).get().join(tmpRowDelim)
      .split(tmpRowDelim).join(rowDelim)
      .split(tmpColDelim).join(colDelim) + '"';

    // Deliberate 'false', see comment below
    if (false && window.navigator.msSaveBlob) {

      var blob = new Blob([decodeURIComponent(csv)], {
        type: 'text/csv;charset=utf8'
      });

      // Crashes in IE 10, IE 11 and Microsoft Edge
      // See MS Edge Issue #10396033
      // Hence, the deliberate 'false'
      // This is here just for completeness
      // Remove the 'false' at your own risk
      window.navigator.msSaveBlob(blob, filename);

    } else if (window.Blob && window.URL) {
      // HTML5 Blob        
      var blob = new Blob([csv], {
        type: 'text/csv;charset=utf-8'
      });
      var csvUrl = URL.createObjectURL(blob);

      $(this)
        .attr({
          'download': filename,
          'href': csvUrl
        });
    } else {
      // Data URI
      var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

      $(this)
        .attr({
          'download': filename,
          'href': csvData,
          'target': '_blank'
        });
    }
  }





  // This must be a hyperlink
  $(".export2").on('click', function(event) {
    // CSV
    var args = [$('#HTMLtoPDF2>table'), 'statement.csv'];

    exportTableToCSV2.apply(this, args);

    // If CSV, don't do event.preventDefault() or return false
    // We actually need this to be a typical hyperlink
  });
});


$(document).ready(function() {

  function exportTableToCSV3($table, filename) {

    var $rows = $table.find('tr:has(td)'),

      // Temporary delimiter characters unlikely to be typed by keyboard
      // This is to avoid accidentally splitting the actual contents
      tmpColDelim = String.fromCharCode(11), // vertical tab character
      tmpRowDelim = String.fromCharCode(0), // null character

      // actual delimiter characters for CSV format
      colDelim = '","',
      rowDelim = '"\r\n"',

      // Grab text from table into CSV formatted string
      csv = '"' + $rows.map(function(i, row) {
        var $row = $(row),
          $cols = $row.find('td');

        return $cols.map(function(j, col) {
          var $col = $(col),
            text = $col.text();

          return text.replace(/"/g, '""'); // escape double quotes

        }).get().join(tmpColDelim);

      }).get().join(tmpRowDelim)
      .split(tmpRowDelim).join(rowDelim)
      .split(tmpColDelim).join(colDelim) + '"';

    // Deliberate 'false', see comment below
    if (false && window.navigator.msSaveBlob) {

      var blob = new Blob([decodeURIComponent(csv)], {
        type: 'text/csv;charset=utf8'
      });

      // Crashes in IE 10, IE 11 and Microsoft Edge
      // See MS Edge Issue #10396033
      // Hence, the deliberate 'false'
      // This is here just for completeness
      // Remove the 'false' at your own risk
      window.navigator.msSaveBlob(blob, filename);

    } else if (window.Blob && window.URL) {
      // HTML5 Blob        
      var blob = new Blob([csv], {
        type: 'text/csv;charset=utf-8'
      });
      var csvUrl = URL.createObjectURL(blob);

      $(this)
        .attr({
          'download': filename,
          'href': csvUrl
        });
    } else {
      // Data URI
      var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

      $(this)
        .attr({
          'download': filename,
          'href': csvData,
          'target': '_blank'
        });
    }
  }

  // This must be a hyperlink
  $(".export3").on('click', function(event) {
    // CSV
    var args = [$('#HTMLtoPDF3>table'), 'rawAging.csv'];

    exportTableToCSV3.apply(this, args);

    // If CSV, don't do event.preventDefault() or return false
    // We actually need this to be a typical hyperlink
  });
});

function printDiv(divName) {
     var printContents = document.getElementById(divName).innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;
}


