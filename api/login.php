<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    require_once 'config/database.php';
    
    try {
        $pdo = getDbConnection();
        
        $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_username'] = $username;
            header('Location: dashboard.php?page=contacts');
            exit;
        } else {
            $error = 'Invalid username or password';
        }
        
    } catch(PDOException $e) {
        $error = 'Database error: ' . $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Admin Login</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            min-height: 100vh; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            position: relative;
            overflow: hidden;
        }
        
        /* Animated Background */
        .bg-animation {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .floating-shape {
            position: absolute;
            background: rgba(255,255,255,0.1);
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
        }
        .floating-shape:nth-child(1) { width: 80px; height: 80px; top: 10%; left: 10%; animation-delay: 0s; }
        .floating-shape:nth-child(2) { width: 60px; height: 60px; top: 20%; right: 10%; animation-delay: 2s; }
        .floating-shape:nth-child(3) { width: 100px; height: 100px; bottom: 10%; left: 20%; animation-delay: 4s; }
        .floating-shape:nth-child(4) { width: 40px; height: 40px; bottom: 20%; right: 20%; animation-delay: 1s; }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .login-container { 
            background: rgba(255,255,255,0.95); 
            backdrop-filter: blur(10px);
            padding: 50px 40px; 
            border-radius: 20px; 
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 420px;
            position: relative;
            z-index: 10;
            border: 1px solid rgba(255,255,255,0.2);
        }
        
        .logo { 
            text-align: center; 
            margin-bottom: 30px; 
        }
        .logo-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 15px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            margin-bottom: 15px;
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
        
        h2 { 
            text-align: center; 
            color: #2d3748; 
            margin-bottom: 40px; 
            font-size: 28px;
            font-weight: 600;
        }
        
        .input-group {
            position: relative;
            margin-bottom: 25px;
        }
        
        input { 
            width: 100%; 
            padding: 15px 20px; 
            border: 2px solid #e2e8f0; 
            border-radius: 12px; 
            font-size: 16px;
            transition: all 0.3s ease;
            background: #f8fafc;
        }
        
        input:focus {
            outline: none;
            border-color: #667eea;
            background: white;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        button { 
            width: 100%; 
            padding: 15px; 
            background: linear-gradient(135deg, #667eea, #764ba2); 
            color: white; 
            border: none; 
            border-radius: 12px; 
            cursor: pointer; 
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s ease;
            margin-top: 10px;
        }
        
        button:hover { 
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }
        
        button:active {
            transform: translateY(0);
        }
        
        .error { 
            color: #e53e3e; 
            text-align: center; 
            margin-top: 15px;
            padding: 10px;
            background: #fed7d7;
            border-radius: 8px;
            font-size: 14px;
        }
        
        .info { 
            color: #718096; 
            text-align: center; 
            margin-top: 25px; 
            font-size: 14px;
            padding: 15px;
            background: #edf2f7;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <div class="bg-animation">
        <div class="floating-shape"></div>
        <div class="floating-shape"></div>
        <div class="floating-shape"></div>
        <div class="floating-shape"></div>
    </div>
    
    <div class="login-container">
        <div class="logo">
            <div class="logo-icon"><i class="fas fa-lock" style="color: white;"></i></div>
            <h2>Admin Panel</h2>
        </div>
        
        <form method="POST">
            <div class="input-group">
                <input type="text" name="username" placeholder="Username" required>
            </div>
            <div class="input-group">
                <input type="password" name="password" placeholder="Password" required>
            </div>
            <button type="submit">Sign In</button>
        </form>
        
        <?php if (isset($error)): ?>
            <div class="error"><i class="fas fa-exclamation-circle"></i> <?php echo $error; ?></div>
        <?php endif; ?>
        
        <div style="text-align: center; margin-top: 30px; color: #718096; font-size: 14px;">
            Developed By <strong>ThinkAside</strong>
        </div>
    </div>
</body>
</html>