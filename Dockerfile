
FROM hayd/alpine-deno:1.2.0

WORKDIR /app

# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache server.ts

CMD ["run", "--allow-net", "--allow-read", "--allow-write", "server.ts"]
