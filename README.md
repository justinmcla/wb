# Workbench
Workbench is a maintenance work order request ticketing system for public and privately-managed facilities. The back-end is supported by an administrative console and API built on Ruby on Rails. The front-end is a SPA built on vanilla JS, HTML, and CSS. All stylings are built on the UIkit frameworks.

## Getting Started

### Dependencies

##### SPA

The front-end should be able to be developed right out the box. I recommend either directly opening the `spa/index.html` file in the browser of your choice, or by using an HTTP server to serve the `spa` directory. If using `http-server` on `npm`, you must declare the directory to serve, such as `http-server ./` (assuming your `pwd` is `spa`), as it will default to serving the `public` directory. By default, `http-server` will be hosted on `8080`, so it will not conflict with `puma`, which defaults to `3000`.

##### API/Admin

Upon cloning to your local environment, run the following commands:

```Ruby
bundle install
rails db:create
rails db:migrate
rails db:seed
rails s
```

This will install all dependencies, set up the database, and spin up a server, hosted on `3000`.

##### File Uploads

AWS S3 is being utilized for file uploads. Contact justin@devjwm.net to set up credentials to access the S3 development bucket. Once credentials are obtained, create a `.env` file on your local environment within the `wb/wb/` directory and paste in your credentials as below:

```shell
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
```

These credentials will then be imported into the `config/storage.yml` file.

##### Database

The database is built on PostgreSQL. It is helpful, albeit not necessary, to utilize a database software that allows you to view and make changes to tables in the database.

### JavaScript Modules

The SPA JavaScript is organized by module functionality.

```javascript
/* public/js/api.js
Contains getter methods for all of the API endpoints. Any additional endpoints should be added to this file. Endpoints follow RESTful conventions, and getter method structure should maintain flexibility to work with each corresponding RESTful route.
*/

class API {
  ...
  static base() {
    return 'http://localhost:3000/api/v1'
  }

  static addresses() {
    return `${API.base()}/addresses`
  }
  ...
}

/* public/js/jwt.js
Contains getter and setter methods for JWTs. These are being stored in memory as the data they provide access to should not persist beyond a page refresh.
*/

class JWT {
  ...
  static get() {
    return this.token
  }

  static set(token) {
    this.token = token
  }
}

/* public/js/models.js
Contains all models and definitions.
*/

class Facility {
  ...
  constructor(attributes) {
    const whitelist = ['id', 'name', 'private']
    whitelist.forEach(attr => this[attr] = attributes[attr])
    Facility.collection().push(this)
  }
  ...
}

/* public/js/ui.js
Contains all handler logic for event listeners.
*/

// Insert file examples

/* public/js/listeners.js
Contains all event listeners
*/

// Insert file examples
```

### API Structure

##### Endpoints & Controllers

All API requests are handled through the API namespace, and versioned to ensure continuity between subsequent API iterations.

```ruby
# config/routes.rb

namespace :api do
  namespace :v1 do
    resources :facilities
  # . . .
  end
end
```

Thus, the base API URL is:

```html
http://localhost:3000/api/v1/
```

Endpoints follow RESTful conventions:

```ruby
# index
BASE_URL/facilities # returns all public facilities
BASE_URL/floors     # returns all floors for public facilities
BASE_URL/rooms      # returns all rooms for public facilities

# show
BASE_URL/rooms/:aid # returns specific room, based on :aid
```

### Admin Console

The Admin Console is built on Rails, and so it uses the built-in MVC model to render HTML.

##### Routes & Controllers

All routing for the admin console is within the admin namespace.

```ruby
# config/routes.rb

namespace :admin do
  get '/', to: 'admin#index' #
  # . . .
end
```

##### Layouts & Views

The default admin console layout is the standard `application.html.erb` layout file provided by Rails with a small modification. As Rails 6 now defaults to Webpacker to handle JavaScript files, the default layout file has been adjusted to incorporate stylesheets as well.

The `app/javascript/application.js` file has been modified to require a new `stylesheets/application.scss` file created in the `app/javascript` folder. <a href = 'https://www.getuikit.com'>UIkit</a> JavaScript is being imported here as well.

Within the new `application.scss` file, custom theme files are being imported along with the default <a href = 'https://www.getuikit.com'>UIkit</a> SCSS files.

## Contributing

Fork and clone this repository to your local environment. To keep things organized, please use the following naming system for new branches:

```shell
ft/bg - change - issue number
```

For example, a branch made to close this issue:

<strong><em>Issue #17 - Reset form button does not clear form</em></strong>

Should be named:

```shell
bg-resetbuttonfix-17
```

Pull requests will be reviewed as they are received. Contributions should be limited to bug fixes, unless the feature request is marked as cleared for contribution.

