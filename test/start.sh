NODE_ENV=test CI_DB_USERNAME=apricot_test CI_DB_NAME=apricot_blog_test npx sequelize db:migrate:undo
NODE_ENV=test CI_DB_USERNAME=apricot_test CI_DB_NAME=apricot_blog_test npx sequelize db:migrate
NODE_ENV=test CI_DB_USERNAME=apricot_test CI_DB_NAME=apricot_blog_test npx sequelize db:seed:all
NODE_ENV=test CI_DB_USERNAME=apricot_test CI_DB_NAME=apricot_blog_test jest -i