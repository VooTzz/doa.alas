<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Login</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
</head>
<body class="login-page">
  <div class="login-container">
    <h2>Masuk / Daftar</h2>
    <input type="email" id="email" placeholder="Email">
    <input type="password" id="password" placeholder="Kata Sandi">
    <button id="manualLoginBtn">🔐 Masuk Manual</button>
    <button id="registerBtn">📝 Daftar Baru</button>
    <hr>
    <button id="googleLoginBtn">🔓 Masuk dengan Google</button>
  </div>

  <!-- Gunakan type="module" untuk import -->
  <script type="module" src="login.js"></script>
</body>
</html>
