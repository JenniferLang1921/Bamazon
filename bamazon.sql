
DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    `item_id` INT(255) NOT NULL,
    `product_name` VARCHAR(255) NULL,
    `department_name` VARCHAR(255) NULL,
    `price` DECIMAL(10 , 2) NULL,
    `stock_quantity` INT(255) NULL,
    PRIMARY KEY (item_id)
);


INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Rocking Chair", "Furniture", 100, 50);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, "Doll", "Toys", 20, 50);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, "Pillow", "Home", 25, 50);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, "A Wrinkle In Time", "Books", 10, 50);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, "Rake", "Gardening", 30, 50);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, "Clock", "Home", 5, 50);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, "Apple Laptop", "Tech", 1000, 50);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, "Honda Minivan", "Vehicles", 20000, 50);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, "Red Dress", "Clothing", 20, 50);
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "Outdoor Adventure", "Perfume", 50, 50);

