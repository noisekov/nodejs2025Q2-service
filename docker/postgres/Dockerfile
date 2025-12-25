FROM postgres:15-alpine

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD pg_isready -U $POSTGRES_USER || exit 1