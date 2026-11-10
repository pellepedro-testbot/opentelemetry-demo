# Copyright The OpenTelemetry Authors
# SPDX-License-Identifier: Apache-2.0


FROM docker.io/library/python:3.14.8-alpine3.24@sha256:f6a589d43c42b9e7f7dc67a12d37132491f362859a5d750607710cc56da3bc72 AS build-venv

RUN apk update && \
    apk add gcc g++ linux-headers

COPY ./src/recommendation/requirements.txt requirements.txt

RUN python -m venv venv && \
    venv/bin/pip install --no-cache-dir --require-hashes -r requirements.txt

RUN venv/bin/opentelemetry-bootstrap -a install

FROM docker.io/library/python:3.14.8-alpine3.24@sha256:f6a589d43c42b9e7f7dc67a12d37132491f362859a5d750607710cc56da3bc72

COPY --from=build-venv /venv/ /venv/

WORKDIR /app

COPY ./src/recommendation/demo_pb2_grpc.py demo_pb2_grpc.py
COPY ./src/recommendation/demo_pb2.py demo_pb2.py
COPY ./src/recommendation/logger.py logger.py
COPY ./src/recommendation/metrics.py metrics.py
COPY ./src/recommendation/recommendation_server.py recommendation_server.py

ARG RECOMMENDATION_PORT=9001
EXPOSE ${RECOMMENDATION_PORT}
ENTRYPOINT [ "/venv/bin/opentelemetry-instrument", "/venv/bin/python", "recommendation_server.py" ]
