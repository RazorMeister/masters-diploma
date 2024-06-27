#!/bin/bash

CONTAINER="eu.gcr.io/diploma-427706/gke-posts:latest"

gcloud builds submit . --tag=${CONTAINER} --region=europe-west1
