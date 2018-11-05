var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser')

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT);


var basicAuth = require('basic-auth-connect');
app.use(basicAuth('rehrig', 'pacific2'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

app.get('/',function(req,res,next){
    res.render('home');
});

app.get('/rawaging',function(req,res,next){
    res.render('allinvoices');
});

app.get('/invoices', function(req, res) {
  var content = {};
  mysql.pool.query("select customer_number, jde_customer_number, customer_name, format(sum(amount_due),2) AS amount, if (sum(current_balance) = 0, '-', format(sum(current_balance),2)) AS current_bal, if(sum(past_due_1_30) = 0, '-', format(sum(past_due_1_30),2)) AS pastdue_1_30, if(sum(past_due_31_60) = 0, '-', format(sum(past_due_31_60),2)) AS pastdue_31_60, if(sum(past_due_61_90) = 0, '-', format(sum(past_due_61_90),2)) AS pastdue_61_90, if(sum(over_90) = 0, '-', format(sum(over_90),2)) AS pastdue_over90, business_unit AS busUnit, rep as cusRep, netdays AS cusNetDays, custType AS cus_custType, custCode AS customerCode, custPO as cus_PO from invoices GROUP BY customer_number ORDER BY sum(amount_due) DESC", function(err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
      content.results = JSON.stringify(rows);
      res.send(content);
      console.log("summary page being accessed");
  });
});

app.get('/allinvoices', function(req, res) {
  var content = {};
  mysql.pool.query("select customer_name as cusName, customer_number, jde_customer_number, date_format(invoice_date, '%m/%d/%y') AS invDate, date_format(due_date, '%m/%d/%y') AS dueDate, salesorder_number, invoice, invoice_amount, current_balance, format(amount_due, 2) AS amtDue, invoice_amount AS invAmt, current_balance AS curBal, past_due_1_30 AS pastDue130, past_due_31_60 AS pastDue3160, past_due_61_90 AS pastDue6190, over_90 AS over90, business_unit AS busUnit, rep as cusRep, netdays AS cusNetDays, custType AS cus_custType, custCode AS customerCode, custPO as cus_PO from invoices", function(err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
      content.results = JSON.stringify(rows);
      res.send(content);
      console.log("allinvoices page being accessed");
  });
});


app.get('/get-a-workout', function(req, res) {
  var content = {};
  mysql.pool.query('SELECT customer_number, customer_name, invoice, date_format(invoice_date, "%m/%d/%y") AS invDate, date_format(due_date, "%m/%d/%y") AS dueDate, salesorder_number, format(invoice_amount, 2) AS invAmt, format(amount_due, 2) AS amtDue, format(current_balance, 2) AS curBal, format(past_due_1_30, 2) AS pastdue130, format(past_due_31_60,2) AS pastdue3160, format(past_due_61_90, 2) AS pastdue6190, format(over_90,2) AS over90, custPO as cus_PO FROM invoices WHERE customer_number=? order by invoice_date ASC', [req.query.customer_number], function(err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
      content.results = JSON.stringify(rows);
      res.send(content.results);
      console.log("customer page being accessed");
  });
});

app.get('/get_amountdue', function(req, res) {
  var content = {};
  mysql.pool.query("select format(sum(amount_due), 2) AS 'amtDue', format(sum(past_due_1_30),2) AS 'pastDue130', format(sum(past_due_31_60),2) AS 'pastDue3160', format(sum(past_due_61_90),2) AS 'pastDue6190', format(sum(over_90), 2) AS 'over90', format(sum(current_balance), 2) AS currentBalance, format(sum(invoice_amount),2) AS invAmt, format((sum(past_due_1_30) + sum(past_due_31_60) + sum(past_due_61_90) + sum(over_90)),2) as totalPastDue from invoices where customer_number=?", [req.query.customer_number], function(err, rows, fields) {
      if (err) {
        next(err);
        return;
      }
      content.results = JSON.stringify(rows);
      res.send(content.results);
  });
});

app.get('/submit',function(req,res,next){
  if (req.query.name != ''){
    var context = {};
    mysql.pool.query("INSERT INTO workouts (`name`, `weight`, `lbs`, `reps`, `date`) VALUES (?,?,?,?,?)",
    [req.query.name, req.query.weight, req.query.weightUnit, req.query.reps, req.query.date],
    function(err, result){
      if(err){
        next(err);
        return;
      }
      context.results = "Inserted id " + result.insertId;
      res.status(200).json(result.insertId);
    });
  }

});

app.get('/delete',function(req,res,next){
  var context = {};
  mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    res.render('home');
  });
});


app.get('/edit-row', function(req, res) {
      res.render('edit');
  });


app.get('/edit-save',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      mysql.pool.query("UPDATE workouts SET name=?, weight=?, lbs=?, reps=?, date=? WHERE id=? ",
        [req.query.name || curVals.name, req.query.weight || curVals.weight, req.query.lbs || curVals.lbs,
         req.query.reps || curVals.reps, req.query.date   || curVals.date, req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        res.render('home');
      });
    }
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
