//connect npm mysql
var mysql = require("mysql");
//connect npm inquirer 
var inquirer = require("inquirer");
var Table = require('cli-table');

//constructor function to pass product, stock_quantity and price through as values later
var Customer = function (productKey, units) {
    this.productKey = productKey;
    this.units = units;
    this.price = function () {
        cost = this.units * unitPrice;
        console.log('Total Price = $' + cost);
    }

}

//connect to mysql database bamazon.sql
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

//error function
connection.connect(function (err) {
    if (err) throw err
    displayProducts();

});

function displayProducts() {
    connection.query('SELECT item_id, department_name, product_name , price FROM products', function (err, result) {
        if (err) console.log(err);


        //create table
        var table = new Table({
            title: ['BAMAZON'],
            head: ['Item Id#', 'Product Name', 'Price'],
            style: {
                head: ['blue'],
                compact: false,
                colAligns: ['center'],
            }

        });

        //loops through each item in the mysql database and pushes that information into a new row in the table
        for (var i = 0; i < result.length; i++) {
            table.push(
                [result[i].item_id, result[i].product_name, result[i].price]
            );
        }
        console.log(table.toString());
        buyProducts();
    })
};
//--------------------------------------------------

function buyProducts() {

    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'What is the id of the item you would like to buy?',
        },
        {
            type: 'input',
            name: 'qty',
            message: 'How many units of the product would you like to buy?',

        }
    ]).then(function (answers) {
        //console.log(answers);



        connection.query("SELECT * FROM products WHERE item_id = ? AND stock_quantity >= ?", [answers.item_id, answers.qty],
            function (err, result) {
                if (err) throw err;
                if (result[0] == undefined) {
                    console.log("Insufficient quantity at the store to place your order, please continue shopping");
                    displayProducts();
                    return;
                }

                //answers.item_id = the item id # of the product chosen
                //answers.qty = the amount the user would like to buy
                //result[0].product_name = the name of the product 

                //fulfill request
                console.log("---------------------------"); 
                console.log("Item Name: " + result[0].product_name + "\n" + "Amount: " + answers.qty);
                //check if store has enough
                //console.log("Amount in stock:" + result[0].stock_quantity);


                if (result[0].stock_quantity - answers.qty > 0) {

                    var amount_of_product = (result[0].stock_quantity - answers.qty);
                    //console.log(amount_of_product);
                    //console.log(answers.item_id);

                    //update stock


                    var update = connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: amount_of_product
                            },
                            {
                                item_id: answers.item_id
                            }
                        ],
                        //stock_quantity = " + amount_of_product + "WHERE item_id = " + answers.item_id,
                        function (error) {
                            if (error) throw err;
                            //console.log(query.sql);
                        }
                    );
                }

                //show total cost
                var cost = answers.qty * result[0].price;
                console.log("The total price is $" + cost);
                console.log("Thank you for shopping at Bamazon!");
                console.log("-----------------------------------------");

                connection.end();
            }
        )
    }


        

    );
}


        


