Authenticating users inside a Facebook Canvas app
---

Facebook Canvas apps receive an HTTPS POST to the URL defined by the `Secure Canvas URL` setting in the Facebook app settings.

> App Settings

![Facebook Settings](http://s16.postimg.org/8jqaisnpx/app_settings2.png)

> Configuring Secure Canvas Url

As far as I know, Facebook has deprecated `Canvas Url` in favour of `Secure Canvas Url` and so requires setting up an SSL cert. You can produce a `self-signed certificate` with a command such as this: (don't set a password for a testing cert)
```bash
# Ubuntu
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout self_signed_ssl.key -out self_signed_ssl.crt
```

Then you must tell `express` to listen on another port, something like this:
```javascript
var certificate = {
  key: fs.readFileSync(path.resolve(__dirname, './self_signed_ssl.key'), 'utf8'),
  cert: fs.readFileSync(path.resolve(__dirname, './self_signed_ssl.crt'), 'utf8')
}

http.createServer(app).listen(3000);
https.createServer(certificate, app).listen(3001);
```

> Configuring Routes

This is the `Secure Canvas Url` route that Facebook will POST data to.

**Note** If this is the first time the app has seen this user then redirect to `failureRedirect`.

```javascript
app.post('/auth/facebook/canvas', 
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/auth/facebook/canvas/autologin' }));
```

We cannot forward the user to another URL via HTTP redirect so we have to use a client-side js **hack** instead.

```javascript
app.get('/auth/facebook/canvas/autologin', function( req, res ){
  res.send( '<!DOCTYPE html>' +
              '<body>' +
                '<script type="text/javascript">' +
                  'top.location.href = "/auth/facebook";' +
                '</script>' +
              '</body>' +
            '</html>' );
});
```
Please suggest a better solution: https://developers.facebook.com/docs/appsonfacebook/tutorial/#canvas

---

Now you should be able to navigate to your app page: https://apps.facebook.com/myapp/ and be prompted to approve the app. On subsequent visits you should be logged in automatically.

---

ref: https://github.com/jaredhanson/passport-facebook/issues/1
ref: https://github.com/jaredhanson/passport/issues/94