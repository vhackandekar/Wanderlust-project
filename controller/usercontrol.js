const User=require('../model/user');

module.exports.registerUser=async (req, res) => {
  try {
  const {username, email, password } = req.body;
  // passport-local-mongoose is configured to use 'email' as the usernameField,
  // so ensure we pass the email as the document's username field when registering.
  await User.register(new User({ email, username }), password);
    req.flash('success', "User registered successfully!");
    res.redirect("/login");
  } catch (err) {
    req.flash('error', err.message);
    res.redirect("/register");
  }
}

module.exports.loginUser=(req, res) => {
  // prefer res.locals.returnTo (set by validurl) falling back to session or default
  const redirectUrl = res.locals.returnTo || req.session.returnTo || '/listing';
  // clear stored returnTo so it isn't reused
  try { delete req.session.returnTo; } catch (e) { /* ignore */ }
  req.flash('success', 'Logged in successfully!');
  res.redirect(redirectUrl);
}

module.exports.logoutUser=(req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash('success', 'You have been logged out.');
    res.redirect('/listing');
  });
}