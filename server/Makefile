#############################
# middleware
#############################
.PHONY: middleware.up
middleware.up:
	@docker compose up -d

.PHONY: middleware.down
middleware.down:
	@docker compose down

.PHONY: middleware.reset
middleware.reset:
	@docker compose down --remove-orphans -v
	@docker compose up -d

.PHONY: middleware.psql
middleware.psql:
	PGPASSWORD=pgpass psql -h localhost -p 5432 -U hono -d hono

#############################
# migration
#############################
.PHONY: migrate.diff.local
migrate.diff.local:
	@atlas schema diff \
		--from "postgres://hono:pgpass@localhost:5432/hono?sslmode=disable" \
		--to "file://schema.sql" \
		--dev-url docker://postgres/15/dev

.PHONY: migrate.apply.local
migrate.apply.local:
	@atlas schema apply \
		--url "postgres://hono:pgpass@localhost:5432/hono?sslmode=disable" \
		--to "file://schema.sql" \
		--dev-url docker://postgres/15/dev

.PHONY: migrate.seed.local
migrate.seed.local:
	PGPASSWORD=pgpass psql -h localhost -p 5432 -U hono -d hono -f seed.sql
