#!/bin/bash
 
docker compose build
docker compose up -d --force-recreate
docker logs -f cypress-tests
