# 1. Update the S3 Bucket (Keep it private)
resource "aws_s3_bucket" "website" {
  bucket        = "application-overview"
  force_destroy = true
}

# 2. Origin Access Control (The "Key" CloudFront uses to enter S3)
resource "aws_cloudfront_origin_access_control" "default" {
  name                              = "s3-oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# 3. The CloudFront Distribution
resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.website.bucket_regional_domain_name
    origin_id                = "S3Origin"
    origin_access_control_id = aws_cloudfront_origin_access_control.default.id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3Origin"

    forwarded_values {
      query_string = false
      cookies { forward = "none" }
    }

    # THIS FIXES YOUR BUG: Redirects all HTTP traffic to HTTPS
    viewer_protocol_policy = "redirect-to-https"
  }

  # THIS FIXES REACT ROUTER: If a user refreshes on /dashboard, S3 returns 404. 
  # We tell CloudFront to send that 404 back to index.html with a 200 code.
  custom_error_response {
    error_code         = 403 # S3 returns 403 for private files not found
    response_code      = 200
    response_page_path = "/index.html"
  }
  
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction { restriction_type = "none" }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# 4. S3 Bucket Policy (Allow ONLY CloudFront to read)
resource "aws_s3_bucket_policy" "allow_cloudfront" {
  bucket = aws_s3_bucket.website.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowCloudFrontServicePrincipalReadOnly"
        Effect    = "Allow"
        Principal = { Service = "cloudfront.amazonaws.com" }
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.website.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.s3_distribution.arn
          }
        }
      }
    ]
  })
}

# 5. New Output
output "cloudfront_url" {
  value = "https://${aws_cloudfront_distribution.s3_distribution.domain_name}"
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

output "website_bucket_name" {
  description = "The name of the S3 bucket to upload files to"
  value       = aws_s3_bucket.website.id
}