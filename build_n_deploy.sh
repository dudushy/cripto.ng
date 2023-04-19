#! title preset
TITLE='[build_n_deploy.sh]'

echo $TITLE 'setup config...'
echo $TITLE '- - - - - - - - - - - - - - - - - - - - - - - - - -'
#* vars

PAGE_URL='https://dudushy.github.io/cripto.ng/'
echo $TITLE '- PAGE_URL=' $PAGE_URL

PROJECT_NAME='cripto.ng'
echo $TITLE '- PROJECT_NAME=' $PROJECT_NAME

COMMIT_MESSAGE='`build.sh`'
echo $TITLE '- COMMIT_MESSAGE=' $COMMIT_MESSAGE

echo $TITLE '- - - - - - - - - - - - - - - - - - - - - - - - - -'
echo $TITLE 'setup config done!'

#* main
echo $TITLE 'run'
# bash packages.sh
ng build --base-href $PAGE_URL
npx angular-cli-ghpages --dir=dist/$PROJECT_NAME --message=$COMMIT_MESSAGE

echo $TITLE 'finished.'
