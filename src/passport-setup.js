const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Serialize user object to session
passport.serializeUser(function (user, done) {
    done(null, user);
});

// Deserialize user object from session
passport.deserializeUser(function (user, done) {
    // User.findById(id, (err, user) => {
    //   done(err, user);
    // });
    done(null, user);
});


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOLE_CALLBACK_URL,
    // scope: ['openid', 'email']
},
    function (accessToken, refreshToken, profile, done) {
        try {
            // Check if the profile email exists
            if (!profile.emails || !profile.emails[0] || !profile.emails[0].value) {
                throw new Error('Google profile email not found');
            }

            // Create a user object
            const user = {
                googleId: profile.id,
                displayName: profile.displayName,
                email: profile.emails[0].value
            };

            // Do something with the user object
            // console.log('User:', user);

            // Call the done function with the user object
            done(null, user);
        } catch (err) {
            done(err);
        }
        // This function will be called once the user has been authenticated
        // You can use the accessToken, refreshToken, and profile to authenticate the user in your app
        // console.log(profile);
        return done(null, profile);
    }
));
