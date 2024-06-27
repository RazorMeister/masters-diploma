#!/bin/bash

CONTAINER="eu.gcr.io/diploma-427706/gke-comments:latest"

gcloud builds submit . --tag=${CONTAINER} --region=europe-west1
