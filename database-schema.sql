

CREATE TABLE salesorders (
  customer_number VARCHAR(5) DEFAULT NULL,
  plant_id INT DEFAULT NULL UNIQUE,
  PRIMARY KEY  (customer_),
  CONSTRAINT socn_unique UNIQUE (salesorder_number,customer_number),
  FOREIGN KEY (customer_number) REFERENCES customers (customer_number) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE customers (
  customer_number VARCHAR(5) NOT NULL UNIQUE,
  customer_name VARCHAR(20) NOT NULL,
  terms VARCHAR(20) NOT NULL,
  CONSTRAINT customers_unique UNIQUE (customer_number),
  PRIMARY KEY  (customer_number)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;



CREATE TABLE salesorders (
  customer_number VARCHAR(5) DEFAULT NULL,
  salesorder_number INT DEFAULT NULL UNIQUE,
  PRIMARY KEY  (salesorder_number),
  CONSTRAINT socn_unique UNIQUE (salesorder_number,customer_number),
  FOREIGN KEY (customer_number) REFERENCES customers (customer_number) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE invoices (
  invoice_number INT(5) AUTO_INCREMENT UNIQUE,
  salesorder_number INT(11) NOT NULL,
  invoice_date DATE NOT NULL,
  PRIMARY KEY  (invoice_number),
  FOREIGN KEY (salesorder_number) REFERENCES salesorders (salesorder_number) ON DELETE CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE invoice_detail (
  invoice_number INT(5) NOT NULL,
  invoice_amount INT(1) NOT NULL,
  PRIMARY KEY  (invoice_number),
  FOREIGN KEY (invoice_number) REFERENCES invoices (invoice_number) ON DELETE  CASCADE
)ENGINE=InnoDB DEFAULT CHARSET=utf8;



INSERT INTO customers VALUES ('MI000','City of Miami','Net 30');
INSERT INTO customers VALUES ('CI323','City of Mesa','Net 30');

INSERT INTO salesorders VALUES ('MI000', 1111);
INSERT INTO salesorders VALUES ('CI323', 2222);

INSERT INTO invoices VALUES (101,1111,'2017-02-03');
INSERT INTO invoices VALUES (101,2222,'2017-02-01');

INSERT INTO plant VALUES ('atlanta',1111);

INSERT INTO invoices VALUES (1000,1111,'2017-02-03');
INSERT INTO invoices VALUES (2000,1111,'2017-02-03');


INSERT INTO invoice_detail VALUES (1000,20000);
INSERT INTO invoice_detail VALUES (2000,40000);





select salesorders.customer_number, customers.customer_name from salesorders
INNER JOIN customers ON salesorders.customer_number = customers.customer_number
where customers.customer_number = 'MI000';

select invoices.invoice_number, customers.customer_name from invoices
INNER JOIN salesorders ON invoices.salesorder_number = salesorders.salesorder_number
INNER JOIN customers ON salesorders.customer_number = customers.customer_number;


select invoices.invoice_number, invoice_detail.invoice_amount, customers.customer_name from invoice_detail
INNER JOIN invoices ON invoice_detail.invoice_number = invoices.invoice_number
INNER JOIN salesorders ON invoices.salesorder_number = salesorders.salesorder_number
INNER JOIN customers ON salesorders.customer_number = customers.customer_number;


select customers.*, invoice_detail.* from customers, invoice_detail;


-- PULL CUSTOMER NUMBER, INVOICE NUMBER AND INVOICE AMOUNT
select customers.customer_number, invoices.invoice_number, ,invoice_detail.invoice_amount from customers, invoices, invoice_detail;

select customers.customer_number, invoices.invoice_number, invoice_detail.invoice_amount from customers, invoices, invoice_detail;



--for aging

CREATE TABLE invoices (
  customer_number VARCHAR(6) NOT NULL,
  customer_name VARCHAR(225) NOT NULL,
  invoice VARCHAR(225) NOT NULL,  
  invoice_date date NOT NULL,   
  due_date date,     
  salesorder_number VARCHAR(255),   
  invoice_amount DOUBLE NULL DEFAULT 0,
  amount_due DOUBLE NULL DEFAULT 0,  
  current_balance DOUBLE NULL DEFAULT 0,  
  past_due_1_30 DOUBLE NULL DEFAULT 0,  
  past_due_31_60 DOUBLE NULL DEFAULT 0,    
  past_due_61_90 DOUBLE NULL DEFAULT 0,
  over_90 DOUBLE NULL DEFAULT 0
)ENGINE=InnoDB DEFAULT CHARSET=utf8;





INSERT INTO invoices VALUES ('RI032 ', 'GFL ENVIRONMENTAL USA INC     ',  'AT151188OP', '12/28/2015', '01/01/15', "das0001000", '1000', 2000, 3000,-4000, 5000, 6000, 7000);


INSERT INTO invoices VALUES ('RI032 ', 'GFL ENVIRONMENTAL USA INC     ',  'AT151188OP', '12/28/2015', '01/27/2016', '            ', -40.01,-40.01,0,0,0,0,'');


INSERT INTO invoices VALUES ('RI032 ', 'GFL ENVIRONMENTAL USA INC     ',  'AT151188OP', '12/28/2015', '01/27/2016', '            ', -40.01,-40.01,0,0,0,0,40
INSERT INTO invoices VALUES ('RI032 ', 'GFL ENVIRONMENTAL USA INC     ',  'AT151188OP', '12/28/2015', '01/27/2016', '            ', '-40.01','-40.01', '0', '0', '0', '0', '-40.01');



--exporting to csv
SELECT *
FROM invoices
INTO OUTFILE '/var/lib/mysql-files/invoices2.csv'
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';



select customer_number AS 'Customer Number', customer_name AS 'Customer Name', sum(amount_due) AS 'Amount Due', sum(current_balance), sum(past_due_1_30) AS '1-30', sum(past_due_31_60) AS '31-60', sum(past_due_61_90) AS '61-90', sum(over_90) AS 'Over 90'  from invoices 
GROUP BY customer_number
ORDER BY sum(amount_due) DESC;


--export to mysql
mysql -u dmaynard83 -p aging < upload.sql



select sum(amount_due) AS 'Amount Due' from invoices where customer_number='MI000';


select format(sum(amount_due), 2) AS 'amtDue',
format(sum(past_due_1_30),2) AS 'pastDue130', 
format(sum(past_due_31_60),2) AS 'pastDue3160', 
format(sum(past_due_61_90),2) AS 'pastDue6190', 
format(sum(over_90), 2) AS 'over90', 
format(sum(current_balance), 2) AS 'currentBalance',
amtDue as 'totalBal',
format(sum(invoice_amount),2) AS invAmt from invoices where customer_number='MI000';