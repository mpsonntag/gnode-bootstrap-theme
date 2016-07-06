#!/usr/bin/env bash

USER="nix"
HOST="projects.g-node.org"
TARGET_DIR="html"
SFTP="sftp -i deploy/key -o StrictHostKeyChecking=no ${USER}@${HOST}:${TARGET_DIR}"

if [ -z "${VERSION}" ]; then
    echo "Variable VERSION is not set"
    exit 1
fi

chmod go-rwx deploy/key
echo "Key fingerprint: `md5sum deploy/key`"
echo "Deploying now to ${HOST}:${TARGET_DIR}/gnode-bootstrap-theme/${VERSION}"

${SFTP} << EOF
mkdir gnode-bootstrap-theme
mkdir gnode-bootstrap-theme/${VERSION}
mkdir gnode-bootstrap-theme/${VERSION}/css
mkdir gnode-bootstrap-theme/${VERSION}/js
mkdir gnode-bootstrap-theme/${VERSION}/fonts
put -r build/* gnode-bootstrap-theme/${VERSION}/
bye
EOF
