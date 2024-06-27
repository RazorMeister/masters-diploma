#!/bin/bash

CONTAINER="eu.gcr.io/diploma-427706/run-posts:latest"

gcloud builds submit . --tag=${CONTAINER} --region=europe-west1

gcloud run deploy diploma-run-posts \
    --image=$CONTAINER  \
    --min-instances=1 \
    --max-instances=5 \
    --cpu=1 \
    --concurrency=30 \
    --memory=3Gi \
    --timeout=900 \
    --region=europe-west3 \
    --ingress=internal-and-cloud-load-balancing \
    --network=default \
    --subnet=default \
    --vpc-egress=all-traffic \
    --set-cloudsql-instances=diploma-427706:europe-west3:diploma-sql
