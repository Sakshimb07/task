CREATE DATABASE IF NOT EXISTS task_management;

USE task_management;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'manager', 'bd', 'team') NOT NULL
);
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  priority VARCHAR(50),
  status VARCHAR(50),
  startDate DATE,
  dueDate DATE,
  assignee_id INT,
  manager_id INT,
  bd_id INT,
  FOREIGN KEY (assignee_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (manager_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (bd_id) REFERENCES users(id) ON DELETE SET NULL
);
CREATE TABLE notices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(50),
  title VARCHAR(255),
  content TEXT,
  color VARCHAR(50),
  created_by INT,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);
CREATE TABLE alerts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  phone VARCHAR(20),
  date VARCHAR(50),
  time VARCHAR(50),
  message TEXT,
  duration VARCHAR(100),
  notificationType VARCHAR(100),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
CREATE TABLE calendar_tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  time VARCHAR(20),
  type VARCHAR(50),
  dateKey VARCHAR(20), -- e.g., 2025-05-31
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
CREATE TABLE dashboard_access (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  can_see_team_dashboard BOOLEAN DEFAULT FALSE,
  can_see_bd_dashboard BOOLEAN DEFAULT FALSE,
  can_see_admin_dashboard BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

