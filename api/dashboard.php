<?php
session_start();

if (!isset($_SESSION['admin_logged_in']) || !$_SESSION['admin_logged_in']) {
    header('Location: login.php');
    exit;
}

// API Configuration
// Load centralized URL configuration
require_once 'config/urls.php';

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
        .sidebar { 
            position: fixed; 
            left: 0; 
            top: 0; 
            width: 280px; 
            height: 100vh; 
            background: linear-gradient(180deg, #1f2937 0%, #111827 100%); 
            padding: 20px 0; 
            overflow-y: auto;
            z-index: 1000;
        }
        .sidebar-header { 
            padding: 0 24px 24px; 
            border-bottom: 1px solid #374151; 
            margin-bottom: 24px;
        }
        .sidebar-header h2 { 
            color: white; 
            margin: 0; 
            font-size: 20px; 
            font-weight: 600;
        }
        .sidebar a { 
            display: flex; 
            align-items: center; 
            padding: 12px 24px; 
            text-decoration: none; 
            color: #d1d5db; 
            font-weight: 500; 
            transition: all 0.3s ease;
            border-left: 3px solid transparent;
        }
        .sidebar a:hover { 
            background: rgba(59, 130, 246, 0.1); 
            color: #60a5fa; 
            border-left-color: #3b82f6;
        }
        .sidebar a.active { 
            background: rgba(59, 130, 246, 0.2); 
            color: #60a5fa; 
            border-left-color: #3b82f6;
        }
        .sidebar a i { 
            width: 20px; 
            margin-right: 12px; 
            text-align: center;
        }
        .main-content { 
            margin-left: 280px; 
            min-height: 100vh;
        }
        .header { 
            background: white; 
            padding: 20px 30px; 
            border-bottom: 1px solid #e5e7eb; 
            display: flex; 
            justify-content: space-between; 
            align-items: center;
        }
        .header h1 { 
            margin: 0; 
            font-size: 24px; 
            font-weight: 600; 
            color: #1f2937;
        }
        .content { 
            padding: 30px; 
            background: #f9fafb;
            min-height: calc(100vh - 80px);
        }
        .logout { 
            color: #1f2937; 
            text-decoration: none; 
            background: #f3f4f6; 
            padding: 8px 16px; 
            border-radius: 6px; 
            transition: all 0.3s ease;
            font-weight: 500;
        }
        .logout:hover { 
            background: #e5e7eb; 
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
    <div class="sidebar">
        <div class="sidebar-header">
            <h2>Admin Panel</h2>
        </div>
        <nav>
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
            <a href="?page=filters" <?php echo $page === 'filters' ? 'class="active"' : ''; ?>>
                <i class="fas fa-filter"></i> Gallery Filters
            </a>
            <a href="?page=products" <?php echo $page === 'products' ? 'class="active"' : ''; ?>>
                <i class="fas fa-box"></i> Products
            </a>
            <a href="?page=clients" <?php echo $page === 'clients' ? 'class="active"' : ''; ?>>
                <i class="fas fa-handshake"></i> Clients
            </a>
            <a href="?page=sliders" <?php echo $page === 'sliders' ? 'class="active"' : ''; ?>>
                <i class="fas fa-images"></i> Home Sliders
            </a>
            <a href="?page=cleanup" <?php echo $page === 'cleanup' ? 'class="active"' : ''; ?>>
                <i class="fas fa-trash-alt"></i> Image Cleanup
            </a>
            <a href="?page=password" <?php echo $page === 'password' ? 'class="active"' : ''; ?>>
                <i class="fas fa-key"></i> Change Password
            </a>
            <a href="logout.php" style="margin-top: 20px; border-top: 1px solid #374151; padding-top: 20px;">
                <i class="fas fa-sign-out-alt"></i> Logout
            </a>
        </nav>
    </div>
    
    <div class="main-content">
        <div class="header">
            <h1>Dashboard</h1>
            <a href="logout.php" class="logout">Logout</a>
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
                echo "<input type='text' id='featured_image' placeholder='Or enter image URL' style='width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;'>";
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
                    echo "<tr><th>S. No</th><th>Image</th><th>Title</th><th>Status</th><th>Created</th><th>Actions</th></tr>";
                    
                    foreach ($posts as $index => $row) {
                        echo "<tr class='post-row'>";
                        echo "<td>" . ($offset + $index + 1) . "</td>";
                        echo "<td>" . ($row['featured_image'] ? "<img src='" . htmlspecialchars($row['featured_image']) . "' style='width: 60px; height: 40px; object-fit: cover; border-radius: 4px;'>" : 'No Image') . "</td>";
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
                echo "  fetch('$API_URL/upload-image.php', {";
                echo "    method: 'POST',";
                echo "    body: formData";
                echo "  }).then(r => r.json()).then(data => {";
                echo "    if (data.success) {";
                echo "      document.getElementById('featured_image').value = data.url;";
                echo "      document.getElementById('imagePreview').innerHTML = '<img src=\"' + data.url + '\" style=\"max-width: 200px; height: auto; border-radius: 4px;\">';";
                echo "    } else {";
                echo "      alert('Upload failed: ' + data.error);";
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
                echo "  fetch('$API_URL/blog-api.php?path=admin/post/' + id)";
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
                echo "  fetch('$API_URL/blog-api.php?path=delete/' + id, { method: 'POST' })";
                echo "    .then(() => location.reload());";
                echo "}";
                echo "function savePost(e) {";
                echo "  e.preventDefault();";
                echo "  const id = document.getElementById('postId').value;";
                echo "  const url = id ? '$API_URL/blog-api.php?path=update/' + id : '$API_URL/blog-api.php?path=create';";
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
                echo "  fetch('$API_URL/testimonials-api.php?path=admin')";
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
                echo "  fetch('$API_URL/testimonials-api.php?path=delete/' + id, { method: 'POST' })";
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
                echo "  const url = id ? '$API_URL/testimonials-api.php?path=update/' + id : '$API_URL/testimonials-api.php?path=create';";
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
                echo "<input type='text' id='galleryImageUrl' placeholder='Or enter image URL' style='width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;'>";
                echo "<div id='galleryImagePreview' style='margin-top: 10px;'></div>";
                echo "</div>";
                echo "<select id='galleryCategory' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;'>";
                $filterStmt = $pdo->query("SELECT * FROM gallery_filters WHERE status = 'active' ORDER BY name");
                $filters = $filterStmt->fetchAll(PDO::FETCH_ASSOC);
                if (count($filters) > 0) {
                    foreach ($filters as $filter) {
                        echo "<option value='" . htmlspecialchars($filter['name']) . "'>" . htmlspecialchars($filter['name']) . "</option>";
                    }
                } else {
                    echo "<option value='general'>General</option>";
                }
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
                    
                    foreach ($gallery as $index => $row) {
                        echo "<tr class='gallery-row'>";
                        echo "<td>" . ($index + 1) . "</td>";
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
                echo "  console.log('Uploading file:', file.name);";
                echo "  const formData = new FormData();";
                echo "  formData.append('image', file);";
                echo "  fetch('upload-image.php', {";
                echo "    method: 'POST',";
                echo "    body: formData";
                echo "  }).then(r => {";
                echo "    console.log('Upload response status:', r.status);";
                echo "    return r.json();";
                echo "  }).then(data => {";
                echo "    console.log('Upload response data:', data);";
                echo "    if (data.success) {";
                echo "      document.getElementById('galleryImageUrl').value = data.url;";
                echo "      const previewUrl = '$API_BASE_URL/' + data.url;";
                echo "      console.log('Preview URL:', previewUrl);";
                echo "      document.getElementById('galleryImagePreview').innerHTML = '<img src=\"' + previewUrl + '\" style=\"max-width: 200px; height: auto; border-radius: 4px;\" onerror=\"console.error(&quot;Image failed to load:&quot;, this.src)\">';";
                echo "    } else {";
                echo "      alert('Upload failed: ' + (data.error || 'Unknown error'));";
                echo "    }";
                echo "  }).catch(err => {";
                echo "    console.error('Upload error:', err);";
                echo "    alert('Network error: ' + err.message);";
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
                echo "  fetch('gallery-api.php?path=admin')";
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
                echo "  fetch('gallery-api.php?path=delete/' + id, { method: 'POST' })";
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
                echo "  const imageUrl = document.getElementById('galleryImageUrl').value;";
                echo "  if (!imageUrl) {";
                echo "    alert('Please upload an image or enter an image URL');";
                echo "    return;";
                echo "  }";
                echo "  const id = document.getElementById('galleryId').value;";
                echo "  const url = id ? 'gallery-api.php?path=update/' + id : 'gallery-api.php?path=create';";
                echo "  const method = id ? 'PUT' : 'POST';";
                echo "  fetch(url, {";
                echo "    method: method,";
                echo "    headers: {'Content-Type': 'application/json'},";
                echo "    body: JSON.stringify({";
                echo "      title: document.getElementById('galleryTitle').value,";
                echo "      image_url: imageUrl,";
                echo "      category: document.getElementById('galleryCategory').value,";
                echo "      status: document.getElementById('galleryStatus').value";
                echo "    })";
                echo "  }).then(() => location.reload())";
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
                
            } elseif ($page === 'filters') {
                echo "<h2>Gallery Filters Management</h2>";
                echo "<div style='margin: 20px 0; display: flex; justify-content: space-between; align-items: center;'>";
                echo "<button onclick='showAddFilter()' style='background: #007cba; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;'>Add New Filter</button>";
                echo "<input type='text' id='searchFilters' placeholder='Search filters...' style='padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; width: 250px;' onkeyup='filterFilters()'>";
                echo "</div>";
                
                echo "<div id='filterForm' style='display: none; background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px;'>";
                echo "<h3 id='filterFormTitle'>Add New Filter</h3>";
                echo "<form onsubmit='saveFilter(event)'>";
                echo "<input type='hidden' id='filterId' value=''>";
                echo "<input type='text' id='filterName' placeholder='Filter Name' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;' required>";

                echo "<select id='filterStatus' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;'>";
                echo "<option value='active'>Active</option>";
                echo "<option value='inactive'>Inactive</option>";
                echo "</select>";
                echo "<button type='submit' style='background: #28a745; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;'>Save</button>";
                echo "<button type='button' onclick='cancelFilter()' style='background: #6c757d; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;'>Cancel</button>";
                echo "</form>";
                echo "</div>";
                
                $stmt = $pdo->query("SELECT * FROM gallery_filters ORDER BY name");
                $filters = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                if (count($filters) > 0) {
                    echo "<table id='filtersTable'>";
                    echo "<tr><th>S. No</th><th>Name</th><th>Status</th><th>Date</th><th>Actions</th></tr>";
                    
                    foreach ($filters as $row) {
                        echo "<tr class='filter-row'>";
                        echo "<td>" . $row['id'] . "</td>";
                        echo "<td class='filter-name'>" . htmlspecialchars($row['name']) . "</td>";

                        echo "<td><span style='padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; " . ($row['status'] === 'active' ? 'background: #d4edda; color: #155724;' : 'background: #f8d7da; color: #721c24;') . "'>" . ucfirst($row['status']) . "</span></td>";
                        echo "<td>" . date('M j, Y', strtotime($row['created_at'])) . "</td>";
                        echo "<td style='white-space: nowrap;'>";
                        echo "<button onclick='editFilter({$row['id']})' style='background: #007cba; color: white; border: none; padding: 6px 8px; border-radius: 4px; margin-right: 5px; cursor: pointer; font-size: 14px;' title='Edit'><i class='fas fa-edit'></i></button>";
                        echo "<button onclick='if(confirm(\"Delete this filter?\")) deleteFilter({$row['id']})' style='background: #dc3545; color: white; border: none; padding: 6px 8px; border-radius: 4px; cursor: pointer; font-size: 14px;' title='Delete'><i class='fas fa-trash'></i></button>";
                        echo "</td>";
                        echo "</tr>";
                    }
                    echo "</table>";
                } else {
                    echo "<p>No product filters found.</p>";
                }
                
                echo "<script>";
                echo "function showAddFilter() {";
                echo "  document.getElementById('filterFormTitle').textContent = 'Add New Filter';";
                echo "  document.getElementById('filterId').value = '';";
                echo "  document.getElementById('filterName').value = '';";

                echo "  document.getElementById('filterStatus').value = 'active';";
                echo "  document.getElementById('filterForm').style.display = 'block';";
                echo "}";
                echo "function editFilter(id) {";
                echo "  fetch('product-filters-api.php?path=admin')";
                echo "    .then(r => r.json())";
                echo "    .then(data => {";
                echo "      const filter = data.find(f => f.id == id);";
                echo "      if (filter) {";
                echo "        document.getElementById('filterFormTitle').textContent = 'Edit Filter';";
                echo "        document.getElementById('filterId').value = filter.id;";
                echo "        document.getElementById('filterName').value = filter.name;";

                echo "        document.getElementById('filterStatus').value = filter.status;";
                echo "        document.getElementById('filterForm').style.display = 'block';";
                echo "      }";
                echo "    });";
                echo "}";
                echo "function deleteFilter(id) {";
                echo "  fetch('product-filters-api.php?path=delete/' + id, { method: 'POST' })";
                echo "    .then(r => r.json())";
                echo "    .then(data => {";
                echo "      if (data.success) {";
                echo "        location.reload();";
                echo "      } else {";
                echo "        alert('Error: ' + (data.error || 'Failed to delete filter'));";
                echo "      }";
                echo "    });";
                echo "}";
                echo "function saveFilter(e) {";
                echo "  e.preventDefault();";
                echo "  const id = document.getElementById('filterId').value;";
                echo "  const url = id ? 'product-filters-api.php?path=update/' + id : 'product-filters-api.php?path=create';";
                echo "  const method = id ? 'PUT' : 'POST';";
                echo "  fetch(url, {";
                echo "    method: method,";
                echo "    headers: {'Content-Type': 'application/json'},";
                echo "    body: JSON.stringify({";
                echo "      name: document.getElementById('filterName').value,";

                echo "      status: document.getElementById('filterStatus').value";
                echo "    })";
                echo "  }).then(() => location.reload());";
                echo "}";
                echo "function cancelFilter() {";
                echo "  document.getElementById('filterForm').style.display = 'none';";
                echo "}";
                echo "function filterFilters() {";
                echo "  const searchTerm = document.getElementById('searchFilters').value.toLowerCase();";
                echo "  const rows = document.querySelectorAll('.filter-row');";
                echo "  rows.forEach(row => {";
                echo "    const name = row.querySelector('.filter-name').textContent.toLowerCase();";
                echo "    const type = row.querySelector('.filter-type').textContent.toLowerCase();";
                echo "    if (name.includes(searchTerm) || type.includes(searchTerm)) {";
                echo "      row.style.display = '';";
                echo "    } else {";
                echo "      row.style.display = 'none';";
                echo "    }";
                echo "  });";
                echo "}";
                echo "</script>";
                
            } elseif ($page === 'products') {
                $viewGallery = $_GET['gallery'] ?? null;
                
                if ($viewGallery) {
                    $stmt = $pdo->prepare("SELECT name FROM products WHERE id = ?");
                    $stmt->execute([$viewGallery]);
                    $product = $stmt->fetch(PDO::FETCH_ASSOC);
                    
                    echo "<a href='?page=products'>&larr; Back to Products</a>";
                    echo "<h2>Product Gallery - " . htmlspecialchars($product['name']) . "</h2>";
                    echo "<button onclick='showAddGalleryImage()' style='background: #007cba; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin: 20px 0;'>Add Gallery Image</button>";
                    
                    echo "<div id='galleryImageForm' style='display: none; background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px;'>";
                    echo "<h3>Add Gallery Image</h3>";
                    echo "<form onsubmit='saveGalleryImages(event)'>";
                    echo "<input type='file' id='galleryImageFiles' accept='image/*' multiple style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;' onchange='uploadMultipleImages()'>";
                    echo "<div id='galleryImagePreviews' style='margin: 10px 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px;'></div>";
                    echo "<button type='submit' style='background: #28a745; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;'>Save All</button>";
                    echo "<button type='button' onclick='cancelGalleryImage()' style='background: #6c757d; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;'>Cancel</button>";
                    echo "</form>";
                    echo "</div>";
                    
                    $stmt = $pdo->prepare("SELECT * FROM product_gallery WHERE product_id = ? ORDER BY created_at DESC");
                    $stmt->execute([$viewGallery]);
                    $galleryImages = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    
                    if (count($galleryImages) > 0) {
                        echo "<div style='display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin: 20px 0;'>";
                        foreach ($galleryImages as $img) {
                            echo "<div style='border: 1px solid #ddd; border-radius: 8px; overflow: hidden; position: relative;'>";
                            echo "<img src='" . htmlspecialchars($img['image_url']) . "' style='width: 100%; height: 150px; object-fit: cover;'>";
                            echo "<div style='padding: 10px;'>";
                            echo "<button onclick='if(confirm(\"Delete this image?\")) deleteGalleryImage({$img['id']})' style='background: #dc3545; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px;'>Delete</button>";
                            echo "</div>";
                            echo "</div>";
                        }
                        echo "</div>";
                    } else {
                        echo "<p>No gallery images found.</p>";
                    }
                    
                    echo "<script>";
                    echo "let uploadedImages = [];";
                    echo "function showAddGalleryImage() { document.getElementById('galleryImageForm').style.display = 'block'; uploadedImages = []; }";
                    echo "function cancelGalleryImage() { document.getElementById('galleryImageForm').style.display = 'none'; uploadedImages = []; }";
                    echo "function uploadMultipleImages() {";
                    echo "  const files = document.getElementById('galleryImageFiles').files;";
                    echo "  if (!files.length) return;";
                    echo "  uploadedImages = [];";
                    echo "  document.getElementById('galleryImagePreviews').innerHTML = '';";
                    echo "  Array.from(files).forEach((file, index) => {";
                    echo "    const formData = new FormData();";
                    echo "    formData.append('image', file);";
                    echo "    fetch('upload-image.php', { method: 'POST', body: formData })";
                    echo "      .then(r => r.json()).then(data => {";
                    echo "        if (data.success) {";
                    echo "          uploadedImages.push(data.url);";
                    echo "          document.getElementById('galleryImagePreviews').innerHTML += '<img src=\"' + data.url + '\" style=\"width: 100px; height: 100px; object-fit: cover; border-radius: 4px;\">';";
                    echo "        }";
                    echo "      });";
                    echo "  });";
                    echo "}";
                    echo "function saveGalleryImages(e) {";
                    echo "  e.preventDefault();";
                    echo "  if (!uploadedImages.length) { alert('Please upload images first'); return; }";
                    echo "  Promise.all(uploadedImages.map(url => ";
                    echo "    fetch('products-api.php?path=add-gallery/$viewGallery', {";
                    echo "      method: 'POST',";
                    echo "      headers: {'Content-Type': 'application/json'},";
                    echo "      body: JSON.stringify({ title: '', image_url: url })";
                    echo "    })";
                    echo "  )).then(() => location.reload());";
                    echo "}";
                    echo "function deleteGalleryImage(id) {";
                    echo "  fetch('$API_BASE_URL/products-api.php?path=delete-gallery/' + id, { method: 'POST' })";
                    echo "    .then(() => location.reload());";
                    echo "}";
                    echo "</script>";
                    
                } else {
                    echo "<h2>Products Management</h2>";
                    echo "<button onclick='showAddProduct()' style='background: #007cba; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin: 20px 0;'>Add New Product</button>";
                    
                    echo "<div id='productForm' style='display: none; background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px;'>";
                    echo "<h3 id='productFormTitle'>Add New Product</h3>";
                    echo "<form onsubmit='saveProduct(event)'>";
                    echo "<input type='hidden' id='productId' value=''>";
                    echo "<input type='text' id='productName' placeholder='Product Name' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;' required>";
                    echo "<textarea id='productDescription' placeholder='Product Description' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; height: 100px;'></textarea>";
                    echo "<input type='file' id='productImageFile' accept='image/*' style='margin-bottom: 10px;' onchange='uploadProductImage()'>";
                    echo "<input type='text' id='productImageUrl' placeholder='Or enter image URL' style='width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;'>";
                    echo "<div id='productImagePreview' style='margin-top: 10px;'></div>";
                    echo "<select id='productStatus' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;'>";
                    echo "<option value='active'>Active</option>";
                    echo "<option value='inactive'>Inactive</option>";
                    echo "</select>";
                    echo "<button type='submit' style='background: #28a745; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;'>Save</button>";
                    echo "<button type='button' onclick='cancelProduct()' style='background: #6c757d; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;'>Cancel</button>";
                    echo "</form>";
                    echo "</div>";
                    
                    $countStmt = $pdo->query("SELECT COUNT(*) FROM products");
                    $totalRecords = $countStmt->fetchColumn();
                    $totalPages = ceil($totalRecords / $recordsPerPage);
                    
                    $stmt = $pdo->prepare("SELECT * FROM products ORDER BY created_at DESC LIMIT $recordsPerPage OFFSET $offset");
                    $stmt->execute();
                    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    
                    if (count($products) > 0) {
                        echo "<table>";
                        echo "<tr><th>S. No</th><th>Image</th><th>Name</th><th>Status</th><th>Date</th><th>Actions</th></tr>";
                        
                        foreach ($products as $index => $row) {
                            echo "<tr>";
                            echo "<td>" . ($index + 1) . "</td>";
                            echo "<td><img src='" . htmlspecialchars($row['image_url']) . "' style='width: 60px; height: 60px; object-fit: cover; border-radius: 4px;'></td>";
                            echo "<td>" . htmlspecialchars($row['name']) . "</td>";
                            echo "<td><span style='padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; " . ($row['status'] === 'active' ? 'background: #d4edda; color: #155724;' : 'background: #f8d7da; color: #721c24;') . "'>" . ucfirst($row['status']) . "</span></td>";
                            echo "<td>" . date('M j, Y', strtotime($row['created_at'])) . "</td>";
                            echo "<td style='white-space: nowrap;'>";
                            echo "<button onclick='editProduct({$row['id']})' style='background: #007cba; color: white; border: none; padding: 6px 8px; border-radius: 4px; margin-right: 5px; cursor: pointer; font-size: 14px;' title='Edit'><i class='fas fa-edit'></i></button>";
                            echo "<a href='?page=products&gallery={$row['id']}' style='background: #28a745; color: white; border: none; padding: 6px 8px; border-radius: 4px; margin-right: 5px; text-decoration: none; font-size: 14px;' title='Gallery'><i class='fas fa-images'></i></a>";
                            echo "<button onclick='if(confirm(\"Delete this product?\")) deleteProduct({$row['id']})' style='background: #dc3545; color: white; border: none; padding: 6px 8px; border-radius: 4px; cursor: pointer; font-size: 14px;' title='Delete'><i class='fas fa-trash'></i></button>";
                            echo "</td>";
                            echo "</tr>";
                        }
                        echo "</table>";
                        
                        // Pagination
                        if ($totalPages > 1) {
                            echo "<div style='margin: 20px 0; text-align: center;'>";
                            for ($i = 1; $i <= $totalPages; $i++) {
                                $active = $i == $currentPage ? 'style="background: #007cba; color: white;"' : '';
                                echo "<a href='?page=products&p=$i' $active style='padding: 8px 12px; margin: 0 2px; text-decoration: none; border: 1px solid #ddd;'>$i</a>";
                            }
                            echo "</div>";
                        }
                    } else {
                        echo "<p>No products found.</p>";
                    }
                    
                    echo "<script>";
                    echo "function showAddProduct() {";
                    echo "  document.getElementById('productFormTitle').textContent = 'Add New Product';";
                    echo "  document.getElementById('productId').value = '';";
                    echo "  document.getElementById('productName').value = '';";
                    echo "  document.getElementById('productDescription').value = '';";
                    echo "  document.getElementById('productImageUrl').value = '';";
                    echo "  document.getElementById('productImageFile').value = '';";
                    echo "  document.getElementById('productImagePreview').innerHTML = '';";
                    echo "  document.getElementById('productStatus').value = 'active';";
                    echo "  document.getElementById('productForm').style.display = 'block';";
                    echo "}";
                    echo "function uploadProductImage() {";
                    echo "  const file = document.getElementById('productImageFile').files[0];";
                    echo "  if (!file) return;";
                    echo "  const formData = new FormData();";
                    echo "  formData.append('image', file);";
                    echo "  fetch('upload-image.php', { method: 'POST', body: formData })";
                    echo "    .then(r => r.json()).then(data => {";
                    echo "      if (data.success) {";
                    echo "        document.getElementById('productImageUrl').value = data.url;";
                    echo "        document.getElementById('productImagePreview').innerHTML = '<img src=\"' + data.url + '\" style=\"max-width: 200px; height: auto; border-radius: 4px;\">';";
                    echo "      } else { alert('Upload failed: ' + data.error); }";
                    echo "    });";
                    echo "}";
                    echo "function editProduct(id) {";
                    echo "  fetch('products-api.php?path=admin')";
                    echo "    .then(r => r.json())";
                    echo "    .then(data => {";
                    echo "      const product = data.find(p => p.id == id);";
                    echo "      if (product) {";
                    echo "        document.getElementById('productFormTitle').textContent = 'Edit Product';";
                    echo "        document.getElementById('productId').value = product.id;";
                    echo "        document.getElementById('productName').value = product.name;";
                    echo "        document.getElementById('productDescription').value = product.description;";
                    echo "        document.getElementById('productImageUrl').value = product.image_url;";
                    echo "        document.getElementById('productImageFile').value = '';";
                    echo "        document.getElementById('productImagePreview').innerHTML = '<img src=\"' + product.image_url + '\" style=\"max-width: 200px; height: auto; border-radius: 4px;\">';";
                    echo "        document.getElementById('productStatus').value = product.status;";
                    echo "        document.getElementById('productForm').style.display = 'block';";
                    echo "      }";
                    echo "    });";
                    echo "}";
                    echo "function deleteProduct(id) {";
                    echo "  fetch('products-api.php?path=delete/' + id, { method: 'POST' })";
                    echo "    .then(() => location.reload());";
                    echo "}";
                    echo "function saveProduct(e) {";
                    echo "  e.preventDefault();";
                    echo "  const imageUrl = document.getElementById('productImageUrl').value;";
                    echo "  if (!imageUrl) { alert('Please upload an image or enter an image URL'); return; }";
                    echo "  const id = document.getElementById('productId').value;";
                    echo "  const url = id ? 'products-api.php?path=update/' + id : 'products-api.php?path=create';";
                    echo "  const method = id ? 'PUT' : 'POST';";
                    echo "  fetch(url, {";
                    echo "    method: method,";
                    echo "    headers: {'Content-Type': 'application/json'},";
                    echo "    body: JSON.stringify({";
                    echo "      name: document.getElementById('productName').value,";
                    echo "      description: document.getElementById('productDescription').value,";
                    echo "      image_url: imageUrl,";
                    echo "      status: document.getElementById('productStatus').value";
                    echo "    })";
                    echo "  }).then(() => location.reload());";
                    echo "}";
                    echo "function cancelProduct() { document.getElementById('productForm').style.display = 'none'; }";
                    echo "</script>";
                }
                
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
                echo "<input type='text' id='clientLogoUrl' placeholder='Or enter logo URL' style='width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;' required>";
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
                echo "  fetch('$API_URL/upload-image.php', {";
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
                echo "  fetch('clients-api.php')";
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
                echo "  fetch('clients-api.php?id=' + id, { method: 'POST' })";
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
                echo "  fetch('clients-api.php', {";
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
                
            } elseif ($page === 'sliders') {
                echo "<h2>Home Sliders Management</h2>";
                echo "<button onclick='showAddSlider()' style='background: #007cba; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin: 20px 0;'>Add New Slider</button>";
                
                echo "<div id='sliderForm' style='display: none; background: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px;'>";
                echo "<h3 id='sliderFormTitle'>Add New Slider</h3>";
                echo "<form onsubmit='saveSlider(event)'>";
                echo "<input type='hidden' id='sliderId' value=''>";
                echo "<input type='text' id='sliderTitle' placeholder='Slider Title' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;' required>";
                echo "<textarea id='sliderDescription' placeholder='Slider Description' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; height: 80px;'></textarea>";
                echo "<input type='file' id='sliderImageFile' accept='image/*' style='margin-bottom: 10px;' onchange='uploadSliderImage()'>";
                echo "<input type='text' id='sliderImageUrl' placeholder='Or enter image URL' style='width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;'>";
                echo "<div id='sliderImagePreview' style='margin-top: 10px;'></div>";
                echo "<input type='text' id='sliderButtonText' placeholder='Button Text (optional)' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;'>";
                echo "<input type='text' id='sliderButtonLink' placeholder='Button Link (optional)' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;'>";
                echo "<input type='number' id='sliderSortOrder' placeholder='Sort Order' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;' value='0'>";
                echo "<select id='sliderStatus' style='width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px;'>";
                echo "<option value='active'>Active</option>";
                echo "<option value='inactive'>Inactive</option>";
                echo "</select>";
                echo "<button type='submit' style='background: #28a745; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px;'>Save</button>";
                echo "<button type='button' onclick='cancelSlider()' style='background: #6c757d; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;'>Cancel</button>";
                echo "</form>";
                echo "</div>";
                
                $stmt = $pdo->query("SELECT * FROM sliders ORDER BY sort_order ASC, created_at DESC");
                $sliders = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                if (count($sliders) > 0) {
                    echo "<table>";
                    echo "<tr><th>S. No</th><th>Image</th><th>Title</th><th>Button</th><th>Order</th><th>Status</th><th>Actions</th></tr>";
                    
                    foreach ($sliders as $row) {
                        echo "<tr>";
                        echo "<td>" . $row['id'] . "</td>";
                        $imageUrl = $row['image_url'];
                        if ($imageUrl && strpos($imageUrl, 'http') !== 0) {
                            $imageUrl = $API_BASE_URL . '/' . $imageUrl;
                        }
                        echo "<td>" . ($imageUrl ? "<img src='" . htmlspecialchars($imageUrl) . "' style='width: 60px; height: 40px; object-fit: cover; border-radius: 4px;'>" : 'No Image') . "</td>";
                        echo "<td>" . htmlspecialchars($row['title']) . "</td>";
                        echo "<td>" . htmlspecialchars($row['button_text'] ?: 'No Button') . "</td>";
                        echo "<td>" . $row['sort_order'] . "</td>";
                        echo "<td><span style='padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: bold; " . ($row['status'] === 'active' ? 'background: #d4edda; color: #155724;' : 'background: #f8d7da; color: #721c24;') . "'>" . ucfirst($row['status']) . "</span></td>";
                        echo "<td style='white-space: nowrap;'>";
                        echo "<button onclick='editSlider({$row['id']})' style='background: #007cba; color: white; border: none; padding: 6px 8px; border-radius: 4px; margin-right: 5px; cursor: pointer; font-size: 14px;' title='Edit'><i class='fas fa-edit'></i></button>";
                        echo "<button onclick='if(confirm(\"Delete this slider?\")) deleteSlider({$row['id']})' style='background: #dc3545; color: white; border: none; padding: 6px 8px; border-radius: 4px; cursor: pointer; font-size: 14px;' title='Delete'><i class='fas fa-trash'></i></button>";
                        echo "</td>";
                        echo "</tr>";
                    }
                    echo "</table>";
                } else {
                    echo "<p>No sliders found.</p>";
                }
                
                echo "<script>";
                echo "function uploadSliderImage() {";
                echo "  const file = document.getElementById('sliderImageFile').files[0];";
                echo "  if (!file) return;";
                echo "  const formData = new FormData();";
                echo "  formData.append('image', file);";
                echo "  fetch('$API_URL/upload-image.php', {";
                echo "    method: 'POST',";
                echo "    body: formData";
                echo "  }).then(r => r.json()).then(data => {";
                echo "    console.log('Upload response:', data);";
                echo "    if (data.success) {";
                echo "      document.getElementById('sliderImageUrl').value = data.url;";
                echo "      document.getElementById('sliderImagePreview').innerHTML = '<img src=\"' + data.url + '\" style=\"max-width: 200px; height: auto; border-radius: 4px;\">';";
                echo "    } else {";
                echo "      alert('Upload failed: ' + (data.error || 'Unknown error'));";
                echo "    }";
                echo "  }).catch(err => {";
                echo "    console.error('Upload error:', err);";
                echo "    alert('Network error: ' + err.message);";
                echo "  });";
                echo "}";
                echo "function showAddSlider() {";
                echo "  document.getElementById('sliderFormTitle').textContent = 'Add New Slider';";
                echo "  document.getElementById('sliderId').value = '';";
                echo "  document.getElementById('sliderTitle').value = '';";
                echo "  document.getElementById('sliderDescription').value = '';";
                echo "  document.getElementById('sliderImageUrl').value = '';";
                echo "  document.getElementById('sliderImageFile').value = '';";
                echo "  document.getElementById('sliderImagePreview').innerHTML = '';";
                echo "  document.getElementById('sliderButtonText').value = '';";
                echo "  document.getElementById('sliderButtonLink').value = '';";
                echo "  document.getElementById('sliderSortOrder').value = '0';";
                echo "  document.getElementById('sliderStatus').value = 'active';";
                echo "  document.getElementById('sliderForm').style.display = 'block';";
                echo "}";
                echo "function editSlider(id) {";
                echo "  fetch('$API_BASE_URL/sliders-api.php?path=admin')";
                echo "    .then(r => r.json())";
                echo "    .then(data => {";
                echo "      const slider = data.find(s => s.id == id);";
                echo "      if (slider) {";
                echo "        document.getElementById('sliderFormTitle').textContent = 'Edit Slider';";
                echo "        document.getElementById('sliderId').value = slider.id;";
                echo "        document.getElementById('sliderTitle').value = slider.title;";
                echo "        document.getElementById('sliderDescription').value = slider.description;";
                echo "        document.getElementById('sliderImageUrl').value = slider.image_url;";
                echo "        document.getElementById('sliderImageFile').value = '';";
                echo "        let imageUrl = slider.image_url;";
                echo "        if (imageUrl && imageUrl.indexOf('http') !== 0) {";
                echo "          imageUrl = '$API_BASE_URL/' + imageUrl;";
                echo "        }";
                echo "        if (imageUrl) {";
                echo "          document.getElementById('sliderImagePreview').innerHTML = '<img src=\"' + imageUrl + '\" style=\"max-width: 200px; height: auto; border-radius: 4px;\">';";
                echo "        }";
                echo "        document.getElementById('sliderButtonText').value = slider.button_text || '';";
                echo "        document.getElementById('sliderButtonLink').value = slider.button_link || '';";
                echo "        document.getElementById('sliderSortOrder').value = slider.sort_order;";
                echo "        document.getElementById('sliderStatus').value = slider.status;";
                echo "        document.getElementById('sliderForm').style.display = 'block';";
                echo "      }";
                echo "    });";
                echo "}";
                echo "function deleteSlider(id) {";
                echo "  fetch('$API_BASE_URL/sliders-api.php?path=delete/' + id, { method: 'POST' })";
                echo "    .then(() => location.reload());";
                echo "}";
                echo "function saveSlider(e) {";
                echo "  e.preventDefault();";
                echo "  const imageUrl = document.getElementById('sliderImageUrl').value;";
                echo "  if (!imageUrl) { alert('Please upload an image or enter an image URL'); return; }";
                echo "  const id = document.getElementById('sliderId').value;";
                echo "  const url = id ? '$API_BASE_URL/sliders-api.php?path=update/' + id : '$API_BASE_URL/sliders-api.php?path=create';";
                echo "  const method = id ? 'PUT' : 'POST';";
                echo "  console.log('Saving slider:', { url, method });";
                echo "  fetch(url, {";
                echo "    method: method,";
                echo "    headers: {'Content-Type': 'application/json'},";
                echo "    body: JSON.stringify({";
                echo "      title: document.getElementById('sliderTitle').value,";
                echo "      description: document.getElementById('sliderDescription').value,";
                echo "      image_url: imageUrl,";
                echo "      button_text: document.getElementById('sliderButtonText').value,";
                echo "      button_link: document.getElementById('sliderButtonLink').value,";
                echo "      sort_order: document.getElementById('sliderSortOrder').value,";
                echo "      status: document.getElementById('sliderStatus').value";
                echo "    })";
                echo "  }).then(response => {";
                echo "    console.log('Save response:', response);";
                echo "    return response.json();";
                echo "  }).then(data => {";
                echo "    console.log('Save data:', data);";
                echo "    if (data.success) {";
                echo "      location.reload();";
                echo "    } else {";
                echo "      alert('Error: ' + (data.error || 'Failed to save slider'));";
                echo "    }";
                echo "  }).catch(err => {";
                echo "    console.error('Save error:', err);";
                echo "    alert('Network error: ' + err.message);";
                echo "  });";
                echo "}";
                echo "function cancelSlider() { document.getElementById('sliderForm').style.display = 'none'; }";
                echo "</script>";
                
            } elseif ($page === 'cleanup') {
                echo "<h2>Image Cleanup</h2>";
                echo "<p>Find and delete unused images to optimize storage space.</p>";
                echo "<button onclick='scanImages()' style='background: #007cba; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin: 10px 5px 10px 0;'>Scan for Unused Images</button>";
                echo "<button onclick='deleteUnused()' id='deleteBtn' style='background: #dc3545; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin: 10px 0; display: none;'>Delete All Unused</button>";
                echo "<div id='scanResults' style='margin: 20px 0;'></div>";
                
                echo "<script>";
                echo "function scanImages() {";
                echo "  document.getElementById('scanResults').innerHTML = '<p>Scanning...</p>';";
                echo "  fetch('cleanup-api.php?path=scan')";
                echo "    .then(r => r.json())";
                echo "    .then(data => {";
                echo "      if (data.error) {";
                echo "        document.getElementById('scanResults').innerHTML = '<p style=\"color: red;\">Error: ' + data.error + '</p>';";
                echo "        return;";
                echo "      }";
                echo "      const count = data.count;";
                echo "      if (count === 0) {";
                echo "        document.getElementById('scanResults').innerHTML = '<p style=\"color: green;\">No unused images found. Storage is optimized!</p>';";
                echo "        document.getElementById('deleteBtn').style.display = 'none';";
                echo "      } else {";
                echo "        let html = '<h3>Found ' + count + ' unused images:</h3><ul>';";
                echo "        data.unused_files.forEach(file => {";
                echo "          html += '<li>' + file + '</li>';";
                echo "        });";
                echo "        html += '</ul>';";
                echo "        document.getElementById('scanResults').innerHTML = html;";
                echo "        document.getElementById('deleteBtn').style.display = 'inline-block';";
                echo "      }";
                echo "    });";
                echo "}";
                echo "function deleteUnused() {";
                echo "  if (!confirm('Are you sure you want to delete all unused images? This cannot be undone.')) return;";
                echo "  fetch('cleanup-api.php?path=delete', { method: 'POST' })";
                echo "    .then(r => r.json())";
                echo "    .then(data => {";
                echo "      if (data.success) {";
                echo "        document.getElementById('scanResults').innerHTML = '<p style=\"color: green;\">Successfully deleted ' + data.count + ' unused images.</p>';";
                echo "        document.getElementById('deleteBtn').style.display = 'none';";
                echo "      } else {";
                echo "        alert('Error: ' + (data.error || 'Failed to delete images'));";
                echo "      }";
                echo "    });";
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
    </div>
</body>
</html>