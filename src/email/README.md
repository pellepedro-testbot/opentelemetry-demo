# Email Service

The Email service "sends" an email to the customer with their order details by
rendering it as a log message. It expects a JSON payload like:

```json
{
  "email": "some.address@website.com",
  "order": "<serialized order protobuf>"
}
```

## Copies for support

Every confirmation email is also written to a folder, one `.eml` file per
order named after the order id, so support can see exactly what a customer was
sent. The folder is `EMAIL_ARCHIVE_DIR` (default: `sent-emails` under the
system temp folder). Set `EMAIL_ARCHIVE_ENABLED=false` to turn copies off.
Writing a copy never fails the email itself.

## Local Build

We use `bundler` to manage dependencies. To get started, simply `bundle install`.

## Running locally

You may run this service locally with `bundle exec ruby email_server.rb`.

## Docker Build

From `src/email`, run `docker build .`
