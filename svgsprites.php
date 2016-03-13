<?php
require_once './autoloader.php';
$icons = json_decode(file_get_contents('images/icons.json'), true);
$sprites = new \shgysk8zer0\DOM\SVGSprite($icons);
$sprites->save('images/icons.svg');
