# Raspberry PI Camera

Ce programme permet de créer un serveur web contenant stream.mjpg, le flux de la caméra du Raspberry PI.
Fonctione sous Raspberry PI OS Buster

## Installation

N'oubliez pas d'installer les librairies :
```
npm install
```

## Utilisation

Vous avez juste à lancer le programme avec NodeJS :
```
node index.js
```

Pour afficher le stream :
```html
<html>

<head>
    <meta charset="utf-8">
    <title>Caméra Raspberry PI</title>
</head>

<body>
    <img src="http://[IP DU RASPBERRY PI]:3000/stream.mjpg">
</body>

</html>
```

## Crédits

Ce projet est inspiré de https://github.com/caseymcj/raspberrypi_node_camera_web_streamer