# Data Collection

This document serves as a collection of SQL queries that have been created (or need to be created) for us to fetch the data needed to generate HCB Wrapped.

* Spending by location
  * By-user
  * By-org
  * Overall
* Spending by merchant
  * By-user
  * By-org
  * Overall
  ```sql
  -- forked from gary's old code, thanks gary!
  
  SELECT
  
  case
      when rst.stripe_transaction->'merchant_data'->>'name' similar to '(SQ|GOOGLE|TST|RAZ|INF|PayUp|IN|INT|\*)%'
          then trim(upper(rst.stripe_transaction->'merchant_data'->>'name'))
      else trim(upper(split_part(rst.stripe_transaction->'merchant_data'->>'name', '*', 1)))
  end
  as merchant_name, 
      (sum(amount_cents) / 100) * -1 as dollars_spent
  
  FROM "raw_stripe_transactions" rst
  GROUP BY
  
  case
      when rst.stripe_transaction->'merchant_data'->>'name' similar to '(SQ|GOOGLE|TST|RAZ|INF|PayUp|IN|INT|\*)%'
          then trim(upper(rst.stripe_transaction->'merchant_data'->>'name'))
      else trim(upper(split_part(rst.stripe_transaction->'merchant_data'->>'name', '*', 1)))
  end
  order by sum(amount_cents) * -1 desc
  LIMIT 100
  ```
* Spending by date
  * By-user
  * By-org
  * Overall
* A user's average receipt upload time
  * side note: is this even possible?

