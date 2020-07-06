---
templateKey: 'blog-post'
title: 'Calcuating Stuff With SQL'
date: 2020-07-07T11:00:23.000Z
description: >
  I always forget how it's done
---

I have to google how to do some basic SQL queries every single time. Next time, I'll look into this post, as it (hopefully) will work as my personal documentation and tutorial.

## Onwards

To count things on an SQL query is very simple. Just run a SELECT statement with COUNT() function:

```sql
SELECT COUNT(*) FROM table_name;
```

To make things a bit more interesting, we can use a GROUP BY clause, which splits our count by a specific row's values:

```sql
SELECT COUNT(row_name) FROM table_name GROUP BY row_name
```

Note: COUNT(row) instead of * ignores NULL values.

This is all fair and simple, now to more complex stuff (at least complex enough for me to not remember them).

Extending the previous example a bit, for illustrative purposes:

```sql
SELECT category_id, COUNT(category_id) FROM table_name GROUP BY category_id;
```

This should yield a result that shows the category ids and their counts. The issue is that ids are rarely interesting, but the actual names of the categories, and those tend to be stored in a separate table. This needs some expanding.

```sql
SELECT t.category_id, COUNT(t.category_id) FROM table_name AS t GROUP BY t.category_id
```

Nothing crazy there, giving a name to our table to allow for querying for multiple tables without namespace issues. Now, let's add another table:

```sql
SELECT
  t.category_id,
  c.name,
  COUNT(t.category_id)
FROM
  table_name AS t,
  category_table AS c
WHERE
  t.category_id = c.id
GROUP BY
  t.category_id
```

The idea is to get data from multiple tables and match those rows into something sensible. Selecting multiple tables and giving them names is as simple as putting some more tables to FROM statement. The interesting bit is that WHERE clause, which allows us to actually match the tables together.

This is all for now, I might expand later. Also, a word of caution: I've not done any sensible testing nor have I asked from anybody to check these. That means I'm like 65 % confident these are fine and won't break stuff. Please, don't just do the copypasta on your production database and blame me for screwing it up. It's on you.