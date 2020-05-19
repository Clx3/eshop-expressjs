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

CREATE TABLE rating(
  id int NOT NULL AUTO_INCREMENT,
  productId int NOT NULL,
  username varchar(50) NOT NULL,
  comment varchar(500),
  ratingValue float NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(productId) REFERENCES product(id)
);