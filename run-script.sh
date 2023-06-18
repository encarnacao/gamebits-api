#!/bin/bash

set -e

npm run migration
npm run generate
npm start