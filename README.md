# FunQuery

A custom language that allows for the definition of a data model and for writing functional queries on this model. <br>
The data model combines parts of the relational data model (entities, relationships, keys) and abstract data types known from functional languages (sum, product, wrapper types). <br>
<br>
The language comes with a code generator that can generate from the functional queries the data access layer of backend applications relying on relational databases as storage.
The first supported generation target is Java with a jOOQ or QueryDSL.
