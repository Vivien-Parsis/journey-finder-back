# Router

## User

### se connecter

POST `/user/signin`

```json
{
    "email":"...",
    "password":"..."
}
```

### S'inscrire

POST `/user/signup`

```json
{
    "lastName":"...",
    "firstName":"...",
    "email":"...",
    "password":"..."
}
```

### supprimer son compte

POST `/user/signout`

```json
{
    "email":"...",
    "password":"..."
}
```

### modifier son mot de passe

POST `/user/forgetpswd`
