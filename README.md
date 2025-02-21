# Lost’n’Found

Lost’n’Found est une application (MVP) de gestion d’objets perdus et trouvés. Elle offre la possibilité de créer et connecter des comptes utilisateurs, de poster, consulter et gérer (CRUD) des annonces d’objets perdus ou retrouvés, et de visualiser ces annonces sur une carte interactive au style personnalisé. L’objectif est de proposer une plateforme simple et sécurisée pour partager des informations sur des objets perdus ou trouvés.

## Fonctionnalités

L’application propose un système d’authentification et d’autorisation grâce à la création de compte et à la connexion sécurisée via JWT, avec une protection des routes (middleware et blacklist de token). On peut créer, lire, mettre à jour et supprimer les annonces d’objets perdus ou trouvés, et gérer des images associées (upload via Multer et traitement avec Sharp). Une carte interactive est intégrée avec Leaflet pour afficher et localiser visuellement les objets, tout en proposant un style personnalisé et des marqueurs spécifiques.

## Architecture et technologies

Côté backend, Lost’n’Found s’appuie sur Node.js et Express pour la création d’API REST, et sur MongoDB pour la base de données. Divers outils renforcent la sécurité et la validation des données, comme bcrypt pour le hachage des mots de passe et JWT pour la génération et la validation des jetons d’authentification. Certains validateurs (Joi ou d’autres) permettent de contrôler l’intégrité des données, tandis que Multer et Sharp s’occupent de la gestion et de l’optimisation des fichiers image. Du TypeScript est utilisé pour un typage plus strict et un développement plus robuste.
Côté frontend, Nuxt.js (SSR) basé sur Vue.js rend l’interface réactive et dynamique, Pinia se charge de la gestion d’état, Leaflet permet l’affichage de la carte interactive et TypeScript apporte cohérence et sécurité dans le code.

## Points positifs et réussites

Le backend fonctionne correctement en local et propose un niveau de sécurité satisfaisant (validation des entrées, gestion des tokens JWT, hachage des mots de passe). Le frontend, même avec un style minimal, communique bien avec l’API et offre une application assez sécurisée grâce aux middlewares d’authentification et la possibilité de faire des tests (unitaires ou manuels) qui valident les principales fonctionnalités.

## Limitations et échecs

En revanche, l’hébergement en production n’est pas fonctionnel à cause d’une erreur 502 (l’application ne répond pas sur le service d’hébergement), il n’existe pas de documentation API sous Swagger, la carte custom ne fonctionne pas en ligne en raison d’un manque d’autorisations, et certaines fonctionnalités comme les notifications ou la recherche avancée ne sont pas implémentées.

## Conclusion

Bien que le résultat final soit limité par l’absence d’un déploiement stable et de certaines fonctionnalités, l’application Lost’n’Found remplit en local l’essentiel de ses objectifs : la gestion d’annonces d’objets perdus ou trouvés, leur sécurisation via un système d’authentification fiable, et l’affichage d’informations géolocalisées sur une carte interactive. C’est un MVP qui démontre comment gérer l’authentification, publier des annonces et proposer un affichage cartographique.

## Ce que j’ai appris

Grâce à ce projet, j’ai pu approfondir l’utilisation de Node.js avec Express, la sécurisation des connexions avec les tokens JWT (création, validation, blacklist), la communication entre un frontend (Nuxt.js) et un backend (Express) via des requêtes HTTP, et la mise en place d’une carte interactive personnalisée avec Leaflet. J’ai également mieux compris la structure des requêtes web (en-têtes, statuts HTTP, etc.) et pris conscience des défis liés au déploiement, illustrés par l’erreur 502 qui montre l’importance d’une bonne configuration serveur. Malgré la déception de ne pas avoir un déploiement pleinement opérationnel, j’ai nettement progressé et posé des bases solides pour évoluer vers une solution plus aboutie.
