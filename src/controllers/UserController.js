require("dotenv").config();

let register = (req, res ,next) => {
  return res.send('Register');
};


let login = (req, res ,next) => {
  return res.send('login');
};

module.exports ={
  register: register,
  login: login,
};
