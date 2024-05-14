
# journey finder API
API en fastify pour gerer le back end de journey finder

## Fonctionnalité principales
- API RESTFul qui appelle sur une DB mongoDB

## Configuration requise
- node.js v21
- npm

## Instruction d'installation

### Via source 

- cloner le dépot : `git clone https://github.com/Vivien-Parsis/journey-finder-back`
- dans le repertoire, pour installer les dépendances : `npm install`
- pour le lancer le serveur : `npm start`
  
## Instruction d'installation

### Via docker

- cloner le dépot : `git clone https://github.com/Vivien-Parsis/journey-finder-back`
- build : `docker run --rm -p 4000:4000 --name journey-finder-back journey-finder-back`
- lancer l'image : `docker run --rm -p 4000:4000 --name journey-finder-back journey-finder-back`

## Adresse

`http://localhost:4000`

## Route

[route disponible](/src/router/Router.md)

## Auteur

- Vivien PARSIS

