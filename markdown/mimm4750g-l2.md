## Databases

---

# What is a database?

* A systematic (structured) collection of data records for the purpose of retrieving records upon a query.
* Sequential storage:
  * Index cards, magnetic tape
  * Exhaustive search, but fast processing of a batch when you reach it
* Random access:
  * Retrieve a record using an index
  * Index has to be built, updated; slower to add new records.



---

# Tables

* A set of related data, where each record is represented by a *row* and each variable (field) appears in a *column*.
* For example:
  
| Key | Last name | Given names | Number of eyes |
|-----|-----------|-------------|----------------|
| 1   | Fry       | Philip J.   | 2              |
| 2   | Leela     | Turanga     | 1              |
| 3   | Rodriguez | Bender Bending | 2           |


---

# Database schema

* A formal model of how data are organized.
* Basically, how fields in different tables are related to each other.
* The defining characteristic of relational databases. 

<img src="/img/schema.png" width="400px"/>

---

# Relational databases

* A reltaional database is implemented with a *structured query language* (SQL).
* SQL is used to create, update, and query a relational database.
* First developed by IBM in 1980's, based on work by [Ted Codd](https://en.wikipedia.org/wiki/Edgar_F._Codd).
* Later other companies developed commercial implementations of SQL, such as Oracle.
* MySQL is an open-source implementation.
* Many languages now support SQL in different ways.

---

# Non-relational databases

* Although relational databases are very common, some agencies dealing with massive amounts of data have adopted a different approach.
* A non-relational database or *NoSQL* has no fixed database schema - great when database has to adapt to new demands.
* NoSQL allows the addition of new fields in real-time.
* Supports distributed computing (multiple servers/sites).

---

# Querying a database

* `SELECT` is an SQL command that returns one or more fields from records from one or more tables

```sql
select LAST_NAME from CHARACTERS where NUMBER_OF_EYES is 2
```

```console
Fry
Rodriguez
```

---

# Front-ends

* Most web pages are *dynamic content* - the information that gets displayed in your browser is the result of a database query.
* In contrast, the web resources for this class are *static* web pages that were rendered from text files in a format called *Markdown*.
* Code responsible for database transactions take place in the *back end*.
* The *front end* is what you see: a web interface with forms and other data from which the back-end will compose a query.

---

# Genbank

---

# Demonstrate a Genbank query

---

# In-class assignment
## Find an ID database

1. Record URL
2. Describe the database's focus/purpose.
3. Provide the number of records, if available.
4. Compose a simple query and describe it here.
5. Provide the first result of the simple query in (4).

---

# Suggested readings:
* https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=6359709


