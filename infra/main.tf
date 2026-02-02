resource "aws_s3_bucket" "website" {
  bucket        = "application-overview"
  force_destroy = true
}

# 1. Disable the "Block Public Access" settings
resource "aws_s3_bucket_public_access_block" "website" {
  bucket = aws_s3_bucket.website.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# 2. Enable Static Website Hosting
resource "aws_s3_bucket_website_configuration" "website_config" {
  bucket = aws_s3_bucket.website.id

  index_document {
    suffix = "index.html"
  }

  # This is crucial for React Router!
  error_document {
    key = "index.html"
  }
}

# 3. Add a Bucket Policy to allow anyone to read your files
resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.website.id
  
  # This makes sure the block_public_access is removed before applying the policy
  depends_on = [aws_s3_bucket_public_access_block.website]

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.website.arn}/*"
      },
    ]
  })
}

# 4. Output the public URL
output "s3_website_url" {
  value = aws_s3_bucket_website_configuration.website_config.website_endpoint
}


# cognito
# 5. Cognito User Pool
resource "aws_cognito_user_pool" "main" {
  name = "app-user-pool"

  # Allow users to sign up using email as their username
  username_attributes = ["email"]
  auto_verified_attributes = ["email"]

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }
}

# 6. Cognito User Pool Client (The "ID" for your React App)
resource "aws_cognito_user_pool_client" "client" {
  name         = "react-app-client"
  user_pool_id = aws_cognito_user_pool.main.id

  # Senior Tip: For web apps, we MUST disable the client secret
  generate_secret     = false
  explicit_auth_flows = ["USER_PASSWORD_AUTH"]
}

# 7. Terraform Outputs
# You will need these for your .env file in React
output "cognito_user_pool_id" {
  value = aws_cognito_user_pool.main.id
}

output "cognito_client_id" {
  value = aws_cognito_user_pool_client.client.id
}

output "region" {
  value = "us-east-1" # Or whatever region you are using
}