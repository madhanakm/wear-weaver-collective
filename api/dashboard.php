<?php
session_start();

if (!isset($_SESSION['admin_logged_in']) || !$_SESSION['admin_logged_in']) {
    header('Location: login.php');
    exit;
}

$page = $_GET['page'] ?? 'contacts';
?>
<!DOCTYPE html>
<html>
<head>
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            margin: 0; 
            padding: 0; 
            background: #f9fafb;
            color: #374151;
        }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px 30px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
        .nav { background: white; padding: 0; border-bottom: 1px solid #e5e7eb; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
        .nav-container { display: flex; max-width: 1200px; margin: 0 auto; }
        .nav a { 
            display: inline-block; 
            padding: 16px 24px; 
            text-decoration: none; 
            color: #6b7280; 
            font-weight: 500; 
            border-bottom: 3px solid transparent;
            transition: all 0.3s ease;
            position: relative;
        }
        .nav a:hover { 
            color: #4f46e5; 
            background: #f8fafc;
        }
        .nav a.active { 
            color: #4f46e5; 
            border-bottom-color: #4f46e5;
            background: #f8fafc;
        }
        .content { 
            padding: 30px; 
            max-width: 1200px; 
            margin: 0 auto;
            background: #fafbfc;
            min-height: calc(100vh - 140px);
        }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; vertical-align: middle; }
        th { background-color: #f2f2f2; font-weight: bold; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        tr:hover { background-color: #f0f8ff; }
        button:hover { opacity: 0.8; transform: scale(1.05); transition: all 0.2s; }
        .logout { 
            color: white; 
            text-decoration: none; 
            background: rgba(255,255,255,0.2); 
            padding: 8px 16px; 
            border-radius: 6px; 
            transition: all 0.3s ease;
            font-weight: 500;
        }
        .logout:hover { 
            background: rgba(255,255,255,0.3); 
            transform: translateY(-1px);
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Admin Dashboard</h1>
        <a href="logout.php" class="logout">Logout</a>
    </div>
    
    <div class="nav">
        <div class="nav-container">
            <a href="?page=quotes" <?php echo $page === 'quotes' ? 'class="active"' : ''; ?>>
                <i class="fas fa-clipboard-list"></i> Quote Requests
            </a>
            <a href="?page=contacts" <?php echo $page === 'contacts' ? 'class="active"' : ''; ?>>
                <i class="fas fa-comments"></i> Contact Messages
            </a>
            <a href="?page=blog" <?php echo $page === 'blog' ? 'class="active"' : ''; ?>>
                <i class="fas fa-edit"></i> Blog Posts
            </a>
            <a href="?page=testimonials" <?php echo $page === 'testimonials' ? 'class="active"' : ''; ?>>
                <i class="fas fa-star"></i> Testimonials
            </a>
            <a href="?page=gallery" <?php echo $page === 'gallery' ? 'class="active"' : ''; ?>>
                <i class="fas fa-images"></i> Gallery
            </a>
            <a href="?page=clients" <?php echo $page === 'clients' ? 'class="active"' : ''; ?>>
                <i class="fas fa-handshake"></i> Clients
            </a>
            <a href="?page=password" <?php echo $page === 'password' ? 'class="active"' : ''; ?>>
                <i class="fas fa-key"></i> Change Password
            </a>
        </div>
    </div>
    
    <div class="content">
        <?php
        require_once 'config/database.php';
        
        $currentPage = $_GET['p'] ?? 1;
        $recordsPerPage = 10;
        $offset = ($currentPage - 1) * $recordsPerPage;
        $viewId = $_GET['view'] ?? null;
        
        try {
            $pdo = getDbConnection();
            
            if ($viewId && $page === 'contacts') {
                $stmt = $pdo->prepare("SELECT * FROM contacts WHERE id = ?");
                $stmt->execute([$viewId]);
                $contact = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($contact) {
                    echo "<a href='?page=contacts'>&larr; Back to Contacts</a>";
                    echo "<h2>Contact Details - ID: {$contact['id']}</h2>";
                    echo "<div style='background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;'>";
                    echo "<p><strong>Name:</strong> " . htmlspecialchars($contact['name']) . "</p>";
                    echo "<p><strong>Email:</strong> " . htmlspecialchars($contact['email']) . "</p>";
                    echo "<p><strong>Phone:</strong> " . htmlspecialchars($contact['phone']) . "</p>";
                    echo "<p><strong>Subject:</strong> " . htmlspecialchars($contact['subject']) . "</p>";
                    echo "<p><strong>Message:</strong><br>" . nl2br(htmlspecialchars($contact['message'])) . "</p>";
                    echo "<p><strong>Date:</strong> " . $contact['created_at'] . "</p>";
                    echo "</div>";
                }
                
            } elseif ($viewId && $page === 'quotes') {
                $stmt = $pdo->prepare("SELECT * FROM quotes WHERE id = ?");
                $stmt->execute([$viewId]);
                $quote = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($quote) {
                    echo "<a href='?page=quotes'>&larr; Back to Quotes</a>";
                    echo "<h2>Quote Details - ID: {$quote['id']}</h2>";
                    echo "<div style='background: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;'>";
                    echo "<p><strong>Name:</strong> " . htmlspecialchars($quote['name']) . "</p>";
                    echo "<p><strong>Email:</strong> " . htmlspecialchars($quote['email']) . "</p>";
                    echo "<p><strong>Phone:</strong> " . htmlspecialchars($quote['phone']) . "</p>";
                    echo "<p><strong>Company:</strong> " . htmlspecialchars($quote['company']) . "</p>";
                    echo "<p><strong>Product:</strong> " . htmlspecialchars($quote['product_type']) . "</p>";
                    echo "<p><strong>Quantity:</strong> " . htmlspecialchars($quote['quantity']) . "</p>";
                    echo "<p><strong>Message:</strong><br>" . nl2br(htmlspecialchars($quote['message'])) . "</p>";
                    echo "<p><strong>Date:</strong> " . $quote['created_at'] . "</p>";
                    echo "</div>";
                }
                
            } elseif ($page === 'quotes') {
                $countStmt = $pdo->query("SELECT COUNT(*) FROM quotes");
                $totalRecords = $countStmt->fetchColumn();
                $totalPages = ceil($totalRecords / $recordsPerPage);
                
                $stmt = $pdo->prepare("SELECT * FROM quotes ORDER BY created_at DESC LIMIT $recordsPerPage OFFSET $offset");
                $stmt->execute();
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                echo "<div style='display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;'>";
                echo "<h2>Quote Requests ($totalRecords total)</h2>";
                echo "<input type='text' id='searchQuotes' placeholder='Search quotes...' style='padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; width: 250px;' onkeyup='filterQuotes()'>";
                echo "</div>";
                
                if (count($data) > 0) {
                    echo "<table id='quotesTable'>";
                    echo "<tr><th>S. No</th><th>Name</th><th>Email</th><th>Company</th><th>Product</th><th>Date</th><th>Action</th></tr>";
                    
                    foreach ($data as $row) {
                        echo "<tr class='quote-row'>";
                        echo "<td>" . $row['id'] . "</td>";
                        echo "<td class='quote-name'>" . htmlspecialchars($row['name']) . "</td>";
                        echo "<td class='quote-email'>" . htmlspecialchars($row['email']) . "</td>";
                        echo "<td class='quote-company'>" . htmlspecialchars($row['company']) . "</td>";
                        echo "<td>" . htmlspecialchars($row['product_type']) . "</td>";
                        echo "<td>" . $row['created_at'] . "</td>";
                        echo "<td><a href='?page=quotes&view={$row['id']}' style='background: #28a745; color: white; border: none; padding: 6px 8px; border-radius: 4px; text-decoration: none; font-size: 14px;' title='View'><i class='fas fa-eye'></i></a></td>";
                        echo "</tr>";
                    }
                    echo "</table>";
                    
                    // Pagination
                    if ($totalPages > 1) {
                        echo "<div style='margin: 20px 0; text-align: center;'>";
                        for ($i = 1; $i <= $totalPages; $i++) {
                            $active = $i == $currentPage ? 'style="background: #007cba; color: white;"' : '';
                            echo "<a href='?page=quotes&p=$i' $active style='padding: 8px 12px; margin: 0 2px; text-decoration: none; border: 1px solid #ddd;'>$i</a>";
                        }
                        echo "</div>";
                    }
                } else {
                    echo "<p>No quote requests found.</p>";
                }
                
            } elseif ($page === 'contacts') {
                $countStmt = $pdo->query("SELECT COUNT(*) FROM contacts");
                $totalRecords = $countStmt->fetchColumn();
                $totalPages = ceil($totalRecords / $recordsPerPage);
                
                $stmt = $pdo->prepare("SELECT * FROM contacts ORDER BY created_at DESC LIMIT $recordsPerPage OFFSET $offset");
                $stmt->execute();
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                echo "<div style='display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;'>";
                echo "<h2>Contact Messages ($totalRecords total)</h2>";
                echo "<input type='text' id='searchContacts' placeholder='Search name or phone...' style='padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; width: 250px;' onkeyup='filterContacts()'>";
                echo "</div>";
                
                if (count($data) > 0) {
                    echo "<table id='contactsTable'>";
                    echo "<tr><th>S. No</th><th>Name</th><th>Email</th><th>Phone</th><th>Subject</th><th>Date</th><th>Action</th></tr>";
                    
                    foreach ($data as $row) {
                        echo "<tr class='contact-row'>";
                        echo "<td>" . $row['id'] . "</td>";
                        echo "<td class='contact-name'>" . htmlspecialchars($row['name']) . "</td>";
                        echo "<td>" . htmlspecialchars($row['email']) . "</td>";
                        echo "<td class='contact-phone'>" . htmlspecialchars($row['phone'] ?? 'N/A') . "</td>";
                        echo "<td>" . htmlspecialchars($row['subject']) . "</td>";
                        echo "<td>" . $row['created_at'] . "</td>";
                        echo "<td><a href='?page=contacts&view={$row['id']}' style='background: #28a745; color: white; border: none; padding: 6px 8px; border-radius: 4px; text-decoration: none; font-size: 14px;' title='View'><i class='fas fa-eye'></i></a></td>";
                        echo "</tr>";
                    }
                    echo "</table>";
                    
                    // Pagination
                    if ($totalPages > 1) {
                        echo "<div style='margin: 20px 0; text-align: center;'>";
                        for ($i = 1; $i <= $totalPages; $i++) {
                            $active = $i == $currentPage ? 'style="background: #007cba; color: white;"' : '';
                            echo "<a href='?page=contacts&p=$i' $active style='padding: 8px 12px; margin: 0 2px; text-decoration: none; border: 1px solid #ddd;'>$i</a>";
                        }
                        echo "</div>";
                    }
                } else {
                    echo "<p>No contact messages found.</p>";
                }
                
            } elseif ($page === 'quotes') {
                // Move quotes code here and add search
            } elseif ($page === 'contacts') {
                // Move contacts code here and add search  
            } elseif ($page === 'blog') {
                echo "<h2>Blog Management</h2>";
                echo "<div style='margin: 20px 0; display: flex; justify-content: space-between; align-items: center;'>";
                echo "<button onclick='showAddForm()' style='background: #007cba; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;'>Add New Post</button>";
                echo "<input type='text' id='searchPosts' placeholder='Search posts...' style='padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; width: 250px;' onkeyup='filterPosts()'>";
                echo "</div>";
                
                echo "<div id='addForm' style='display: none; background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px;'>";
                echo "<h3 id='formTitle'>Add New Blog Post</h3>";
                echo "<form onsubmit='savePost(event)'>";
                echo "<input type='hidden' id='postId' value=''>";
                echo "<input type='text' id='title' placeholder='Post Title' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;' required>";
                echo "<div style='margin: 10px 0;'>";
                echo "<label style='display: block; margin-bottom: 5px; font-weight: bold;'>Featured Image:</label>";
                echo "<input type='file' id='imageFile' accept='image/*' style='margin-bottom: 10px;' onchange='uploadImage()'>";
                echo "<input type='url' id='featured_image' placeholder='Or enter image URL' style='width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;'>";
                echo "<div id='imagePreview' style='margin-top: 10px;'></div>";
                echo "</div>";
                echo "<div id='editor' style='height: 300px; border: 1px solid #ddd; margin: 10px 0;'></div>";
                echo "<textarea id='content' style='display: none;'></textarea>";
                echo "<select id='status' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;'>";
                echo "<option value='draft'>Draft</option>";
                echo "<option value='published'>Published</option>";
                echo "</select>";
                echo "<button type='submit' style='background: #28a745; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;'>Save Post</button>";
                echo "<button type='button' onclick='cancelEdit()' style='background: #6c757d; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;'>Cancel</button>";
                echo "</form>";
                echo "</div>";
                
                echo "<script src='https://cdn.quilljs.com/1.3.6/quill.js'></script>";
                echo "<link href='https://cdn.quilljs.com/1.3.6/quill.snow.css' rel='stylesheet'>";
                
                $countStmt = $pdo->query("SELECT COUNT(*) FROM blog_posts");
                $totalRecords = $countStmt->fetchColumn();
                $totalPages = ceil($totalRecords / $recordsPerPage);
                
                $stmt = $pdo->prepare("SELECT * FROM blog_posts ORDER BY created_at DESC LIMIT $recordsPerPage OFFSET $offset");
                $stmt->execute();
                $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                if (count($posts) > 0) {
                    echo "<table id='postsTable'>";
                    echo "<tr><th>S. No</th><th>Title</th><th>Status</th><th>Created</th><th>Actions</th></tr>";
                    
                    foreach ($posts as $row) {
                        echo "<tr class='post-row'>";
                        echo "<td>" . $row['id'] . "</td>";
                        echo "<td class='post-title' style='max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'>" . htmlspecialchars($row['title']) . "</td>";
                        echo "<td><span style='padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; " . ($row['status'] === 'published' ? 'background: #d4edda; color: #155724;' : 'background: #f8d7da; color: #721c24;') . "'>" . ucfirst($row['status']) . "</span></td>";
                        echo "<td>" . date('M j, Y', strtotime($row['created_at'])) . "</td>";
                        echo "<td style='white-space: nowrap;'>";
                        echo "<button onclick='editPost({$row['id']})' style='background: #007cba; color: white; border: none; padding: 6px 8px; border-radius: 4px; margin-right: 5px; cursor: pointer; font-size: 14px;' title='Edit'><i class='fas fa-edit'></i></button>";
                        echo "<button onclick='if(confirm(\"Delete this post?\")) deletePost({$row['id']})' style='background: #dc3545; color: white; border: none; padding: 6px 8px; border-radius: 4px; cursor: pointer; font-size: 14px;' title='Delete'><i class='fas fa-trash'></i></button>";
                        echo "</td>";
                        echo "</tr>";
                    }
                    echo "</table>";
                    
                    // Pagination
                    if ($totalPages > 1) {
                        echo "<div style='margin: 20px 0; text-align: center;'>";
                        for ($i = 1; $i <= $totalPages; $i++) {
                            $active = $i == $currentPage ? 'style="background: #007cba; color: white;"' : '';
                            echo "<a href='?page=blog&p=$i' $active style='padding: 8px 12px; margin: 0 2px; text-decoration: none; border: 1px solid #ddd;'>$i</a>";
                        }
                        echo "</div>";
                    }
                } else {
                    echo "<p>No blog posts found.</p>";
                }
                
                echo "<script>";
                echo "let quill;";
                echo "document.addEventListener('DOMContentLoaded', function() {";
                echo "  quill = new Quill('#editor', { theme: 'snow' });";
                echo "});";
                echo "function uploadImage() {";
                echo "  const file = document.getElementById('imageFile').files[0];";
                echo "  if (!file) return;";
                echo "  const formData = new FormData();";
                echo "  formData.append('image', file);";
                echo "  fetch('https://ai.thinkaside.com/upload-image.php', {";
                echo "    method: 'POST',";
                echo "    body: formData";
                echo "  }).then(r => r.text()).then(text => {";
                echo "    console.log('Upload response:', text);";
                echo "    try {";
                echo "      const data = JSON.parse(text);";
                echo "      if (data.success) {";
                echo "        document.getElementById('featured_image').value = data.url;";
                echo "        document.getElementById('imagePreview').innerHTML = '<img src=\"' + data.url + '\" style=\"max-width: 200px; height: auto; border-radius: 4px;\">';";
                echo "      } else {";
                echo "        alert('Upload failed: ' + data.error);";
                echo "      }";
                echo "    } catch(e) {";
                echo "      alert('Upload error: ' + text);";
                echo "    }";
                echo "  }).catch(err => alert('Network error: ' + err));";
                echo "}";
                echo "function showAddForm() {";
                echo "  document.getElementById('formTitle').textContent = 'Add New Blog Post';";
                echo "  document.getElementById('postId').value = '';";
                echo "  document.getElementById('title').value = '';";
                echo "  document.getElementById('featured_image').value = '';";
                echo "  document.getElementById('imageFile').value = '';";
                echo "  document.getElementById('imagePreview').innerHTML = '';";
                echo "  quill.setContents([]);";
                echo "  document.getElementById('status').value = 'draft';";
                echo "  document.getElementById('addForm').style.display = 'block';";
                echo "}";
                echo "function editPost(id) {";
                echo "  fetch('https://ai.thinkaside.com/blog-api.php?path=admin/post/' + id)";
                echo "    .then(r => r.json())";
                echo "    .then(post => {";
                echo "      document.getElementById('formTitle').textContent = 'Edit Blog Post';";
                echo "      document.getElementById('postId').value = post.id;";
                echo "      document.getElementById('title').value = post.title;";
                echo "      document.getElementById('featured_image').value = post.featured_image || '';";
                echo "      document.getElementById('imageFile').value = '';";
                echo "      if (post.featured_image) {";
                echo "        document.getElementById('imagePreview').innerHTML = '<img src=\"' + post.featured_image + '\" style=\"max-width: 200px; height: auto; border-radius: 4px;\">';";
                echo "      } else {";
                echo "        document.getElementById('imagePreview').innerHTML = '';";
                echo "      }";
                echo "      quill.root.innerHTML = post.content;";
                echo "      document.getElementById('status').value = post.status;";
                echo "      document.getElementById('addForm').style.display = 'block';";
                echo "    });";
                echo "}";
                echo "function deletePost(id) {";
                echo "  fetch('https://ai.thinkaside.com/blog-api.php?path=delete/' + id, { method: 'DELETE' })";
                echo "    .then(() => location.reload());";
                echo "}";
                echo "function savePost(e) {";
                echo "  e.preventDefault();";
                echo "  const id = document.getElementById('postId').value;";
                echo "  const url = id ? 'https://ai.thinkaside.com/blog-api.php?path=update/' + id : 'https://ai.thinkaside.com/blog-api.php?path=create';";
                echo "  const method = id ? 'PUT' : 'POST';";
                echo "  fetch(url, {";
                echo "    method: method,";
                echo "    headers: {'Content-Type': 'application/json'},";
                echo "    body: JSON.stringify({";
                echo "      title: document.getElementById('title').value,";
                echo "      content: quill.root.innerHTML,";
                echo "      featured_image: document.getElementById('featured_image').value,";
                echo "      status: document.getElementById('status').value";
                echo "    })";
                echo "  }).then(() => location.reload());";
                echo "}";
                echo "function cancelEdit() {";
                echo "  document.getElementById('addForm').style.display = 'none';";
                echo "}";
                echo "function filterPosts() {";
                echo "  const searchTerm = document.getElementById('searchPosts').value.toLowerCase();";
                echo "  const rows = document.querySelectorAll('.post-row');";
                echo "  rows.forEach(row => {";
                echo "    const title = row.querySelector('.post-title').textContent.toLowerCase();";
                echo "    if (title.includes(searchTerm)) {";
                echo "      row.style.display = '';";
                echo "    } else {";
                echo "      row.style.display = 'none';";
                echo "    }";
                echo "  });";
                echo "}";

                echo "</script>";
                
            } elseif ($page === 'password') {
                if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['change_password'])) {
                    $current = $_POST['current_password'] ?? '';
                    $new = $_POST['new_password'] ?? '';
                    $confirm = $_POST['confirm_password'] ?? '';
                    
                    if (empty($current) || empty($new) || empty($confirm)) {
                        $pwd_error = 'All fields are required';
                    } elseif ($new !== $confirm) {
                        $pwd_error = 'New passwords do not match';
                    } elseif (strlen($new) < 6) {
                        $pwd_error = 'Password must be at least 6 characters';
                    } else {
                        $stmt = $pdo->prepare("SELECT password FROM admin_users WHERE username = ?");
                        $stmt->execute([$_SESSION['admin_username']]);
                        $user = $stmt->fetch(PDO::FETCH_ASSOC);
                        
                        if ($user && password_verify($current, $user['password'])) {
                            $stmt = $pdo->prepare("UPDATE admin_users SET password = ? WHERE username = ?");
                            $stmt->execute([password_hash($new, PASSWORD_DEFAULT), $_SESSION['admin_username']]);
                            $pwd_success = 'Password changed successfully!';
                        } else {
                            $pwd_error = 'Current password is incorrect';
                        }
                    }
                }
                
                echo "<h2>Change Password</h2>";
                echo "<div style='max-width: 500px; margin: 20px 0;'>";
                
                if (isset($pwd_success)) {
                    echo "<div style='background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #c3e6cb;'><i class='fas fa-check-circle'></i> $pwd_success</div>";
                }
                
                if (isset($pwd_error)) {
                    echo "<div style='background: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #f5c6cb;'><i class='fas fa-exclamation-circle'></i> $pwd_error</div>";
                }
                
                echo "<div style='background: linear-gradient(135deg, #f8fafc, #e2e8f0); padding: 40px; border-radius: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 1px solid #e2e8f0;'>";
                echo "<form method='POST' style='background: white; padding: 40px; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.08);'>";
                echo "<div style='text-align: center; margin-bottom: 30px;'>";
                echo "<div style='width: 60px; height: 60px; background: linear-gradient(135deg, #4f46e5, #7c3aed); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 15px;'><i class='fas fa-key' style='color: white; font-size: 24px;'></i></div>";
                echo "<h3 style='color: #1f2937; font-size: 24px; font-weight: 700; margin: 0;'>Change Password</h3>";
                echo "</div>";
                echo "<div style='margin-bottom: 25px;'>";
                echo "<label style='display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;'><i class='fas fa-lock' style='margin-right: 8px; color: #6b7280;'></i>Current Password</label>";
                echo "<input type='password' name='current_password' required style='width: calc(100% - 4px); padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.3s; background: #f9fafb; box-sizing: border-box;' onfocus='this.style.borderColor=\"#4f46e5\"; this.style.background=\"white\"' onblur='this.style.borderColor=\"#e5e7eb\"; this.style.background=\"#f9fafb\"'>";
                echo "</div>";
                echo "<div style='margin-bottom: 20px;'>";
                echo "<label style='display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;'><i class='fas fa-key' style='margin-right: 8px; color: #6b7280;'></i>New Password</label>";
                echo "<input type='password' name='new_password' required style='width: calc(100% - 4px); padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.3s; background: #f9fafb; box-sizing: border-box;' onfocus='this.style.borderColor=\"#4f46e5\"; this.style.background=\"white\"' onblur='this.style.borderColor=\"#e5e7eb\"; this.style.background=\"#f9fafb\"'>";
                echo "</div>";
                echo "<div style='margin-bottom: 30px;'>";
                echo "<label style='display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;'><i class='fas fa-check-circle' style='margin-right: 8px; color: #6b7280;'></i>Confirm New Password</label>";
                echo "<input type='password' name='confirm_password' required style='width: calc(100% - 4px); padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.3s; background: #f9fafb; box-sizing: border-box;' onfocus='this.style.borderColor=\"#4f46e5\"; this.style.background=\"white\"' onblur='this.style.borderColor=\"#e5e7eb\"; this.style.background=\"#f9fafb\"'>";
                echo "</div>";
                echo "<button type='submit' name='change_password' style='width: 100%; background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; padding: 12px 20px; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.3s;' onmouseover='this.style.transform=\"translateY(-1px)\"' onmouseout='this.style.transform=\"translateY(0)\"'><i class='fas fa-key' style='margin-right: 8px;'></i>Change Password</button>";
                echo "</form>";
                echo "</div>";
                echo "</div>";
                
            } elseif ($page === 'testimonials') {
                echo "<h2>Testimonials Management</h2>";
                echo "<div style='margin: 20px 0; display: flex; justify-content: space-between; align-items: center;'>";
                echo "<button onclick='showAddTestimonial()' style='background: #007cba; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;'>Add New Testimonial</button>";
                echo "<input type='text' id='searchTestimonials' placeholder='Search name or company...' style='padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; width: 250px;' onkeyup='filterTestimonials()'>";
                echo "</div>";
                
                echo "<div id='testimonialForm' style='display: none; background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px;'>";
                echo "<h3 id='testimonialFormTitle'>Add New Testimonial</h3>";
                echo "<form onsubmit='saveTestimonial(event)'>";
                echo "<input type='hidden' id='testimonialId' value=''>";
                echo "<input type='text' id='testimonialName' placeholder='Customer Name' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;' required>";
                echo "<input type='text' id='testimonialCompany' placeholder='Company (Optional)' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;'>";
                echo "<div id='testimonialEditor' style='height: 200px; border: 1px solid #ddd; margin: 10px 0;'></div>";
                echo "<textarea id='testimonialMessage' style='display: none;'></textarea>";
                echo "<select id='testimonialRating' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;'>";
                echo "<option value='5'>5 Stars</option>";
                echo "<option value='4'>4 Stars</option>";
                echo "<option value='3'>3 Stars</option>";
                echo "<option value='2'>2 Stars</option>";
                echo "<option value='1'>1 Star</option>";
                echo "</select>";
                echo "<select id='testimonialStatus' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;'>";
                echo "<option value='active'>Active</option>";
                echo "<option value='inactive'>Inactive</option>";
                echo "</select>";
                echo "<button type='submit' style='background: #28a745; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;'>Save</button>";
                echo "<button type='button' onclick='cancelTestimonial()' style='background: #6c757d; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;'>Cancel</button>";
                echo "</form>";
                echo "</div>";
                
                echo "<script src='https://cdn.quilljs.com/1.3.6/quill.js'></script>";
                echo "<link href='https://cdn.quilljs.com/1.3.6/quill.snow.css' rel='stylesheet'>";
                
                $stmt = $pdo->query("SELECT * FROM testimonials ORDER BY created_at DESC");
                $testimonials = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                if (count($testimonials) > 0) {
                    echo "<table id='testimonialsTable'>";
                    echo "<tr><th>S. No</th><th>Name</th><th>Company</th><th>Rating</th><th>Status</th><th>Date</th><th>Actions</th></tr>";
                    
                    foreach ($testimonials as $row) {
                        echo "<tr class='testimonial-row'>";
                        echo "<td>" . $row['id'] . "</td>";
                        echo "<td class='testimonial-name'>" . htmlspecialchars($row['name']) . "</td>";
                        echo "<td class='testimonial-company'>" . htmlspecialchars($row['company'] ?? 'N/A') . "</td>";
                        echo "<td>";
                        for ($i = 0; $i < $row['rating']; $i++) {
                            echo "<i class='fas fa-star' style='color: #ffc107;'></i>";
                        }
                        echo "</td>";
                        echo "<td><span style='padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; " . ($row['status'] === 'active' ? 'background: #d4edda; color: #155724;' : 'background: #f8d7da; color: #721c24;') . "'>" . ucfirst($row['status']) . "</span></td>";
                        echo "<td>" . date('M j, Y', strtotime($row['created_at'])) . "</td>";
                        echo "<td style='white-space: nowrap;'>";
                        echo "<button onclick='editTestimonial({$row['id']})' style='background: #007cba; color: white; border: none; padding: 6px 8px; border-radius: 4px; margin-right: 5px; cursor: pointer; font-size: 14px;' title='Edit'><i class='fas fa-edit'></i></button>";
                        echo "<button onclick='if(confirm(\"Delete this testimonial?\")) deleteTestimonial({$row['id']})' style='background: #dc3545; color: white; border: none; padding: 6px 8px; border-radius: 4px; cursor: pointer; font-size: 14px;' title='Delete'><i class='fas fa-trash'></i></button>";
                        echo "</td>";
                        echo "</tr>";
                    }
                    echo "</table>";
                } else {
                    echo "<p>No testimonials found.</p>";
                }
                
                echo "<script>";
                echo "let testimonialQuill;";
                echo "document.addEventListener('DOMContentLoaded', function() {";
                echo "  if (document.getElementById('testimonialEditor')) {";
                echo "    testimonialQuill = new Quill('#testimonialEditor', { theme: 'snow' });";
                echo "  }";
                echo "});";
                echo "function showAddTestimonial() {";
                echo "  document.getElementById('testimonialFormTitle').textContent = 'Add New Testimonial';";
                echo "  document.getElementById('testimonialId').value = '';";
                echo "  document.getElementById('testimonialName').value = '';";
                echo "  document.getElementById('testimonialCompany').value = '';";
                echo "  if (testimonialQuill) testimonialQuill.setContents([]);";
                echo "  document.getElementById('testimonialRating').value = '5';";
                echo "  document.getElementById('testimonialStatus').value = 'active';";
                echo "  document.getElementById('testimonialForm').style.display = 'block';";
                echo "}";
                echo "function editTestimonial(id) {";
                echo "  fetch('https://ai.thinkaside.com/testimonials-api.php?path=admin')";
                echo "    .then(r => r.json())";
                echo "    .then(data => {";
                echo "      const testimonial = data.find(t => t.id == id);";
                echo "      if (testimonial) {";
                echo "        document.getElementById('testimonialFormTitle').textContent = 'Edit Testimonial';";
                echo "        document.getElementById('testimonialId').value = testimonial.id;";
                echo "        document.getElementById('testimonialName').value = testimonial.name;";
                echo "        document.getElementById('testimonialCompany').value = testimonial.company || '';";
                echo "        if (testimonialQuill) testimonialQuill.root.innerHTML = testimonial.message;";
                echo "        document.getElementById('testimonialRating').value = testimonial.rating;";
                echo "        document.getElementById('testimonialStatus').value = testimonial.status;";
                echo "        document.getElementById('testimonialForm').style.display = 'block';";
                echo "      }";
                echo "    });";
                echo "}";
                echo "function deleteTestimonial(id) {";
                echo "  fetch('https://ai.thinkaside.com/testimonials-api.php?path=delete/' + id, { method: 'DELETE' })";
                echo "    .then(response => response.json())";
                echo "    .then(data => {";
                echo "      if (data.success) {";
                echo "        location.reload();";
                echo "      } else {";
                echo "        alert('Error: ' + (data.error || 'Failed to delete testimonial'));";
                echo "      }";
                echo "    })";
                echo "    .catch(err => alert('Network error: ' + err));";
                echo "}";
                echo "function saveTestimonial(e) {";
                echo "  e.preventDefault();";
                echo "  const id = document.getElementById('testimonialId').value;";
                echo "  const url = id ? 'https://ai.thinkaside.com/testimonials-api.php?path=update/' + id : 'https://ai.thinkaside.com/testimonials-api.php?path=create'";
                echo "  const method = id ? 'PUT' : 'POST';";
                echo "  fetch(url, {";
                echo "    method: method,";
                echo "    headers: {'Content-Type': 'application/json'},";
                echo "    body: JSON.stringify({";
                echo "      name: document.getElementById('testimonialName').value,";
                echo "      company: document.getElementById('testimonialCompany').value,";
                echo "      message: testimonialQuill ? testimonialQuill.root.innerHTML : '',";
                echo "      rating: document.getElementById('testimonialRating').value,";
                echo "      status: document.getElementById('testimonialStatus').value";
                echo "    })";
                echo "  }).then(() => location.reload());";
                echo "}";
                echo "function cancelTestimonial() {";
                echo "  document.getElementById('testimonialForm').style.display = 'none';";
                echo "}";
                echo "function filterTestimonials() {";
                echo "  const searchTerm = document.getElementById('searchTestimonials').value.toLowerCase();";
                echo "  const rows = document.querySelectorAll('.testimonial-row');";
                echo "  rows.forEach(row => {";
                echo "    const name = row.querySelector('.testimonial-name').textContent.toLowerCase();";
                echo "    const company = row.querySelector('.testimonial-company').textContent.toLowerCase();";
                echo "    if (name.includes(searchTerm) || company.includes(searchTerm)) {";
                echo "      row.style.display = '';";
                echo "    } else {";
                echo "      row.style.display = 'none';";
                echo "    }";
                echo "  });";
                echo "}";
                echo "</script>";
                
            } elseif ($page === 'gallery') {
                echo "<h2>Gallery Management</h2>";
                echo "<div style='margin: 20px 0; display: flex; justify-content: space-between; align-items: center;'>";
                echo "<button onclick='showAddGallery()' style='background: #007cba; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;'>Add New Image</button>";
                echo "<input type='text' id='searchGallery' placeholder='Search title or category...' style='padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; width: 250px;' onkeyup='filterGallery()'>";
                echo "</div>";
                
                echo "<div id='galleryForm' style='display: none; background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px;'>";
                echo "<h3 id='galleryFormTitle'>Add New Image</h3>";
                echo "<form onsubmit='saveGallery(event)'>";
                echo "<input type='hidden' id='galleryId' value=''>";
                echo "<input type='text' id='galleryTitle' placeholder='Image Title' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;' required>";
                echo "<div style='margin: 10px 0;'>";
                echo "<label style='display: block; margin-bottom: 5px; font-weight: bold;'>Image:</label>";
                echo "<input type='file' id='galleryImageFile' accept='image/*' style='margin-bottom: 10px;' onchange='uploadGalleryImage()'>";
                echo "<input type='url' id='galleryImageUrl' placeholder='Or enter image URL' style='width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;' required>";
                echo "<div id='galleryImagePreview' style='margin-top: 10px;'></div>";
                echo "</div>";
                echo "<select id='galleryCategory' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;'>";
                echo "<option value='general'>General</option>";
                echo "<option value='products'>Products</option>";
                echo "<option value='team'>Team</option>";
                echo "<option value='events'>Events</option>";
                echo "</select>";
                echo "<select id='galleryStatus' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;'>";
                echo "<option value='active'>Active</option>";
                echo "<option value='inactive'>Inactive</option>";
                echo "</select>";
                echo "<button type='submit' style='background: #28a745; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;'>Save</button>";
                echo "<button type='button' onclick='cancelGallery()' style='background: #6c757d; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;'>Cancel</button>";
                echo "</form>";
                echo "</div>";
                
                $stmt = $pdo->query("SELECT * FROM gallery ORDER BY created_at DESC");
                $gallery = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                if (count($gallery) > 0) {
                    echo "<table id='galleryTable'>";
                    echo "<tr><th>S. No</th><th>Image</th><th>Title</th><th>Category</th><th>Status</th><th>Date</th><th>Actions</th></tr>";
                    
                    foreach ($gallery as $row) {
                        echo "<tr class='gallery-row'>";
                        echo "<td>" . $row['id'] . "</td>";
                        echo "<td><img src='" . htmlspecialchars($row['image_url']) . "' style='width: 60px; height: 60px; object-fit: cover; border-radius: 4px;'></td>";
                        echo "<td class='gallery-title'>" . htmlspecialchars($row['title']) . "</td>";
                        echo "<td class='gallery-category'>" . htmlspecialchars($row['category']) . "</td>";
                        echo "<td><span style='padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; " . ($row['status'] === 'active' ? 'background: #d4edda; color: #155724;' : 'background: #f8d7da; color: #721c24;') . "'>" . ucfirst($row['status']) . "</span></td>";
                        echo "<td>" . date('M j, Y', strtotime($row['created_at'])) . "</td>";
                        echo "<td style='white-space: nowrap;'>";
                        echo "<button onclick='editGallery({$row['id']})' style='background: #007cba; color: white; border: none; padding: 6px 8px; border-radius: 4px; margin-right: 5px; cursor: pointer; font-size: 14px;' title='Edit'><i class='fas fa-edit'></i></button>";
                        echo "<button onclick='if(confirm(\"Delete this image?\")) deleteGallery({$row['id']})' style='background: #dc3545; color: white; border: none; padding: 6px 8px; border-radius: 4px; cursor: pointer; font-size: 14px;' title='Delete'><i class='fas fa-trash'></i></button>";
                        echo "</td>";
                        echo "</tr>";
                    }
                    echo "</table>";
                } else {
                    echo "<p>No gallery images found.</p>";
                }
                
                echo "<script>";
                echo "function uploadGalleryImage() {";
                echo "  const file = document.getElementById('galleryImageFile').files[0];";
                echo "  if (!file) return;";
                echo "  const formData = new FormData();";
                echo "  formData.append('image', file);";
                echo "  fetch('http://localhost/api/upload-image.php', {";
                echo "    method: 'POST',";
                echo "    body: formData";
                echo "  }).then(r => r.json()).then(data => {";
                echo "    if (data.success) {";
                echo "      document.getElementById('galleryImageUrl').value = data.url;";
                echo "      document.getElementById('galleryImagePreview').innerHTML = '<img src=\"' + data.url + '\" style=\"max-width: 200px; height: auto; border-radius: 4px;\">';";
                echo "    } else {";
                echo "      alert('Upload failed: ' + data.error);";
                echo "    }";
                echo "  });";
                echo "}";
                echo "function showAddGallery() {";
                echo "  document.getElementById('galleryFormTitle').textContent = 'Add New Image';";
                echo "  document.getElementById('galleryId').value = '';";
                echo "  document.getElementById('galleryTitle').value = '';";
                echo "  document.getElementById('galleryImageUrl').value = '';";
                echo "  document.getElementById('galleryImageFile').value = '';";
                echo "  document.getElementById('galleryImagePreview').innerHTML = '';";
                echo "  document.getElementById('galleryCategory').value = 'general';";
                echo "  document.getElementById('galleryStatus').value = 'active';";
                echo "  document.getElementById('galleryForm').style.display = 'block';";
                echo "}";
                echo "function editGallery(id) {";
                echo "  fetch('http://localhost/api/gallery-api.php?path=admin')";
                echo "    .then(r => r.json())";
                echo "    .then(data => {";
                echo "      const item = data.find(g => g.id == id);";
                echo "      if (item) {";
                echo "        document.getElementById('galleryFormTitle').textContent = 'Edit Image';";
                echo "        document.getElementById('galleryId').value = item.id;";
                echo "        document.getElementById('galleryTitle').value = item.title;";
                echo "        document.getElementById('galleryImageUrl').value = item.image_url;";
                echo "        document.getElementById('galleryImageFile').value = '';";
                echo "        document.getElementById('galleryImagePreview').innerHTML = '<img src=\"' + item.image_url + '\" style=\"max-width: 200px; height: auto; border-radius: 4px;\">';";
                echo "        document.getElementById('galleryCategory').value = item.category;";
                echo "        document.getElementById('galleryStatus').value = item.status;";
                echo "        document.getElementById('galleryForm').style.display = 'block';";
                echo "      }";
                echo "    });";
                echo "}";
                echo "function deleteGallery(id) {";
                echo "  fetch('http://localhost/api/gallery-api.php?path=delete/' + id, { method: 'DELETE' })";
                echo "    .then(r => r.json())";
                echo "    .then(data => {";
                echo "      if (data.success) {";
                echo "        location.reload();";
                echo "      } else {";
                echo "        alert('Error: ' + (data.error || 'Failed to delete image'));";
                echo "      }";
                echo "    });";
                echo "}";
                echo "function saveGallery(e) {";
                echo "  e.preventDefault();";
                echo "  const id = document.getElementById('galleryId').value;";
                echo "  const url = id ? 'http://localhost/api/gallery-api.php?path=update/' + id : 'http://localhost/api/gallery-api.php?path=create';";
                echo "  const method = id ? 'PUT' : 'POST';";
                echo "  fetch(url, {";
                echo "    method: method,";
                echo "    headers: {'Content-Type': 'application/json'},";
                echo "    body: JSON.stringify({";
                echo "      title: document.getElementById('galleryTitle').value,";
                echo "      image_url: document.getElementById('galleryImageUrl').value,";
                echo "      category: document.getElementById('galleryCategory').value,";
                echo "      status: document.getElementById('galleryStatus').value";
                echo "    })";
                echo "  }).then(() => location.reload());";
                echo "}";
                echo "function cancelGallery() {";
                echo "  document.getElementById('galleryForm').style.display = 'none';";
                echo "}";
                echo "function filterGallery() {";
                echo "  const searchTerm = document.getElementById('searchGallery').value.toLowerCase();";
                echo "  const rows = document.querySelectorAll('.gallery-row');";
                echo "  rows.forEach(row => {";
                echo "    const title = row.querySelector('.gallery-title').textContent.toLowerCase();";
                echo "    const category = row.querySelector('.gallery-category').textContent.toLowerCase();";
                echo "    if (title.includes(searchTerm) || category.includes(searchTerm)) {";
                echo "      row.style.display = '';";
                echo "    } else {";
                echo "      row.style.display = 'none';";
                echo "    }";
                echo "  });";
                echo "}";
                echo "</script>";
                
            } elseif ($page === 'clients') {
                echo "<h2>Clients Management</h2>";
                echo "<div style='margin: 20px 0; display: flex; justify-content: space-between; align-items: center;'>";
                echo "<button onclick='showAddClient()' style='background: #007cba; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;'>Add New Client</button>";
                echo "<input type='text' id='searchClients' placeholder='Search client name...' style='padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; width: 250px;' onkeyup='filterClients()'>";
                echo "</div>";
                
                echo "<div id='clientForm' style='display: none; background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px;'>";
                echo "<h3 id='clientFormTitle'>Add New Client</h3>";
                echo "<form onsubmit='saveClient(event)'>";
                echo "<input type='hidden' id='clientId' value=''>";
                echo "<input type='text' id='clientName' placeholder='Client Name' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;' required>";
                echo "<div style='margin: 10px 0;'>";
                echo "<label style='display: block; margin-bottom: 5px; font-weight: bold;'>Logo:</label>";
                echo "<input type='file' id='clientLogoFile' accept='image/*' style='margin-bottom: 10px;' onchange='uploadClientLogo()'>";
                echo "<input type='url' id='clientLogoUrl' placeholder='Or enter logo URL' style='width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;' required>";
                echo "<div id='clientLogoPreview' style='margin-top: 10px;'></div>";
                echo "</div>";
                echo "<select id='clientStatus' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;'>";
                echo "<option value='active'>Active</option>";
                echo "<option value='inactive'>Inactive</option>";
                echo "</select>";
                echo "<button type='submit' style='background: #28a745; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;'>Save</button>";
                echo "<button type='button' onclick='cancelClient()' style='background: #6c757d; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;'>Cancel</button>";
                echo "</form>";
                echo "</div>";
                
                $stmt = $pdo->query("SELECT * FROM clients ORDER BY created_at DESC");
                $clients = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                if (count($clients) > 0) {
                    echo "<table id='clientsTable'>";
                    echo "<tr><th>S. No</th><th>Logo</th><th>Name</th><th>Status</th><th>Date</th><th>Actions</th></tr>";
                    
                    foreach ($clients as $row) {
                        echo "<tr class='client-row'>";
                        echo "<td>" . $row['id'] . "</td>";
                        echo "<td><img src='" . htmlspecialchars($row['logo_url']) . "' style='width: 60px; height: 60px; object-fit: contain; border-radius: 4px;'></td>";
                        echo "<td class='client-name'>" . htmlspecialchars($row['name']) . "</td>";
                        echo "<td><span style='padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; " . ($row['status'] === 'active' ? 'background: #d4edda; color: #155724;' : 'background: #f8d7da; color: #721c24;') . "'>" . ucfirst($row['status']) . "</span></td>";
                        echo "<td>" . date('M j, Y', strtotime($row['created_at'])) . "</td>";
                        echo "<td style='white-space: nowrap;'>";
                        echo "<button onclick='editClient({$row['id']})' style='background: #007cba; color: white; border: none; padding: 6px 8px; border-radius: 4px; margin-right: 5px; cursor: pointer; font-size: 14px;' title='Edit'><i class='fas fa-edit'></i></button>";
                        echo "<button onclick='if(confirm(\"Delete this client?\")) deleteClient({$row['id']})' style='background: #dc3545; color: white; border: none; padding: 6px 8px; border-radius: 4px; cursor: pointer; font-size: 14px;' title='Delete'><i class='fas fa-trash'></i></button>";
                        echo "</td>";
                        echo "</tr>";
                    }
                    echo "</table>";
                } else {
                    echo "<p>No clients found.</p>";
                }
                
                echo "<script>";
                echo "function uploadClientLogo() {";
                echo "  const file = document.getElementById('clientLogoFile').files[0];";
                echo "  if (!file) return;";
                echo "  const formData = new FormData();";
                echo "  formData.append('image', file);";
                echo "  fetch('http://localhost/api/upload-image.php', {";
                echo "    method: 'POST',";
                echo "    body: formData";
                echo "  }).then(r => r.json()).then(data => {";
                echo "    if (data.success) {";
                echo "      document.getElementById('clientLogoUrl').value = data.url;";
                echo "      document.getElementById('clientLogoPreview').innerHTML = '<img src=\"' + data.url + '\" style=\"max-width: 200px; height: auto; border-radius: 4px;\">';";
                echo "    } else {";
                echo "      alert('Upload failed: ' + data.error);";
                echo "    }";
                echo "  });";
                echo "}";
                echo "function showAddClient() {";
                echo "  document.getElementById('clientFormTitle').textContent = 'Add New Client';";
                echo "  document.getElementById('clientId').value = '';";
                echo "  document.getElementById('clientName').value = '';";
                echo "  document.getElementById('clientLogoUrl').value = '';";
                echo "  document.getElementById('clientLogoFile').value = '';";
                echo "  document.getElementById('clientLogoPreview').innerHTML = '';";
                echo "  document.getElementById('clientStatus').value = 'active';";
                echo "  document.getElementById('clientForm').style.display = 'block';";
                echo "}";
                echo "function editClient(id) {";
                echo "  fetch('http://localhost/api/clients-api.php')";
                echo "    .then(r => r.json())";
                echo "    .then(data => {";
                echo "      const client = data.find(c => c.id == id);";
                echo "      if (client) {";
                echo "        document.getElementById('clientFormTitle').textContent = 'Edit Client';";
                echo "        document.getElementById('clientId').value = client.id;";
                echo "        document.getElementById('clientName').value = client.name;";
                echo "        document.getElementById('clientLogoUrl').value = client.logo_url;";
                echo "        document.getElementById('clientLogoFile').value = '';";
                echo "        document.getElementById('clientLogoPreview').innerHTML = '<img src=\"' + client.logo_url + '\" style=\"max-width: 200px; height: auto; border-radius: 4px;\">';";
                echo "        document.getElementById('clientStatus').value = client.status;";
                echo "        document.getElementById('clientForm').style.display = 'block';";
                echo "      }";
                echo "    });";
                echo "}";
                echo "function deleteClient(id) {";
                echo "  fetch('http://localhost/api/clients-api.php?id=' + id, { method: 'DELETE' })";
                echo "    .then(r => r.json())";
                echo "    .then(data => {";
                echo "      if (data.success) {";
                echo "        location.reload();";
                echo "      } else {";
                echo "        alert('Error: Failed to delete client');";
                echo "      }";
                echo "    });";
                echo "}";
                echo "function saveClient(e) {";
                echo "  e.preventDefault();";
                echo "  const id = document.getElementById('clientId').value;";
                echo "  const method = id ? 'PUT' : 'POST';";
                echo "  fetch('http://localhost/api/clients-api.php', {";
                echo "    method: method,";
                echo "    headers: {'Content-Type': 'application/json'},";
                echo "    body: JSON.stringify({";
                echo "      id: id,";
                echo "      name: document.getElementById('clientName').value,";
                echo "      logo_url: document.getElementById('clientLogoUrl').value,";
                echo "      status: document.getElementById('clientStatus').value";
                echo "    })";
                echo "  }).then(() => location.reload());";
                echo "}";
                echo "function cancelClient() {";
                echo "  document.getElementById('clientForm').style.display = 'none';";
                echo "}";
                echo "function filterClients() {";
                echo "  const searchTerm = document.getElementById('searchClients').value.toLowerCase();";
                echo "  const rows = document.querySelectorAll('.client-row');";
                echo "  rows.forEach(row => {";
                echo "    const name = row.querySelector('.client-name').textContent.toLowerCase();";
                echo "    if (name.includes(searchTerm)) {";
                echo "      row.style.display = '';";
                echo "    } else {";
                echo "      row.style.display = 'none';";
                echo "    }";
                echo "  });";
                echo "}";
                echo "</script>";
            }
            
            // Add search functions for all pages
            echo "<script>";
            echo "function filterQuotes() {";
            echo "  const searchTerm = document.getElementById('searchQuotes').value.toLowerCase();";
            echo "  const rows = document.querySelectorAll('.quote-row');";
            echo "  rows.forEach(row => {";
            echo "    const name = row.querySelector('.quote-name').textContent.toLowerCase();";
            echo "    const email = row.querySelector('.quote-email').textContent.toLowerCase();";
            echo "    const company = row.querySelector('.quote-company').textContent.toLowerCase();";
            echo "    if (name.includes(searchTerm) || email.includes(searchTerm) || company.includes(searchTerm)) {";
            echo "      row.style.display = '';";
            echo "    } else {";
            echo "      row.style.display = 'none';";
            echo "    }";
            echo "  });";
            echo "}";
            echo "function filterContacts() {";
            echo "  const searchTerm = document.getElementById('searchContacts').value.toLowerCase();";
            echo "  const rows = document.querySelectorAll('.contact-row');";
            echo "  rows.forEach(row => {";
            echo "    const name = row.querySelector('.contact-name').textContent.toLowerCase();";
            echo "    const phone = row.querySelector('.contact-phone').textContent.toLowerCase();";
            echo "    if (name.includes(searchTerm) || phone.includes(searchTerm)) {";
            echo "      row.style.display = '';";
            echo "    } else {";
            echo "      row.style.display = 'none';";
            echo "    }";
            echo "  });";
            echo "}";
            echo "</script>";
            
        } catch(PDOException $e) {
            echo "Database error: " . $e->getMessage();
        }
        ?>
    </div>
</body>
</html>