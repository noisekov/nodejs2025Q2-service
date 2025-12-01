FROM postgres:15-alpine

COPY ./docker/postgres/init-scripts/ /docker-entrypoint-initdb.d/

RUN chmod a+r /docker-entrypoint-initdb.d/*

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD pg_isready -U $POSTGRES_USER || exit 1

