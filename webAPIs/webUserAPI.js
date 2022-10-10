//Backend routing for web users

const express = require("express");
const router = express.Router();
const db = require("../dbUtils/DbConn");

const formatUtils = require("../dbUtils/FormatUtils");

const cors = require("cors");

//***Middleware start***

// "Cross-Origin Resource Sharing"
//allows us to make api calls
router.use(cors());

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//***Middleware end***

//get all user api
router.get("/listAllUsers", (req, res) => {
  //const sqlGet = "SELECT * FROM heroku_73fd5bf53ffabe9.web_user;";
  const sqlGet =
    "SELECT web_user_id, user_email, user_password, image, membership_fee, birthday, " +
    "web_user.user_role_id, user_role_type FROM web_user, user_role WHERE web_user.user_role_id = user_role.user_role_id " +
    "ORDER BY web_user_id";

 
    db.query(sqlGet, (req, result) => {
      
      if (result) {
        for (let i = 0; i < result.length; i++) {
          result[i] = formatUserObj(result[i]);
        }

        res.send(result);
      } else {
        const errMsg = {
          err:
            "Excetion thrown trying to extract data from result set: " +
            req.sqlMessage,
        };

        console.log(errMsg);
        res.send(errMsg);
      }
    });
    res.end();
});

//get single user by id
router.get("/getUser/:id", (req, res) => {
  const sqlGetId = `SELECT web_user_id, user_email, user_password, image, membership_fee, birthday, 
  web_user.user_role_id, user_role_type FROM web_user, user_role WHERE web_user_id=${req.params.id}
  AND web_user.user_role_id = user_role.user_role_id;`;

  db.query(sqlGetId, (err, result) => {
    if (result[0].membership_fee !== null) {
      result[0].membership_fee = formatUtils.formatCurrency(
        result[0].membership_fee
      );
    }

    if (result[0].birthday !== null) {
      result[0].birthday = formatUtils.formatBday(result[0].birthday);
    }

    res.send(result);
  });
  res.end();
});

function formatUserObj(userObj) {
  if (userObj.birthday == "0000-00-00") {
    userObj.birthday = "00/00/0000";
  } else if (userObj.birthday !== null) {
    userObj.birthday = formatUtils.formatBday(userObj.birthday);
  }

  if (userObj.membership_fee !== null) {
    userObj.membership_fee = formatUtils.formatCurrency(userObj.membership_fee);
  }

  return userObj;
}

//export router
module.exports = router;
