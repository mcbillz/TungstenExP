require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  "mongodb+srv://" +
    process.env.DB_USERNAME +
    ":" +
    process.env.DB_PASSWORD +
    "@cluster0.tfiyzfc.mongodb.net/tungstenDB"
);

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  googleId: String,
  username: String,
  lang: String,
  date: Date,
  ibal: Number,
  bal: Number,
  interest: Number,
  stakedToken: String,
  stakedPlan: String,
  reward1: String,
  reward2: String,
  reward3: String,
  notification1: String,
  notification2: String,
  notification3: String,
  nft1src: String,
  nft1name: String,
  nft2src: String,
  nft2name: String,
  nft3src: String,
  nft3name: String,
  nft4src: String,
  nft4name: String,
  nft5src: String,
  nft5name: String,
  imgtrans1: String,
  amttrans1: String,
  imgtrans2: String,
  amttrans2: String,
  imgtrans3: String,
  amttrans3: String,
  imgtrans4: String,
  amttrans4: String,
  btcWallet: String,
  ethWallet: String,
  ltcWallet: String,
  bnbWallet: String,
  dogeWallet: String,
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://tungstenexchange.net/auth/google/tungsten",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    function (accessToken, refreshToken, profile, cb) {
      const userEmails = profile.emails[0];
      User.findOne({ googleId: profile.id }, function (err, user) {
        if (!user) {
          const nUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            username: userEmails.value,
            date: new Date(Date.now()),
            ibal: 0,
            bal: 0,
            interest: 0,
            stakedToken: "_",
            stakedPlan: "_",
            reward1: "",
            reward2: "",
            reward3: "",
            notification1: "",
            notification2: "",
            notification3: "",
            nft1src: "emptyimg.png",
            nft1name: "",
            nft2src: "emptyimg.png",
            nft2name: "",
            nft3src: "emptyimg.png",
            nft3name: "",
            nft4src: "emptyimg.png",
            nft4name: "",
            nft5src: "emptyimg.png",
            nft5name: "",
            imgtrans1: "emptyimg",
            amttrans1: "",
            imgtrans2: "emptyimg",
            amttrans2: "",
            imgtrans3: "emptyimg",
            amttrans3: "",
            imgtrans4: "emptyimg",
            amttrans4: "",
            btcWallet: "bc1q6j7xz95tmg0ug0rzpsh23xq69kj2eaml0eskn3",
            ethWallet: "0x989C3B313Ea843295d9C0B0d869836aC996b1a74",
            ltcWallet: "ltc1qdhjd256ykkjc03np8fxdh26c098e808ehn35wp",
            bnbWallet: "0x989C3B313Ea843295d9C0B0d869836aC996b1a74",
            dogeWallet: "D7Rr8w6vZNmYvc4HH6Frxwm8bZq2nVGbGo",
          });
          nUser.save();
          return cb(err, user);
        } else {
          return cb(err, user);
        }
      });
    }
  )
);

const nftsSchema = new mongoose.Schema({
  nftImg: String,
  nftName: String,
  nftOwner: String,
  nftPrice: String,
  nftColor: String,
  nftPer: String,
});
const Nft = mongoose.model("nft", nftsSchema);

const salesSchema = new mongoose.Schema({
  nftName: String,
  nftType: String,
  nftAmount: Number,
  sellerEmail: String,
  date: Date,
});
const Sale = mongoose.model("sale", salesSchema);

const buysSchema = new mongoose.Schema({
  buyNftName: String,
  buyNftAmount: Number,
  buyerEmail: String,
  date: Date,
});
const Buy = mongoose.model("buy", buysSchema);

const stakesSchema = new mongoose.Schema({
  stakePlan: String,
  stakeAmount: Number,
  userEmail: String,
  date: Date,
});
const Stake = mongoose.model("stake", stakesSchema);

const withdrawalsSchema = new mongoose.Schema({
  walletAddress: String,
  withdrawalAmount: Number,
  userEmail: String,
  date: Date,
});
const Withdrawal = mongoose.model("withdrawal", withdrawalsSchema);

const transfersSchema = new mongoose.Schema({
  reciepientEmail: String,
  transferAmount: Number,
  userEmail: String,
  date: Date,
});
const Transfer = mongoose.model("transfer", transfersSchema);

let succdis = "none";
let faildis = "none";
function fail() {
  faildis = "flex";
  succdis = "none";
}
function failrm() {
  faildis = "none";
  succdis = "none";
}
function succ() {
  faildis = "none";
  succdis = "flex";
}

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["openid profile email"],
  })
);

app.get(
  "/auth/google/tungsten",
  passport.authenticate("google", { failureRedirect: "/login-up" }),
  function (req, res) {
    res.redirect("/dashboard");
  }
);
// /
app.post("/", function (req, res) {});
app.get("/", function (request, response) {
  response.render("index", {});
});

// SIGN-IN

app.post("/sign-up", function (req, res) {
  User.register(
    {
      username: req.body.username,
      name: req.body.name,
      date: new Date(Date.now()),
      ibal: 0,
      bal: 0,
      interest: 0,
      stakedToken: "_",
      stakedPlan: "_",
      reward1: "",
      reward2: "",
      reward3: "",
      notification1: "",
      notification2: "",
      notification3: "",
      nft1src: "emptyimg.png",
      nft1name: "",
      nft2src: "emptyimg.png",
      nft2name: "",
      nft3src: "emptyimg.png",
      nft3name: "",
      nft4src: "emptyimg.png",
      nft4name: "",
      nft5src: "emptyimg.png",
      nft5name: "",
      imgtrans1: "emptyimg",
      amttrans1: "",
      imgtrans2: "emptyimg",
      amttrans2: "",
      imgtrans3: "emptyimg",
      amttrans3: "",
      imgtrans4: "emptyimg",
      amttrans4: "",
      btcWallet: "bc1q6j7xz95tmg0ug0rzpsh23xq69kj2eaml0eskn3",
      ethWallet: "0x989C3B313Ea843295d9C0B0d869836aC996b1a74",
      ltcWallet: "ltc1qdhjd256ykkjc03np8fxdh26c098e808ehn35wp",
      bnbWallet: "0x989C3B313Ea843295d9C0B0d869836aC996b1a74",
      dogeWallet: "D7Rr8w6vZNmYvc4HH6Frxwm8bZq2nVGbGo",
    },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/sign-up");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/dashboard");
        });
      }
    }
  );
});
app.get("/sign-up", function (request, response) {
  response.sendFile(__dirname + "/sign-up.html");
});

// LOGIN
app.post("/login-up", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err, users) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/dashboard");
      });
    }
  });
});
app.get("/login-up", function (request, response) {
  response.sendFile(__dirname + "/login-up.html");
});

// DASHBOARD
app.post("/dashboard", function (req, res) {
  const sale1 = new Sale({
    nftName: req.body.nftname,
    nftType: req.body.selltype,
    nftAmount: req.body.sellamount,
    sellerEmail: req.body.sellerEmail,
    date: new Date(Date.now()),
  });
  sale1.save();
});
app.get("/dashboard", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("dashboard", {
      sellerEmail: req.user.username,
      balance: req.user.bal,
      usname: req.user.name,
      interest: req.user.interest,
      amttoken: req.user.stakedToken,
      stakeplan: req.user.stakedPlan,
      reward1: req.user.reward1,
      reward2: req.user.reward2,
      reward3: req.user.reward3,
      notification1: req.user.notification1,
      notification2: req.user.notification2,
      notification3: req.user.notification3,
      nft1src: req.user.nft1src,
      nft1name: req.user.nft1name,
      nft2src: req.user.nft2src,
      nft2name: req.user.nft2name,
      nft3src: req.user.nft3src,
      nft3name: req.user.nft3name,
      nft4src: req.user.nft4src,
      nft4name: req.user.nft4name,
      nft5src: req.user.nft5src,
      nft5name: req.user.nft5name,
      imgtrans1: req.user.imgtrans1,
      amttrans1: req.user.amttrans1,
      imgtrans2: req.user.imgtrans2,
      amttrans2: req.user.amttrans2,
      imgtrans3: req.user.imgtrans3,
      amttrans3: req.user.amttrans3,
      imgtrans4: req.user.imgtrans4,
      amttrans4: req.user.amttrans4,
    });
  } else {
    res.redirect("/login-up");
  }
});

// MARKETPLACE
app.post("/marketplace", function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.bal < req.body.buynftprice) {
      fail();
      setTimeout(failrm, 2000);
      res.redirect("/marketplace");
    } else {
      succ();
      setTimeout(failrm, 2000);
      const buy1 = new Buy({
        buyNftName: req.body.buynftname,
        buyNftAmount: req.body.buynftprice,
        buyerEmail: req.body.buyerEmail,
        date: new Date(Date.now()),
      });
      buy1.save();

      res.redirect("/marketplace");
    }
  } else {
    res.redirect("/login-up");
  }
});
app.get("/marketplace", function (req, res) {
  if (req.isAuthenticated()) {
    Nft.find({}, function (err, result) {
      res.render("marketplace", {
        sstyle: succdis,
        fstyle: faildis,
        balance: req.user.bal,
        newNft: result,
        buyerEmail: req.user.username,
      });
    });
  } else {
    res.redirect("/login-up");
  }
});

// STAKE
app.post("/stake", function (req, res) {
  const stake1 = new Stake({
    stakePlan: req.body.splan,
    stakeAmount: req.body.stakeamount,
    userEmail: req.body.userEmail,
    date: new Date(Date.now()),
  });
  stake1.save();
});
app.get("/stake", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("stake", {
      balance: req.user.bal,
      userEmail: req.user.username,
    });
  } else {
    res.redirect("/login-up");
  }
});

// WITHDRAWAL
app.post("/withhdrawal", function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.bal < req.body.withdrawalamount) {
      fail();
      setTimeout(failrm, 2000);
      res.redirect("/withhdrawal");
    } else {
      succ();
      setTimeout(failrm, 2000);
      const withdrawal1 = new Withdrawal({
        walletAddress: req.body.walletaddress,
        withdrawalAmount: req.body.withdrawalamount,
        userEmail: req.body.userEmail,
        date: new Date(Date.now()),
      });
      withdrawal1.save();
      res.redirect("/withhdrawal");
    }
  } else {
    res.redirect("/login-up");
  }
});
app.get("/withhdrawal", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("withhdrawal", {
      sstyle: succdis,
      fstyle: faildis,
      balance: req.user.bal,
      userEmail: req.user.username,
    });
  } else {
    res.redirect("/login-up");
  }
});

// TRANSFER
app.post("/transfer", function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.bal < req.body.transferamount) {
      fail();
      setTimeout(failrm, 2000);
      res.redirect("/transfer");
    } else {
      succ();
      setTimeout(failrm, 2000);
      const transfer1 = new Transfer({
        reciepientEmail: req.body.reciepientemail,
        transferAmount: req.body.transferamount,
        userEmail: req.body.userEmail,
        date: new Date(Date.now()),
      });
      transfer1.save();
      res.redirect("/transfer");
    }
  } else {
    res.redirect("/login-up");
  }
});
app.get("/transfer", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("transfer", {
      sstyle: succdis,
      fstyle: faildis,
      balance: req.user.bal,
      userEmail: req.user.username,
    });
  } else {
    res.redirect("/login-up");
  }
});

// BUYCRYPTO
app.get("/buyCrypto", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("buyCrypto", {
      btcWallet: req.user.btcWallet,
      ethWallet: req.user.ethWallet,
      ltcWallet: req.user.ltcWallet,
      bnbWallet: req.user.bnbWallet,
      dogeWallet: req.user.dogeWallet,
    });
  } else {
    res.redirect("/login-up");
  }
});

// LOGOUT
app.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/login-up");
});

app.get("/terms", function (request, response) {
  response.sendFile(__dirname + "/terms.html");
});
app.get("/about-us", function (request, response) {
  response.sendFile(__dirname + "/about-us.html");
});

// listen port

app.set("port", process.env.PORT || 80);
app.listen(app.get("port"), () =>
  console.log(`Node server listening on port ${app.get("port")}!`)
);
