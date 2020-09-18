const express = require('express');
const User = require('../models/User');
const { generateEncryptedPassword, verifyPassword } = require('../utils/passwordManager');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.render('auth-views/signup');
});

const verifySignupData = async (req, res) => {
  const { fullName, email, cpf, password, confirmationPassword } = req.body;

  if (!fullName || !email || !cpf || !password || !confirmationPassword ) {
    const errors = {
      fullNameError: !fullName ? 'Campo nome obrigatório' : undefined,
      emailError: !email ? 'Campo email obrigatório' : undefined,
      cpfError: !cpf ? 'Campo CPF obrigatório' : undefined,
      passwordError: !password ? 'Campo senha obrigatório' : undefined,
      confirmationPasswordError: !confirmationPassword ? 'Campo confirmação de senha obrigatório' : undefined,
    };

    res.render('auth-views/signup', errors);

    return false;
  }

  if (password.length < 6) {
    const errors = {
      passwordError: password.length < 6 ? 'Sua senha deve ter no mínimo 6 dígitos' : undefined,
    };

    res.render('auth-views/signup', errors);

    return false;
  }

  if (!(password === confirmationPassword)) {
    const errors = {  
      passwordError: 'Senhas não conferem',
      confirmationPasswordError: 'Senhas não conferem',
    };

    res.render('auth-views/signup', errors);

    return false;
  }

  const userEmailExists = await User.find({ email });
  const userCpfExists = await User.find({ cpf });

  if (userEmailExists.length > 0 || userCpfExists.length > 0) {
    const errors = {
      emailError: userEmailExists.length > 0 ? 'Email já cadastrado' : undefined,
      cpfError: userCpfExists.length > 0 ? 'CPF já cadastrado' : undefined,
    };

    res.render('auth-views/signup', errors);

    return false;
  }

  return true;
};

router.post('/signup', async (req, res) => {
  try {
    const { fullName, email, cpf, password } = req.body;
    
    const idDataValid = await verifySignupData(req, res);

    if (!idDataValid) {
      return;
    }

    const newUser = new User({
      fullName,
      email,
      cpf,
      password: await generateEncryptedPassword(password),
    });

    await newUser.save();

    res.redirect('/login');
  } catch (error) {
    console.log(error);
  }
});

router.get('/login', (req, res) => {
  res.render('auth-views/login', req.query);
});

const verifyLoginData = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password ) {
    const errors = {
      emailError: !email ? 'Campo email obrigatório' : undefined,
      passwordError: !password ? 'Campo senha obrigatório' : undefined,
    };

    res.render('auth-views/login', errors);

    return false;
  }

  if (password.length < 6) {
    const errors = {
      passwordError: password.length < 6 ? 'Sua senha deve ter no mínimo 6 dígitos' : undefined,
    };

    res.render('auth-views/login', errors);

    return false;
  }

  const userExists = await User.findOne({ email });

  if (!userExists) {
    res.render('auth-views/login', { errorMessage: 'Usuário ou senha incorretos. Por favor tente novamente' });

    return false;
  }

  const isPasswordMatch = verifyPassword(password, userExists.password);

  if (!isPasswordMatch) {
    res.render('auth-views/login', { errorMessage: 'Usuário ou senha incorretos. Por favor tente novamente' });

    return false;
  }

  return userExists;
};

router.post('/login', async (req, res) => {
  try {
    const userAuthenticated = await verifyLoginData(req, res);

    if (!userAuthenticated) {
      return;
    }

    const userAuthCopy = JSON.parse(JSON.stringify(userAuthenticated));

    delete userAuthCopy.password;

    req.session.currentUser = userAuthCopy;

    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
  }
});

router.get('/logout',  (req, res) => {
  req.session.destroy();

  res.redirect('/login');
});

module.exports = router;
