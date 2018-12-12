# Crypto Price Tracker

A react app to track crypto prices across multiple crypto exchanges


### Setting Up Oauth with Google

Go to console.developers.google.com/
- Create new project
- Click enable api and services
- Search 'google+' and select google+ api then enable
- Create an OAuth 2.0 client ID - only name is required - need domain for production environment
- Select your application from the credentials window
- Add javascript origin: localhost:5000
- Then add your callback: localhost:5000/auth/google/callback

### Setting Up Oauth with coinbase

- Go to developers.coinbase.com and sign into your account
- Select myapp button in upper right
- Scroll down and select new oauth2 application
- Create app and add permitted redirect URI

### Create Cloud based mongo db

- Go to mlab.com & register an account
- Select creat new and add db.
