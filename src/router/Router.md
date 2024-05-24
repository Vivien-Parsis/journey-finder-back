# Router

## User

### se connecter

POST `/user/sign-in`

```json
{
    "email":"...",
    "password":"..."
}
```

### S'inscrire

POST `/user/sign-up`

```json
{
    "lastName":"...",
    "firstName":"...",
    "email":"...",
    "password":"..."
}
```

### supprimer son compte

POST `/user/delete`

```json
{
    "email":"...",
    "password":"..."
}
```

### modifier son mot de passe

POST `/user/forgetpswd`
