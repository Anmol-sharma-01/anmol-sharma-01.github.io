# Run the portfolio with Docker

Install Docker with Linux container support. Docker Desktop works on Windows and macOS; Docker Engine works on Linux. The same source builds on x86-64 and ARM64 machines, including Apple Silicon and 64-bit Raspberry Pi systems. GitHub Pages continues to host the static site separately; it does not run Docker containers.

## Start

From this repository's folder:

```sh
docker compose up --build -d
```

Open **http://localhost:8080**. The first build downloads dependencies; later builds reuse cached layers. No Node.js installation, account, API key, or database is needed on the host.

```sh
docker compose ps
docker compose logs -f
docker compose down
```

The default address is only accessible on your own computer. To serve other devices or deploy on a server, set `HOST_BIND=0.0.0.0` in a local `.env` file. Set `PORT=8081` there if port 8080 is already occupied. Re-run `docker compose up -d` after changing these settings. On a public server, put HTTPS in front of the container using your hosting provider or a reverse proxy.

## Use plain Docker

```sh
docker build -t anmol-portfolio:local .
docker run -d --name anmol-portfolio -p 127.0.0.1:8080:8080 --read-only --tmpfs /tmp --cap-drop ALL --security-opt no-new-privileges:true anmol-portfolio:local
docker stop anmol-portfolio
docker rm anmol-portfolio
```

## Move a built image to another machine

```sh
docker save -o anmol-portfolio.tar anmol-portfolio:local
# Copy the tar file to the destination machine, then:
docker load -i anmol-portfolio.tar
docker run -d -p 8080:8080 anmol-portfolio:local
```

A single-platform image needs a matching CPU architecture. To prepare both common architectures on a builder with multi-platform support:

```sh
docker buildx build --platform linux/amd64,linux/arm64 --tag anmol-portfolio:local --load .
```

Multi-platform loading requires the containerd image store used by recent Docker Desktop versions. Older Docker installations can build on the destination machine, or push a multi-platform image to their own registry using `--push` instead of `--load`. No image is automatically published to a registry by this project.

## Container details

- A Node 22 build stage runs TypeScript checks, builds the site, and verifies the static export.
- The final image contains NGINX and static files; Node and build dependencies are left out.
- NGINX runs without root privileges on port 8080. Compose adds a read-only filesystem and a temporary writable `/tmp`.
- `/healthz` supplies the container health check. HTML revalidates on each visit; hashed JS/CSS assets cache long-term. Missing URLs return HTTP 404.
- `.dockerignore` excludes private preview configuration, Git history, local environment files, and generated files.

See [Docker multi-platform builds](https://docs.docker.com/build/building/multi-platform/) and [NGINX unprivileged images](https://github.com/nginx/docker-nginx-unprivileged).
