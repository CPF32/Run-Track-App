#!/bin/bash

API="http://localhost:4741"
URL_PATH="/runs"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "run": {
      "date": "'"${DATE}"'",
      "distance": "'"${DISTANCE}"'",
      "time": "'"${TIME}"'",
      "description": "'"${DESCRIPTION}"'"
    }
  }'

  echo
