const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/v1/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    // Khi Google trả về dữ liệu user
    const userData = {
        name: profile.displayName,
        email: profile.emails[0].value,
    };
    return done(null, userData);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

module.exports = passport;
