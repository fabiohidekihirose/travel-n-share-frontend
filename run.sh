#!/bin/bash

docker build -t travel-n-share-frontend .

docker run --name travel-n-share-frontend -e NEXT_PUBLIC_API_URL="http://localhost:8000" -p 3000:3000 travel-n-share-frontend