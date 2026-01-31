resource "aws_s3_bucket" "website" {
  bucket        = "application-overview"
  force_destroy = true
}