---
templateKey: 'blog-post'
title: 'Save Database Query Result as a CSV'
date: 2020-06-01T21:52:10.000Z
description: >
  How to run a postgres query over ssh and save the result as a csv to your computer
---

The process, though simple, is somewhat confusing. We have XXX parts at play:

## Run command over SSH

Running command over SSH connection is quite simple. Just do
`ssh USER@ADDRESS:PORT "COMMAND"`. Add `-i` flag for entering private key file for connection

## Run postgres commands on one "line"

Postgres lets you run queries with a syntax like so:
`psql -d DATABASE -h HOST -U USER -c "QUERY"`

## Get postgres data to output in CSV

To get psql output as comma separated values, your query must be written like so.

`COPY (QUERY) TO STDOUT WITH CSV HEADER`

_I'm not sure why, but I've always used all caps on any kind of queries. Probably result of the way some first tutorials I happened to read were formatted. QUERY is still the part that needs to be edited, though._

## Write your query

Feel free to be creative. I'll just use `SELECT * FROM table` for the samples, 'cause almost midnight and I'm not in the mood of making funny sh*t up.

## Piping to a file

This is good ol' bash script stuff. Just do `COMMAND > FILENAME`

## Put it all together

Fancy hard-to-read one-liner, ladies and gentlemen:

`ssh SSHUSER@ADDRESS:PORT -i PATH/TO/KEY.pem 'psql -d DATABASE -h HOST -U DBUSER -c "COPY (SELECT * FROM table) TO STDOUT WITH CSV HEADER"' > PATH/TO/FILE.csv`

## Extra: Make it your own and save as a script

Memorising all that and all those hundreds of characters every time you want to play with some data seems stupid. Instead, save yourself some time and save this as a bash script:

`get-psql-data() {
  ssh SSHUSERR@ADDRESS:PORT -i PATH/TO/KEY.pem "psql -d DATABASE -h HOST -U DBUSER -c \"COPY ($1) TO STDOUT WITH CSV HEADER\"" > PATH/TO/FILE.csv
}`

Note $1 hiding over there instead of the demo-query we made. that tells bash script to use the first argument given. So, you can use the script like follows:

`$ get-psql-data "SELECT * FROM table"`

Also, with the file you write, you could get creative. You can remove `> PATH/TO/FILE.csv` from the end and do that manually every time, or pipe the csv to somewhere else if you'd like. I've just set my script to write its output to `~/tmp.csv`, which I can then use to my liking. I usually just upload these to Google Sheets for further processing anyway. Also, not changing the filename, I "auto-delete" old query results, which I think is a benefit.