#!/bin/bash

API="http://localhost:4741"
URL_PATH="/runs"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "run": {
      "date": "'"${DATE}"'",
      "distance": "'"${DISTANCE}"'",
      "pace": "'"${PACE}"'",
      "description": "'"${DESCRIPTION}"'"
    }
  }'

echo
