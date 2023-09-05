DROP DATABASE IF EXISTS system_informations;

CREATE DATABASE system_informations;

USE system_informations;

CREATE TABLE systems (
  system_id INT AUTO_INCREMENT PRIMARY KEY,
  system_name VARCHAR(20),
  system_path VARCHAR(50),
  system_description VARCHAR(250),
  scheme_id INT,
  control_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);

CREATE TABLE workers (
  worker_uuid VARCHAR(25) PRIMARY KEY,
  system_id INT,
  FOREIGN KEY (system_id) REFERENCES systems(system_id)
);

CREATE TABLE control (
  control_id INT AUTO_INCREMENT PRIMARY KEY,
  control_type VARCHAR(10),
  control_kp DECIMAL(7, 3),
  control_ki DECIMAL(7, 3),
  control_kd DECIMAL(7, 3),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);

CREATE TABLE scheme (
  scheme_id INT AUTO_INCREMENT PRIMARY KEY,
  scheme_setpoint DECIMAL(10, 3),
  scheme_min_level DECIMAL(10, 3),
  scheme_max_level DECIMAL(10, 3),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL
);

ALTER TABLE systems
  ADD CONSTRAINT fk_scheme
  FOREIGN KEY (scheme_id)
  REFERENCES scheme(scheme_id);

ALTER TABLE systems
  ADD CONSTRAINT fk_control
  FOREIGN KEY (control_id)
  REFERENCES control(control_id);
