# Email Campaign App
### a backend app for managing email campaigns,
**based on:**
- Nestjs (TS),
- OOP,
- PostgreSQL and TypeORM,
- Auth0,
- integrating many e-mail providers
- Docker

## Objectives

- Creating an app on a host http://127.0.0.1:8000
- Preparing an enviroment
- implementing SSO Login
  - Creating an external service responsible for SSO (Single Sign-On)
  - User database shuld be accesible only from this service
- implementing an easy way to add an email providers (AWS SES, Mailgun)
- CRUD endpoints for:
    - Email templates
    - Campaigns
    - Providers Credentials (encrypted)
- at least four types of users: 
    - Superadmin
    - Owner
      - Assign `Campaign Manager` role to `Employee`
      - Can perform CRUD operations on every `Campaign`
      - Can perform CRUD operations on every `Template`
      - Can perform CRUD operations on every `User`
      - Cannot assign role `Owner` to other `User`
    - Campaign manager
      - Is manager of the campaign
      - Can modify own campaigns 
      - Define new templates for campaign 
      - Modify templates assigned to campaign
      - Can schedule or execute pre-defined campaign
    - Employee
      - Can execute pre-defined campaign
      - Can update email templates, but edition has to be approved by manager 
- There should be a possibility to render emails from the HTML or XML templates with context (personalized content)
