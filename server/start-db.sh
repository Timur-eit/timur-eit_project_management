#!/bin/bash
set -e

SERVER="127.0.0.1";
PW="blablabla5";
DB="crud";
USERNAME="postgres";

echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
  -e PGPASSWORD=$PW \
  -p 5432:5432 \
  -d $USERNAME

# wait for pg to start
echo "sleep wait for pg-server [$SERVER] to start";
sleep 5;

# create the db
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U $USERNAME
echo "DROP TABLE public.projects;" | docker exec -i $SERVER psql -U $USERNAME

echo "CREATE TABLE public.projects(
    name character varying(255) COLLATE pg_catalog.'default' NOT NULL,
    code character varying(255) COLLATE pg_catalog.'default' NOT NULL,
    id integer NOT NULL DEFAULT nextval('public.projects_id_seq'::regclass),
    CONSTRAINT projects_pkey PRIMARY KEY (id)
)" | docker exec -i $SERVER psql -U $USERNAME

echo "TABLESPACE pg_default; " | docker exec -i $SERVER psql -U $USERNAME

echo "ALTER TABLE public.projects OWNER to postgres;" | docker exec -i $SERVER psql -U $USERNAME

echo "\l" | docker exec -i $SERVER psql -U $USERNAME