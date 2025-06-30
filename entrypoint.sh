#!/bin/sh

echo "⏳ Waiting for DB to be ready..."
npm run migrate

echo "✅ Migration complete. Starting app..."
exec npm start
