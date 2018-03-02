set -e

if [[ -z "$*" ]]; then
  if [[ "$NODE_ENV" == "development" ]]; then
    echo -e "Running Dev Server"
    npm run migrate
    npm run forever&
    npm start
  else
    echo -e "Running Prod Server"
    npm run build
    npm run migrate
    npm run serve
  fi
else
  bash -c "$*"
fi
