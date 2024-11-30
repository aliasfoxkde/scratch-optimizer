#!/bin/bash

# Exit on errors
set -e

echo "Downloading get-pip.py..."
curl -sSL https://bootstrap.pypa.io/get-pip.py -o get-pip.py

echo "Installing pip..."
if python get-pip.py; then
    echo "pip installed successfully."
else
    echo "pip installation failed." >&2
    exit 1
fi
