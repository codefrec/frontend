var bodyParser = require("body-parser");
var urlencodeParser = bodyParser.urlencoded({ extended: false });

var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

// const LocalStorage = require('node-localstorage').LocalStorage,
//   localStorage = new LocalStorage('./scratch');
// const localStorage = require("localStorage");
// This sets the mock adapter on the default instance
//var mock = new MockAdapter(axios);

const cookieParser = require("cookie-parser");

let users = [
  {
    id: 1,
    username: "admin",
    password: "123456",
    email: "admin@themesbrand.com",
  },
];

// Mock GET request to /users when param `searchText` is 'John'
// mock.onGet("/users", { params: { searchText: "John" } }).reply(200, {
//   users: users,
// });

module.exports = function (app) {
  app.use(cookieParser());
  // Inner Auth
  app.get("/auth-login", function (req, res) {
    res.locals = { title: "Login" };
    res.render("AuthInner/auth-login");
  });
  app.get("/auth-login-2", function (req, res) {
    res.locals = { title: "Login 2" };
    res.render("AuthInner/auth-login-2");
  });
  app.get("/auth-register", function (req, res) {
    res.locals = { title: "Register" };
    res.render("AuthInner/auth-register");
  });
  app.get("/auth-register-2", function (req, res) {
    res.locals = { title: "Register 2" };
    res.render("AuthInner/auth-register-2");
  });
  app.get("/auth-recoverpw", function (req, res) {
    res.locals = { title: "Recoverpw" };
    res.render("AuthInner/auth-recoverpw");
  });
  app.get("/auth-recoverpw-2", function (req, res) {
    res.locals = { title: "Recoverpw 2" };
    res.render("AuthInner/auth-recoverpw-2");
  });
  app.get("/auth-lock-screen", function (req, res) {
    res.locals = { title: "Lock Screen" };
    res.render("AuthInner/auth-lock-screen");
  });
  app.get("/auth-lock-screen-2", function (req, res) {
    res.locals = { title: "Lock Screen 2" };
    res.render("AuthInner/auth-lock-screen-2");
  });
  app.get("/auth-confirm-mail", function (req, res) {
    res.locals = { title: "Confirm Mail" };
    res.render("AuthInner/auth-confirm-mail");
  });
  app.get("/auth-confirm-mail-2", function (req, res) {
    res.locals = { title: "Confirm Mail 2" };
    res.render("AuthInner/auth-confirm-mail-2");
  });
  app.get("/auth-email-verification", function (req, res) {
    res.locals = { title: "Email verification" };
    res.render("AuthInner/auth-email-verification");
  });
  app.get("/auth-email-verification-2", function (req, res) {
    res.locals = { title: "Email verification 2" };
    res.render("AuthInner/auth-email-verification-2");
  });
  app.get("/auth-two-step-verification", function (req, res) {
    res.locals = { title: "Two step verification" };
    res.render("AuthInner/auth-two-step-verification");
  });
  app.get("/auth-two-step-verification-2", function (req, res) {
    res.locals = { title: "Two step verification 2" };
    res.render("AuthInner/auth-two-step-verification-2");
  });

  // Crypto
  app.get("/crypto-ico-landing", function (req, res) {
    res.locals = { title: "Crypto Ico Landing" };
    res.render("Crypto/crypto-ico-landing");
  });

  // Auth Pages

  app.get("/pages-maintenance", function (req, res) {
    res.locals = { title: "Pages Maintenance" };
    res.render("Pages/pages-maintenance");
  });
  app.get("/pages-comingsoon", function (req, res) {
    res.locals = { title: "Pages Comingsoon" };
    res.render("Pages/pages-comingsoon");
  });

  app.get("/pages-404", function (req, res) {
    res.locals = { title: "Pages 404" };
    res.render("Pages/pages-404");
  });
  app.get("/pages-500", function (req, res) {
    res.locals = { title: "Pages 500" };
    res.render("Pages/pages-500");
  });

  app.get("/register", function (req, res) {
    if (req.user) {
      res.redirect("Dashboard/index");
    } else {
      res.render("Auth/auth-register", {
        message: req.flash("message"),
        error: req.flash("error"),
      });
    }
  });

  app.post("/post-register", urlencodeParser, function (req, res) {
    let tempUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    users.push(tempUser);

    // Assign value in session
    sess = req.session;
    sess.user = tempUser;

    res.redirect("/");
  });

  app.get("/login", function (req, res) {
    res.render("Auth/auth-login", {
      message: req.flash("message"),
      error: req.flash("error"),
    });
  });

  app.post("/post-login", urlencodeParser, async function (req, res) {
    let body = {
      email: req.body.email,
      password: req.body.password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        body
      );

      res.cookie(
        "name=" +
          response.data.name +
          ";expires =" +
          Date.now() +
          99999999999999999999
      );
      res.cookie(
        "email=" +
          response.data.email +
          ";expires =" +
          Date.now() +
          99999999999999999999
      );

      if (response.data.profile)
        res.cookie(
          "profile=" +
            response.data.profile +
            ";expires =" +
            Date.now() +
            99999999999999999999
        );

      res.redirect("/");
    } catch (ex) {
      req.flash("error", "Incorrect email or password!");
      res.redirect("/login");
    }
  });

  app.get("/forgot-password", function (req, res) {
    res.render("Auth/auth-forgot-password", {
      message: req.flash("message"),
      error: req.flash("error"),
    });
  });

  app.post("/post-forgot-password", urlencodeParser, async (req, res) => {
    let body = {
      email: req.body.email,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/forget_password",
        body
      );
      console.log(response.data);
      req.flash("message", "We have e-mailed your password reset link!");
      res.redirect("/reset-pass");
      //res.json("Hello");
    } catch (ex) {
      req.flash("error", "Email Not Found !!");
      console.log(ex);
      res.redirect("/forgot-password");
    }
  });
  app.get("/reset-pass", function (req, res) {
    res.render("Auth/reset-pass", {
      message: req.flash("message"),
      error: req.flash("error"),
    });
  });
  //post-reset-pass
  app.post("/post-reset-pass", urlencodeParser, async (req, res) => {
    let body = {
      email: req.body.email,
      otp: req.body.resetpass,
      password: req.body.newpass,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/verify_otp",
        body
      );
      console.log(response.data);
      if (response.status == 200) {
        try {
          const response = await axios.post(
            "http://localhost:3000/api/v1/users/change_password",
            body
          );

          req.flash("message", response.data);
          res.redirect("/login");
        } catch (ex) {
          req.flash("error", "Email Not Found !!");

          res.redirect("/forgot-password");
        }
      }
    } catch (ex) {
      req.flash("error", "Email Not Found !!");
      res.redirect("/forgot-password");
    }
  });
  app.get("/logout", function (req, res) {
    // Assign  null value in session
    res.cookie("name=;" + "path='/';expires=" + new Date("01/01/1900"));

    res.cookie("email=;" + "path='/';expires=" + new Date("01/01/1900"));

    res.cookie("profile=;" + "path='/';expires=" + new Date("01/01/1900"));

    res.redirect("/login");
  });
};
