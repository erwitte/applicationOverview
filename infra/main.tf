provider "aws" {
  region = "eu-central-1"
}

# 1. The User Pool (The "Database")
resource "aws_cognito_user_pool" "main" {
  name = "myapp-user-pool"

  # Use email as the primary login identifier
  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }

  # Ensure the email attribute is required and valid
  schema {
    attribute_data_type = "String"
    name                = "email"
    required            = true

    string_attribute_constraints {
      min_length = 1
      max_length = 2048
    }
  }
}

# 2. The App Client (The "Door" for your React App)
resource "aws_cognito_user_pool_client" "client" {
  name         = "react-client"
  user_pool_id = aws_cognito_user_pool.main.id

  # IMPORTANT: For React SPAs, we do NOT use a client secret
  generate_secret     = false
  explicit_auth_flows = ["USER_PASSWORD_AUTH"]
}

# 3. Outputs (To use in your React code)
output "user_pool_id" {
  value = aws_cognito_user_pool.main.id
}

output "client_id" {
  value = aws_cognito_user_pool_client.client.id
}