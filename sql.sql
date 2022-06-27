CREATE TABLE "public".farma
("farmer-id" integer NOT NULL GENERATED ALWAYS AS IDENTITY (start 1),
 "first-name"        varchar(10) NULL,
 "last-name"         varchar(50) NULL,
 "number-of-animals" decimal(12,2) NULL,
 "mail"  varchar(50) NOT NULL,
 "phone" varchar(20) NULL,
 "password" varchar(50) NOT NULL,
 CONSTRAINT PK_Order PRIMARY KEY ( "farmer-id" ),
);


CREATE TABLE "public".symptoms
(
 "symptom-id" integer NOT NULL,
 "name" varchar(50) NOT NULL,
 "animal-id"  integer NOT NULL,
 CONSTRAINT PK_OrderItem PRIMARY KEY ( "symptom-id" ),
 CONSTRAINT FK_133 FOREIGN KEY ( "animal-id" ) REFERENCES "public".animal ( "animal-id" )
);

CREATE INDEX FK_135 ON "public".symptoms
(
 "animal-id"
);

CREATE TABLE "public".animals
(
 "animals-id"  integer NOT NULL GENERATED ALWAYS AS IDENTITY (
 start 1
 ),
 "animal-type" varchar(40) NOT NULL,
 "count"       varchar(20) NULL,
 CONSTRAINT PK_Supplier PRIMARY KEY ( "animals-id" ),
 CONSTRAINT AK1_Supplier_CompanyName UNIQUE ( "animal-type" )
);

COMMENT ON TABLE "public".animals IS 'Basic information 
about Supplier';


CREATE TABLE "public".animal
(
 "animal-id"  integer NOT NULL GENERATED ALWAYS AS IDENTITY (
 start 1
 ),
 name       varchar(50) NOT NULL,
 "animals-id" integer NOT NULL,
 "is-sick"    bit NOT NULL DEFAULT ((0)),
 CONSTRAINT PK_Product PRIMARY KEY ( "animal-id" ),
 CONSTRAINT AK1_Product_SupplierId_ProductName UNIQUE ( name, "animals-id" ),
 CONSTRAINT FK_Product_SupplierId_Supplier FOREIGN KEY ( "animals-id" ) REFERENCES "public".animals ( "animals-id" )
);

CREATE INDEX FK_Product_SupplierId_Supplier ON "public".animal
(
 "animals-id"
);

COMMENT ON TABLE "public".animal IS 'Basic information 
about Product';

