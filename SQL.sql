CREATE SCHEMA IF NOT EXISTS eshop;

CREATE TABLE category(
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50),
  PRIMARY KEY(id)
);

CREATE TABLE product(
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50),
  description varchar(500),
  price double,
  categoryId int NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(categoryId) REFERENCES category(id)
);