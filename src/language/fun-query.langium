grammar FunQuery

//// 1. SCHEMA LANGUAGE DEFINITION

entry FunQuerySchema:
  (modelElements += ModelElements)*;

ModelElements:
  Entity | Relationship | AlgebraicDataType;

AlgebraicDataType:
  SumType | ProductType | OpaqueType;

// Entity

Entity:
  'entity' (name = ID) '{'
    (fields += EntityField)* (',')?
  '}';

EntityField:
  (Attribute | EntityRelationship);

Attribute:
  (name = ID) ':' BasicDataType;

EntityRelationship:
  (name = ID) '->' (target = [Entity:ID]);

// Relationship
Relationship:
  (name = ID);

// Sum type

SumType:
  'sum' (name = ID) '=' SumConstructor ('|' right = SumConstructor)*;

SumConstructor:
  (name = ID);

// Product type

ProductType:
  'product' (name = ID) '{'
    (fields += Attribute)* (',')?
  '}';

// Opaque wrapper type (newtype)

OpaqueType:
  'opaque' 'type' (name = ID) '=' (wrappedType = BasicDataType);

// Basic data type

BasicDataType:
  StringType | IntegerType;

StringType: 
  'String' '(' (length = INT) ')';

terminal IntegerType: 'Integer';

//// 2. QUERY LANGUAGE DEFINITION


//// 3. GENERIC TERMINALS

hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
